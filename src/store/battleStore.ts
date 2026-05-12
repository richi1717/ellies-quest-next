import { create } from 'zustand'
import { isEmpty } from 'lodash'
import type {
  ActionReceiver,
  Character,
  CombatDetails,
  Enemy,
  Hero,
  Item,
  MagicDisplay,
} from '@/types'
import { enemyKilledFadeOut } from '../helpers/fadeOut'

// Module-level loop ID — kept outside store to avoid per-frame re-renders
let loopId: number | null = null

interface BattleStore {
  heroes: Hero[]
  enemies: Enemy[]
  items: Item[]
  order: Character[]
  whoseTurn: Character | null
  atbFills: Record<string, number>
  magicDisplay: MagicDisplay | null
  whoIsReceivingAction: ActionReceiver | null
  expFromBattle: number
  victory: boolean
  usedItems: Item[]
  combatDetails: CombatDetails | null

  addEnemies: (enemies: Enemy[]) => void
  addHeroes: (heroes: Hero[]) => void
  addItems: (items: Item[]) => void
  updateStats: (character: Character) => Promise<void>
  killCharacter: (character: Character) => Promise<void>
  appendToOrder: (character: Character) => void
  finishTurn: () => void
  skipTurn: () => void
  startATBLoop: () => void
  stopATBLoop: () => void
  setMagicDisplay: (display: MagicDisplay | null) => void
  setWhoIsReceivingAction: (action: ActionReceiver | null) => void
  setCombatDetails: (details: CombatDetails | null) => void
  updateItems: (item: Item) => void
  addExp: (expGain: number) => void
  setVictory: (victory: boolean) => void

  getCharacterByBattleName: (battleName: string) => Character | undefined
}

function trackUsedItem(usedItems: Item[], item: Item): Item[] {
  const idx = usedItems.findIndex((i) => i.id === item.id)
  if (idx !== -1) {
    const updated = [...usedItems]
    updated[idx] = item
    return updated
  }
  return [...usedItems, item]
}

function removeFromOrder(order: Character[], battleName: string): Character[] {
  return order.filter((c) => c.battleName !== battleName)
}

function resetDefending(character: Character | null, get: () => BattleStore) {
  if (!character?.battleName.includes('hero')) return
  const hero = get().getCharacterByBattleName(character.battleName) as Hero | undefined
  if (hero) {
    get().updateStats({ ...hero, defending: false })
  }
}

export const useBattleStore = create<BattleStore>((set, get) => ({
  heroes: [],
  enemies: [],
  items: [],
  order: [],
  whoseTurn: null,
  atbFills: {},
  magicDisplay: null,
  whoIsReceivingAction: null,
  expFromBattle: 0,
  victory: false,
  usedItems: [],
  combatDetails: null,

  addEnemies: (enemies) => {
    const tagged = enemies.map((e, idx) => ({
      ...e,
      battleName: e.battleName ?? `enemy${idx + 1}`,
    }))
    set((state) => ({
      enemies: tagged,
      atbFills: {
        ...state.atbFills,
        ...Object.fromEntries(tagged.map((e) => [e.battleName, 0])),
      },
    }))
  },

  addHeroes: (heroes) =>
    set((state) => ({
      heroes,
      atbFills: {
        ...state.atbFills,
        ...Object.fromEntries(heroes.map((h) => [h.battleName, 0])),
      },
    })),

  addItems: (items) => set({ items }),

  updateStats: (character) => {
    const { enemies, heroes } = get()
    const isEnemy = enemies.some((e) => e.battleName === character.battleName)

    if (isEnemy) {
      set({
        enemies: enemies.map((e) =>
          e.battleName === character.battleName ? (character as Enemy) : e,
        ),
      })
    } else {
      set({
        heroes: heroes.map((h) =>
          h.battleName === character.battleName ? (character as Hero) : h,
        ),
      })
    }
    return Promise.resolve()
  },

  killCharacter: async (character) => {
    const { enemies, heroes, order, expFromBattle, atbFills } = get()
    set({ combatDetails: null })

    const newAtbFills = { ...atbFills }
    delete newAtbFills[character.battleName]

    const enemyIdx = enemies.findIndex((e) => e.battleName === character.battleName)

    if (enemyIdx >= 0) {
      const enemyEl = document.getElementById(character.battleName)
      if (enemyEl) await enemyKilledFadeOut(enemyEl)

      const expGain = (character as Enemy).exp ?? 0
      const newExpTotal = expFromBattle + expGain
      const newEnemies = enemies.filter((_, i) => i !== enemyIdx)

      set({
        enemies: newEnemies,
        expFromBattle: newExpTotal,
        order: removeFromOrder(order, character.battleName),
        atbFills: newAtbFills,
      })

      if (newEnemies.length === 0) {
        const { handleVictory } = await import('../helpers/handleVictory')
        await handleVictory(heroes)
      }
      return
    }

    const heroIdx = heroes.findIndex((h) => h.battleName === character.battleName)
    if (heroIdx >= 0) {
      const updated = [...heroes]
      updated[heroIdx] = { ...updated[heroIdx], killed: true, currentHp: 0 }
      set({
        heroes: updated,
        order: removeFromOrder(order, character.battleName),
        atbFills: newAtbFills,
      })
    }
  },

  appendToOrder: (character) => {
    const { order, whoseTurn } = get()
    if (order.length === 0 && isEmpty(whoseTurn)) {
      set({ whoseTurn: character })
    } else if (!order.some((c) => c.battleName === character.battleName)) {
      set({ order: [...order, character] })
    }
  },

  finishTurn: () => {
    const { order, whoseTurn, atbFills } = get()
    const newOrder = [...order]
    const next = newOrder.shift()
    resetDefending(whoseTurn, get)

    const newAtbFills = { ...atbFills }
    if (whoseTurn) newAtbFills[whoseTurn.battleName] = 0

    set({
      whoseTurn: next ?? null,
      order: newOrder,
      combatDetails: null,
      atbFills: newAtbFills,
    })
  },

  skipTurn: () => {
    const { order, whoseTurn } = get()
    const newOrder = [...order]
    const next = newOrder.shift()
    if (whoseTurn) newOrder.push(whoseTurn)
    resetDefending(whoseTurn, get)
    set({ whoseTurn: next ?? null, order: newOrder })
  },

  startATBLoop: () => {
    if (loopId !== null) return
    let last = performance.now()

    const tick = (now: number) => {
      const delta = now - last
      last = now
      const state = get()

      const inQueue = new Set<string>(
        [state.whoseTurn?.battleName, ...state.order.map((c) => c.battleName)].filter(
          (n): n is string => Boolean(n),
        ),
      )

      const newFills: Record<string, number> = { ...state.atbFills }
      const newlyReady: Character[] = []

      for (const hero of state.heroes) {
        if (hero.killed || inQueue.has(hero.battleName)) continue
        const current = state.atbFills[hero.battleName] ?? 0
        if (current >= 100) {
          newlyReady.push(hero)
          continue
        }
        const fill = Math.min(100, current + ((100 + hero.agility) / 5000) * delta)
        newFills[hero.battleName] = fill
        if (fill >= 100) newlyReady.push(hero)
      }

      for (const enemy of state.enemies) {
        if (enemy.killed || inQueue.has(enemy.battleName)) continue
        const current = state.atbFills[enemy.battleName] ?? 0
        if (current >= 100) {
          newlyReady.push(enemy)
          continue
        }
        const fill = Math.min(100, current + ((100 + enemy.agility) / 5000) * delta)
        newFills[enemy.battleName] = fill
        if (fill >= 100) newlyReady.push(enemy)
      }

      let newWhoseTurn = state.whoseTurn
      const newOrder = [...state.order]

      for (const char of newlyReady) {
        if (inQueue.has(char.battleName)) continue
        inQueue.add(char.battleName)
        if (!newWhoseTurn && newOrder.length === 0) {
          newWhoseTurn = char
        } else if (!newOrder.some((c) => c.battleName === char.battleName)) {
          newOrder.push(char)
        }
      }

      set({
        atbFills: newFills,
        whoseTurn: newWhoseTurn,
        order: newOrder,
      })

      loopId = requestAnimationFrame(tick)
    }

    loopId = requestAnimationFrame(tick)
  },

  stopATBLoop: () => {
    if (loopId !== null) {
      cancelAnimationFrame(loopId)
      loopId = null
    }
  },

  setMagicDisplay: (display) => set({ magicDisplay: display }),

  setWhoIsReceivingAction: (action) => set({ whoIsReceivingAction: action }),

  setCombatDetails: (details) => set({ combatDetails: details }),

  updateItems: (item) => {
    const { items, usedItems } = get()
    set({
      items: items.map((i) => (i.id === item.id ? item : i)),
      usedItems: trackUsedItem(usedItems, item),
    })
  },

  addExp: (expGain) => set((store) => ({ expFromBattle: store.expFromBattle + expGain })),

  setVictory: (victory) => set({ victory }),

  getCharacterByBattleName: (battleName) => {
    const { heroes, enemies } = get()
    return (
      heroes.find((h) => h.battleName === battleName) ??
      enemies.find((e) => e.battleName === battleName)
    )
  },
}))

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

interface BattleStore {
  heroes: Hero[]
  enemies: Enemy[]
  items: Item[]
  order: Character[]
  whoseTurn: Character | null
  whoShouldRestartTimer: string
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
  whoShouldRestartTimer: '',
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
    set({ enemies: tagged })
  },

  addHeroes: (heroes) => set({ heroes }),

  addItems: (items) => set({ items }),

  updateStats: (character) => {
    const { enemies, heroes } = get()
    const isEnemy = enemies.some((e) => e.battleName === character.battleName)

    if (isEnemy) {
      set({
        enemies: enemies.map((e) =>
          e.battleName === character.battleName ? (character as Enemy) : e
        ),
      })
    } else {
      set({
        heroes: heroes.map((h) =>
          h.battleName === character.battleName ? (character as Hero) : h
        ),
      })
    }
    return Promise.resolve()
  },

  killCharacter: async (character) => {
    const { enemies, heroes, order, expFromBattle } = get()
    set({ combatDetails: null })

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
      })

      if (newEnemies.length === 0) {
        // import dynamically to avoid circular deps
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
    const { order, whoseTurn } = get()
    const newOrder = [...order]
    const next = newOrder.shift()
    resetDefending(next ?? null, get)
    set({
      whoseTurn: next ?? null,
      order: newOrder,
      whoShouldRestartTimer: whoseTurn?.battleName ?? '',
      combatDetails: null,
    })
  },

  skipTurn: () => {
    const { order, whoseTurn } = get()
    const newOrder = [...order]
    const next = newOrder.shift()
    if (whoseTurn) newOrder.push(whoseTurn)
    resetDefending(next ?? null, get)
    set({ whoseTurn: next ?? null, order: newOrder })
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

  addExp: (expGain) => set((s) => ({ expFromBattle: s.expFromBattle + expGain })),

  setVictory: (victory) => set({ victory }),

  getCharacterByBattleName: (battleName) => {
    const { heroes, enemies } = get()
    return (
      heroes.find((h) => h.battleName === battleName) ??
      enemies.find((e) => e.battleName === battleName)
    )
  },
}))

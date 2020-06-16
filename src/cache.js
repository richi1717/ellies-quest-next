import { InMemoryCache } from '@apollo/client'

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        order: {
          read () {
            return orderVar()
          },
        },
        whoseTurn: {
          read () {
            return whoseTurnVar()
          },
        },
        characters: {
          read () {
            return charactersVar()
          },
        },
        enemies: {
          read () {
            return enemiesVar()
          },
        },
        heroes: {
          read () {
            return heroesVar()
          },
        },
        items: {
          read () {
            return itemsVar()
          },
        },
        whoShouldRestartTimer: {
          read () {
            return whoShouldRestartTimerVar()
          },
        },
        magicDisplay: {
          read () {
            return magicDisplayVar()
          },
        },
        whoIsReceivingAction: {
          read () {
            return whoIsReceivingActionVar()
          },
        },
        expFromBattle: {
          read () {
            return expFromBattleVar()
          },
        },
      },
    },
  },
})

export const charactersVar = cache.makeVar([])
export const enemiesVar = cache.makeVar([])
export const heroesVar = cache.makeVar([])
export const itemsVar = cache.makeVar([])
export const orderVar = cache.makeVar([])
export const whoseTurnVar = cache.makeVar({})
export const whoShouldRestartTimerVar = cache.makeVar('')
export const magicDisplayVar = cache.makeVar({})
export const whoIsReceivingActionVar = cache.makeVar({})
export const expFromBattleVar = cache.makeVar(0)

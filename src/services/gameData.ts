import { ref, get, update } from 'firebase/database'
import { db } from './firebase'
import type { Enemy, Hero, Item } from '@/types'

export async function fetchHeroes(): Promise<Hero[]> {
  const snapshot = await get(ref(db, 'characters'))
  if (!snapshot.exists()) return []
  const data = snapshot.val() as Record<string, Omit<Hero, 'id'>>
  return Object.entries(data).map(([id, hero]) => ({ ...hero, id }))
}

export async function fetchEnemies(): Promise<Enemy[]> {
  const snapshot = await get(ref(db, 'monsters'))
  console.log('[fetchEnemies] exists:', snapshot.exists(), 'val:', snapshot.val())
  if (!snapshot.exists()) return []
  const data = snapshot.val() as Record<string, Omit<Enemy, 'id'>>
  return Object.entries(data).map(([id, enemy]) => ({ ...enemy, id }))
}

export async function fetchItems(): Promise<Item[]> {
  const snapshot = await get(ref(db, 'items'))
  if (!snapshot.exists()) return []
  const data = snapshot.val() as Record<string, Omit<Item, 'id'>>
  return Object.entries(data).map(([id, item]) => ({ ...item, id }))
}

export async function saveHero(hero: Hero): Promise<void> {
  const { id, ...data } = hero
  await update(ref(db, `characters/${id}`), data)
}

export async function saveItem(item: Item): Promise<void> {
  const { id, ...data } = item
  await update(ref(db, `items/${id}`), { amount: data.amount })
}

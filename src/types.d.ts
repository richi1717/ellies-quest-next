export interface Hero {
  id: string
  name: string
  battleName: string
  classes: string
  str: number
  magic: number
  agility: number
  def: number
  magicDef: number
  accuracy: number
  evade: number
  currentHp: number
  maxHp: number
  currentMp: number
  maxMp: number
  exp: number
  attack: string
  defending?: boolean
  killed: boolean
  inPlay: boolean
}

export interface Enemy {
  id: string
  name: string
  battleName: string
  classes: string
  str: number
  magic: number
  agility: number
  def: number
  magicDef: number
  currentHp: number
  maxHp: number
  currentMp: number
  maxMp: number
  exp: number
  attack: string
  killed: boolean
  sections: string[]
}

export type Character = Hero | Enemy

export interface Item {
  id: string
  name: string
  amount: number
  damage?: number
  str?: number
  percentage?: number
  restore?: Array<'HP' | 'MP'>
  revive?: number
  cost?: number
  battle?: boolean
  drops?: number
  dropFromBattle?: boolean
}

export interface MagicSpell {
  name: string
  type: 'fire' | 'ice' | 'lightning' | 'cure' | 'revive'
  cost: number
  damage?: number
}

export interface MagicDisplay {
  target: string
  type: MagicSpell['type']
}

export interface ActionReceiver {
  target: string
  amount: number
  type: 'damage' | 'heal'
}

export interface CombatDetails {
  target: Character
  targeter: Character
  text: string
  type: 'damage' | 'magicDamage' | 'heal' | 'itemDamage' | 'revive'
}

export type BattleScene = 'boss' | 'beach' | 'desert' | 'forest' | 'grass'

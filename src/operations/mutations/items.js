import usedItems from './usedItems'

export function addItems (itemsVar) {
  return (items) => {
    itemsVar(items)
  }
}

export function updateItems (itemsVar) {
  return (item) => {
    usedItems(item)
    const list = itemsVar()
    const updated = list.map((_item) => {
      if (_item.id === item.id) {
        return item
      }
      return _item
    }, [])
    itemsVar(updated)
  }
}

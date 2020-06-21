import { usedItemsVar } from '../../cache'

export default function usedItems (item) {
  const items = usedItemsVar()
  const index = items.findIndex((_item) => _item.id === item.id)
  if (index !== -1) {
    items[index] = item
  } else {
    items.push(item)
  }
  usedItemsVar(items)
}

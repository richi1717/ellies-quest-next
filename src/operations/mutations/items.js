export function addItems (itemsVar) {
  return (items) => {
    itemsVar(items)
  }
}

export function updateItems (itemsVar) {
  return (item) => {
    const list = itemsVar()
    const updated = list.reduce((acc, _item) => {
      if (_item.id === item.id) {
        acc.push(item)
      } else {
        acc.push(_item)
      }
      return acc
    }, [])
    itemsVar(updated)
  }
}

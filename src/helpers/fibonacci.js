export default function fibonacci (start, times = 10) {
  let numerator = times - 2
  const arr = [0, 1]
  let i = 0
  let found = 0

  if (start && start > 0) {
    while (arr[i] < start) {
      arr.push(arr[i] + arr[i + 1])
      i++
    }
    if (arr[i] > start && arr[i] !== start) {
      console.log('not a valid number in the sequence')
      return arr
    }
    numerator += i
    found = i
  }

  while (i < numerator) {
    arr.push(arr[i] + arr[i + 1])
    i++
  }
  return arr.slice(found)
}

const allUnique = (str: string) =>
  new Set(str).size === str.length

export const iterate = (stream: string[], sliceSize: number, index: number): number => {
  const currentSet = stream.slice(0, sliceSize)
  if (allUnique(currentSet.join(''))) {
    return index
  }
  return iterate(stream.slice(1, stream.length), sliceSize, index + 1)
}


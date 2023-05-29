const allUnique = (str: string) =>
  new Set(str).size === str.length

const iterate = (stream: string[], index: number): number => {
  const fourChars = stream.slice(0, 4)
  if (allUnique(fourChars.join(''))) {
    return index
  }
  return iterate(stream.slice(1, stream.length), index + 1)
}

export const run = (input: string) => {
  return iterate(input.split(''), 4)
}

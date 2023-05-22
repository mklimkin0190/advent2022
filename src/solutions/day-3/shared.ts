// import * as fs from 'fs/promises'

// export const fileToRucksacks = (path: string): Promise<string[]> =>
//   fs.readFile(path, { encoding: 'utf8' })
//     .then(data => data.split('\n'))

export const itemPriority = (item: string): number => {
  const charCodeShift = item.match(/[a-z]/) ? 96 : 38
  return item.charCodeAt(0) - charCodeShift
}

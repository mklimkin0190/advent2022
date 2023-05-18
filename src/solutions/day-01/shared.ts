// import * as fs from 'fs/promises'

// export const fileToArray = (path: string): Promise<string[]> =>
//   fs.readFile(path, { encoding: 'utf8' })
//     .then(data => data.split('\n\n'))

export const sumFor = (elf: string): number =>
  elf.split('\n').reduce(
    (acc: number, curr: string) => acc + +curr,
    0
  )

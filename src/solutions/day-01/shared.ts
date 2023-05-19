// import * as fs from 'fs/promises'

// export const fileToArray = (path: string): Promise<string[]> =>
//   fs.readFile(path, { encoding: 'utf8' })
//     .then(data => data.split('\n\n'))

export const groupInputByElf = (input: string[]) =>
  input.reduce(
    (acc: string[], curr: string) => {
      if (curr.length === 0) {
        return [...acc, '']
      }
      const last = acc.pop()
      return [...acc, `${last},${curr}`]
    },
    ['']
  )

export const sumFor = (elf: string): number =>
  elf.split(',').reduce(
    (acc: number, curr: string) => acc + +curr,
    0
  )

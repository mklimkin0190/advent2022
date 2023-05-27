import { sumFor } from './shared.ts'

export const run = (input: string) => {
  const maxElf: number = input.split('\n\n').reduce(
    (currMaxElf: number, currElf: string) => {
      const sum = sumFor(currElf)
      return sum > currMaxElf ? sum : currMaxElf
    },
    0
  )
  return maxElf
}

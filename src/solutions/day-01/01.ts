import { sumFor } from './shared.ts'

export const run = async (input: string[]): Promise<void> => {
  const maxElf: number = input.reduce(
    (currMaxElf: number, currElf: string) => {
      const sum = sumFor(currElf)
      return sum > currMaxElf ? sum : currMaxElf
    },
    0
  )
  console.log(maxElf)
}

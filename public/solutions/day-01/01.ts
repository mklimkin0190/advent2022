import { fileToArray, sumFor } from './shared.ts'

const run = async (): Promise<void> => {
  const input: string[] = await fileToArray('./input')
  const maxElf: number = input.reduce(
    (currMaxElf: number, currElf: string) => {
      const sum = sumFor(currElf)
      return sum > currMaxElf ? sum : currMaxElf
    },
    0
  )
  console.log(maxElf)
}

await run()

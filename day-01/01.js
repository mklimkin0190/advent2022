import { fileToArray, sumFor } from './shared.js'

const run = async () => {
  const input = await fileToArray('./input')
  const maxElf = input.reduce((currMaxElf, currElf) => {
    const sum = sumFor(currElf)
    return sum > currMaxElf ? sum : currMaxElf
  }, 0)
  console.log(maxElf)
}

await run()

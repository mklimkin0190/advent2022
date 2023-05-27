import { sumFor } from './shared.ts'

export const run = (input: string) => {
  const maxThree: number[] = input.split('\n\n').reduce(
    (currMaxThree: number[], currElf: string) => {
      const [first, second, third]: number[] = currMaxThree
      const currSum: number = sumFor(currElf)
      if (currSum > first) {
        return [currSum, first, second]
      }
      if (currSum > second) {
        return [first, currSum, second]
      }
      if (currSum > third) {
        return [first, second, currSum]
      }
      return currMaxThree
    },
    [0, 0, 0]
  )
  const maxThreeSum: number = maxThree.reduce((acc, curr) => acc + curr, 0)
  return maxThreeSum
}

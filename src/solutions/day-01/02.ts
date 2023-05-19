import { sumFor, groupInputByElf } from './shared.ts'

export const run = async (input: string[]): Promise<void> => {
  const inputByElf = groupInputByElf(input)
  const maxThree: number[] = inputByElf.reduce(
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
  console.log(maxThreeSum)
}

import { fileToPairs } from './shared.ts'

const run = async () => {
  const pairs: string[][] = await fileToPairs('./input') // [['4-90','1-4'],['79-94','80-81'],...]
  const numOverlap = pairs.reduce((acc: number, pair: string[]) => {
    const frstRange = pair[0].split('-') // [4, 90]
    const scndRange = pair[1].split('-') // [1, 4]
    if (
      +frstRange[0] <= +scndRange[0] && +frstRange[1] >= +scndRange[0] ||
      +scndRange[0] <= +frstRange[0] && +scndRange[1] >= +frstRange[0]
    ) {
      return acc + 1
    }
    return acc
  }, 0)
  console.log(numOverlap)
}

await run()

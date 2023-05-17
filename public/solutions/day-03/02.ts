import { fileToRucksacks, itemPriority } from './shared.ts'

const findBadgeForGroup = (rucksacks: string[]): string =>
  rucksacks[0].split('').reduce(
    (acc: string, curr: string, _: number, array: string[]) => {
      if (rucksacks[1].indexOf(curr) > -1 && rucksacks[2].indexOf(curr) > -1) {
        array.splice(1)
        return curr
      }
      return acc
    },
    null
  )

const findAllBadges = (rucksacks: string[]) => {
  let currentGroup = []
  return rucksacks.reduce((acc: number, rucksack: string) => {
    if (currentGroup.length === 2) {
      const currentBadge = findBadgeForGroup([...currentGroup, rucksack])
      const currentBadgePriority = itemPriority(currentBadge)
      currentGroup = []
      return acc + currentBadgePriority
    }
    currentGroup = [...currentGroup, rucksack]
    return acc
  }, 0)
}

const run = async () => {
  const rucksacks = await fileToRucksacks('./input')
  const sum = findAllBadges(rucksacks)
  console.log(sum)
}

await run()
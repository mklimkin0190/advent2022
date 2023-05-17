import { fileToRucksacks, itemPriority } from './shared.ts'

const findDuplicateInRucksack = (rucksack: string): string => {
  const rucksackContents = rucksack.split('')
  let firstCompartment = []
  let duplicate = null
  rucksackContents.forEach(
    (item: string, index: number) => {
      if (index <= (rucksackContents.length / 2) - 1) {
        firstCompartment = [...firstCompartment, item]
        return
      }
      if (firstCompartment.indexOf(item) > -1) {
        duplicate = item
      }
    }
  )
  return duplicate
}

const run = async () => {
  const rucksacks = await fileToRucksacks('./input')
  const result = rucksacks.reduce(
    (acc: number, curr: string) => {
      const duplicate = findDuplicateInRucksack(curr)
      return acc + itemPriority(duplicate)
    },
    0
  )
  console.log(result)
}

await run()

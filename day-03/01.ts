import * as fs from 'fs/promises';

export const fileToRucksacks = (path: string): Promise<string[]> =>
  fs.readFile(path, { encoding: 'utf8' })
    .then(data => data.split('\n'));

const findDuplicateInRucksack = (rucksack: string): string => {
  const rucksackContents = rucksack.split('');
  let firstCompartment = [];
  let duplicate = null;
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

const itemPriority = (item: string): number => {
  const charCodeShift = item.match(/[a-z]/) ? 96 : 38
  return item.charCodeAt(0) - charCodeShift
}

const run = async () => {
  const rucksacks = await fileToRucksacks('./input');
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

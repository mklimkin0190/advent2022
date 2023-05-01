import { fileToArray, sumFor } from './shared.js'

const run = async () => {
  const input = await fileToArray('./input');
  const maxElf = input.reduce((maxElf, currElf) => {
    const sum = sumFor(currElf);
    return sum > maxElf ? sum : maxElf;
  }, 0)
  console.log(maxElf);
}

await run();

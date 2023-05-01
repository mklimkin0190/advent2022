import { fileToArray, sumFor } from './shared.js'

const run = async () => {
  const input = await fileToArray('./input');
  const maxThree = input.reduce((maxThree, currElf) => {
    const [first, second, third] = maxThree;
    const currSum = sumFor(currElf);
    if (currSum > first) {
      return [currSum, first, second];
    }
    if (currSum > second) {
      return [first, currSum, second];
    }
    if (currSum > third) {
      return [first, second, currSum];
    }
    return maxThree;
  }, [0, 0, 0])
  const maxThreeSum = maxThree.reduce((acc, curr) => acc + curr, 0);
  console.log(maxThreeSum);
}

await run();

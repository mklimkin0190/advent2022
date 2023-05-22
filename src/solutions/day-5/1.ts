import _ from 'lodash'

const parseStacks = (stacksScheme: string): Record<number, string[]> => {
  //        [C]
  //[A]     [E]
  //[B] [D] [F]
  // 1   2   3
  //
  // 1: ['B', 'A']
  // 2: ['D']
  // 3: ['F', 'E', 'C']

  const lines = stacksScheme.split('\n')
  const meaningfulPositions = _.range(1, lines[0].length, 4)
  const stacks = {}
  _.each(lines.pop().trim().split('   '), (crateNum: string) => {
    stacks[+crateNum] = []
  })
  _.each(lines, (line: string) => {
    _.each(meaningfulPositions, (position: number, index: number) => {
      const crate = line[position]
      if (crate !== ' ') {
        stacks[index + 1] = [...stacks[index + 1], crate]
      }
    })
  })
  return stacks
}

export const run = (input: string) => {
  const [stacksScheme, moves] = input.split('\n\n')
  const stacks = parseStacks(stacksScheme)
  _.each(moves.split('\n'), (move: string) => {
    const [__, amount, ___, from, ____, to] = move.split(' ')
    if (!amount || !from || !to) {
      return
    }
    _.each(_.range(0, +amount), (time: number) => {
      const [top, ...rest] = stacks[+from]
      stacks[+from] = rest
      stacks[+to] = [top, ...stacks[+to]]
    })
  })
  const topCrates = _.map(_.orderBy(_.keys(stacks)), (stack: number) => stacks[stack]?.[0])
  console.log(topCrates.join(''))
}

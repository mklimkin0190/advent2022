import _ from 'lodash'

export const parseStacks = (stacksScheme: string): Record<number, string[]> => {
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

export const listTopCrates = (stacks: Record<number, string[]>) =>
  _.map(_.orderBy(_.keys(stacks)), (stack: number) => stacks[stack]?.[0])


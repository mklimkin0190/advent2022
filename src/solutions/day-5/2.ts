import _ from 'lodash'

import { parseStacks, listTopCrates } from './shared.ts'

export const run = (input: string) => {
  const [stacksScheme, moves] = input.split('\n\n')
  const stacks = parseStacks(stacksScheme)
  _.each(moves.split('\n'), (move: string) => {
    const [__, amount, ___, from, ____, to] = move.split(' ')
    if (!amount || !from || !to) {
      return
    }
    const substackToMove = _.reduce(_.range(0, +amount), (acc: string[], time: number) => {
      const [top, ...rest] = stacks[+from]
      stacks[+from] = rest
      return [...acc, top]
    }, [])
    stacks[+to] = [...substackToMove, ...stacks[+to]]
  })
  const topCrates = listTopCrates(stacks)
  return topCrates.join('')
}

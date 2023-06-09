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
    _.each(_.range(0, +amount), (time: number) => {
      const [top, ...rest] = stacks[+from]
      stacks[+from] = rest
      stacks[+to] = [top, ...stacks[+to]]
    })
  })
  const topCrates = listTopCrates(stacks)
  return topCrates.join('')
}

import { LOSS, DRAW, WIN, SHAPES, OUTCOMES } from './shared.ts'

const calculateMyShape = (opponentsShape: number, outcome: number): number => {
  switch (outcome) {
    case DRAW:
      return opponentsShape
    case WIN:
      return opponentsShape % 3 + 1
    case LOSS:
      return opponentsShape - 1 || 3
  }
}

export const run = (input: string) => {
  const rounds = input.split('\n')
  const total = rounds.reduce((acc: number, curr: string) => {
    const [opponentsShapeKey, outcomeKey] = curr.split(' ')
    const opponentsShape = SHAPES[opponentsShapeKey]
    const outcome = OUTCOMES[outcomeKey]
    const myShape = calculateMyShape(opponentsShape, outcome)
    return acc + outcome + myShape
  }, 0)
  return total
}

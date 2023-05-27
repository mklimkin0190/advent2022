import { LOSS, DRAW, WIN, SHAPES } from './shared.ts'

const roundOutcome = (opponentsShape: number, myShape: number): number => {
  const diff = myShape - opponentsShape
  switch (diff) {
    case 0:
      return DRAW
    case 1:
    case -2:
      return WIN
    default:
      return LOSS
  }
}

const calculateRoundScore = (opponentsShape: number, myShape: number): number => {
  const outcome = roundOutcome(opponentsShape, myShape)
  return outcome + myShape
}

export const run = (input: string) => {
  const rounds = input.split('\n')
  const total = rounds.reduce((acc: number, curr: string) => {
    const [opponentsShape, myShape] = curr.split(' ').map((key: string) => SHAPES[key])
    return acc + calculateRoundScore(opponentsShape, myShape)
  }, 0)
  return total
}

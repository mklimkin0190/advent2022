// export const fileToRounds = (path: string): Promise<string[]> =>
//   fs.readFile(path, { encoding: 'utf8' })
//     .then(data => data.split('\n'))

export const LOSS = 0
export const DRAW = 3
export const WIN = 6

export const SHAPES = {
  A: 1,
  B: 2,
  C: 3,
  X: 1,
  Y: 2,
  Z: 3,
}

export const OUTCOMES = {
  X: LOSS,
  Y: DRAW,
  Z: WIN,
}

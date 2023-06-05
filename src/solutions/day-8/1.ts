import _ from 'lodash'

const findTreesVisibleFromLeftSide = (rows: string[][], convertCoords: (colIndex: number, rowIndex: number) => { colIndex: number, rowIndex: number }) => {
  const visibleTrees: { colIndex: number, rowIndex: number }[] = []
  rows.forEach((row: string[], rowIndex: number) => {
    let leftMax = 0
    row.forEach((treeHeight: string, colIndex: number) => {
      const coords = convertCoords(colIndex, rowIndex)
      if (colIndex === 0) {
        visibleTrees.push(coords)
        leftMax = +treeHeight
        return
      }
      if (+treeHeight > leftMax) {
        visibleTrees.push(coords)
        leftMax = +treeHeight
        return
      }
    })
  })
  return visibleTrees
}

export const run = (input: string) => {
  const rows = input.trim().split('\n').map((row: string) => row.split('')) // a matrix of tree heights
  const mirroredHorizontally = rows.map((row: string[]) => row.slice().reverse())
  const mirroredDiagonally = rows[0].map((tree: string, index: number) => rows.map((row: string[]) => row[index]))
  const rotated = mirroredDiagonally.map((row: string[]) => row.slice().reverse())
  const rowsNum = rows.length
  const colsNum = rows[0].length
  const visibleFromLeft = findTreesVisibleFromLeftSide(rows, (colIndex: number, rowIndex: number) => ({ colIndex, rowIndex }))
  const visibleFromRight = findTreesVisibleFromLeftSide(mirroredHorizontally, (colIndex: number, rowIndex: number) => ({
    colIndex: colsNum - colIndex - 1,
    rowIndex,
  }))
  const visibleFromTop = findTreesVisibleFromLeftSide(mirroredDiagonally, (colIndex: number, rowIndex: number) => ({
    colIndex: rowIndex,
    rowIndex: colIndex,
  }))
  const visibleFromBottom = findTreesVisibleFromLeftSide(rotated, (colIndex: number, rowIndex: number) => ({
    colIndex: rowIndex,
    rowIndex: rowsNum - colIndex - 1,
  }))
  const union = _.unionBy(visibleFromLeft, visibleFromRight, visibleFromTop, visibleFromBottom, (coords: { colIndex: number, rowIndex: number }) => `${coords.colIndex}-${coords.rowIndex}`)
  return union.length
}

import { Node, newNode, buildFilesTree } from './shared.ts'

export const run = (input: string) => {
  const lines = input.split('\n')
  const filesTree: Node = {
    name: null,
    size: null,
    children: [newNode('/', this, 0)],
    parent: null
  }
  const res = buildFilesTree(lines, filesTree, [])
  const sorted = res.sort((a, b) => b - a)
  return res.reduce((sum: number, curr: number) => {
    if (curr < 100000) {
      return sum + curr
    }
    return sum
  }, 0)
}


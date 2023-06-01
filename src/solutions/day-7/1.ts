import { Node, newNode, buildFilesTree } from './shared.ts'

const maxDirSize = 100000

export const run = (input: string) => {
  const lines = input.split('\n')
  const filesTree: Node = {
    name: null,
    size: null,
    children: [newNode('/', this, 0)],
    parent: null
  }
  const res = buildFilesTree(lines, filesTree, [])
  return res.reduce((sum: number, curr: number) => {
    if (curr < maxDirSize) {
      return sum + curr
    }
    return sum
  }, 0)
}


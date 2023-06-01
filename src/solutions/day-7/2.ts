import { Node, newNode, buildFilesTree } from './shared.ts'

const totalSpace = 70000000
const freeSpaceNeeded = 30000000

export const run = (input: string) => {
  const lines = input.split('\n')
  const filesTree: Node = {
    name: null,
    size: null,
    children: [newNode('/', this, 0)],
    parent: null
  }
  const res = buildFilesTree(lines, filesTree, [])
  const rootSize = filesTree.children[0].size
  const freeSpace = totalSpace - rootSize
  const needToFree = freeSpaceNeeded - freeSpace
  const sorted = res.sort((a, b) => b - a)
  let toDelete: number
  sorted.forEach((size: number) => {
    if (size < needToFree) {
      return false
    }
    toDelete = size
  })
  return toDelete
}


import { Node, newNode } from './shared.ts'

export const buildFilesTree = (output: string[], node: Node, acc = []) => {
  if (output.length === 0) {
    if (node?.name) {
      // need to go back to the top to count all sizes
      return buildFilesTree(['$ cd ..'], node, acc)
    }
    return acc
  }
  const [line, ...rest] = output
  const [first, second, third] = line.split(' ')
  if (first === '$') {
    // command
    if (second === 'cd') {
      if (third === '..') {
        // go up
        node.size = node.children.reduce((sum: number, curr: Node) => sum + curr.size, 0)
        return buildFilesTree(rest, node.parent, [...acc, node.size])
      } else {
        // go in
        const child = node.children.find((ch: Node) => ch.name === third)
        return buildFilesTree(rest, child, acc)
      }
    } else if (second === 'ls') {
      // prepare to add children
      node.children = []
      return buildFilesTree(rest, node, acc)
    }
  } else {
    // add child
    const childSize = (first === 'dir' ? 0 : +first)
    node.children = [...node.children, newNode(second, node, childSize)]
    return buildFilesTree(rest, node, acc)
  }
}

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
  const freeSpace = 70000000 - rootSize
  const needToFree = 30000000 - freeSpace
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


interface Node {
  name: string | null
  size: number | null
  children: Node[] | null
  parent: Node | null
}

const newNode = (name: string, parent: Node | null = null, size: number) => ({
  name,
  size,
  children: null,
  parent,
})

const buildFilesTree = (output: string[], node: Node, sum = 0) => {
  if (output.length === 0) {
    if (node?.name) {
      // need to go back to the top to count all sizes
      return buildFilesTree(['$ cd ..'], node, sum)
    }
    return sum
  }
  const [line, ...rest] = output
  const [first, second, third] = line.split(' ')
  if (first === '$') {
    // command
    if (second === 'cd') {
      if (third === '..') {
        // go up
        node.size = node.children.reduce((sum: number, curr: Node) => sum + curr.size, 0)
        if (node.size <= 100000) {
          return buildFilesTree(rest, node.parent, sum + node.size)
        }
        return buildFilesTree(rest, node.parent, sum)
      } else {
        // go in
        const child = node.children.find((ch: Node) => ch.name === third)
        return buildFilesTree(rest, child, sum)
      }
    } else if (second === 'ls') {
      // prepare to add children
      node.children = []
      return buildFilesTree(rest, node, sum)
    }
  } else {
    // add child
    const childSize = (first === 'dir' ? 0 : +first)
    node.children = [...node.children, newNode(second, node, childSize)]
    return buildFilesTree(rest, node, sum)
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
  const res = buildFilesTree(lines, filesTree, 0)
  return res
}

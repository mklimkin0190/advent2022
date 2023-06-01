export interface Node {
  name: string | null
  size: number | null
  children: Node[] | null
  parent: Node | null
}

export const newNode = (name: string, parent: Node | null = null, size: number) => ({
  name,
  size,
  children: null,
  parent,
})

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


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


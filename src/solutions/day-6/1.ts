import { iterate } from './shared.ts'

export const run = (input: string) => iterate(input.split(''), 4, 4)


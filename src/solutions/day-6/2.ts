import { iterate } from './shared.ts'

export const run = (input: string) => iterate(input.split(''), 14, 14)


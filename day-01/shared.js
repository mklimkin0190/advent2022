import fs from 'fs/promises';

export const fileToArray = (path) =>
  fs.readFile(path, { encoding: 'utf8' })
    .then(data => data.split('\n\n'));

export const sumFor = (elf) => elf.split('\n').reduce((acc, curr) => acc + +curr, 0)

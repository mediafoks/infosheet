import { readdir, unlink } from 'node:fs/promises'
import path from 'node:path'

const directory = './css'

for (const file of await readdir(directory)) {
    await unlink(path.join(directory, file))
}

console.log('Очищен каталог CSS')

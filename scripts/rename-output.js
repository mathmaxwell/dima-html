/**
 * Vite всегда называет результат index.html. Переименовываем в «Дом Кино.html»,
 * чтобы файл было не стыдно отправить заказчику или положить на телефон.
 */
import { renameSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const from = join(root, 'dist', 'index.html');
const to = join(root, 'dist', 'Дом Кино.html');

if (!existsSync(from)) {
  console.error('Нет dist/index.html — сборка не выполнялась?');
  process.exit(1);
}

renameSync(from, to);
console.log('→ dist/Дом Кино.html');

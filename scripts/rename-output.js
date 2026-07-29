/**
 * Vite всегда называет результат index.html. Рядом кладём копию «Дом Кино.html»,
 * чтобы файл было не стыдно отправить заказчику или положить на телефон.
 *
 * Именно копию, а не переименование: index.html обязан остаться на месте —
 * хостинг (Netlify и любой другой) ищет в корне именно его, иначе отдаёт 404.
 */
import { copyFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const from = join(root, 'dist', 'index.html');
const to = join(root, 'dist', 'Дом Кино.html');

if (!existsSync(from)) {
  console.error('Нет dist/index.html — сборка не выполнялась?');
  process.exit(1);
}

copyFileSync(from, to);
console.log('→ dist/index.html (для хостинга)');
console.log('→ dist/Дом Кино.html (для отправки)');

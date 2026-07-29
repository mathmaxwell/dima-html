/**
 * Декоративный QR-код. Настоящих данных за ним нет — рисунок нужен, чтобы
 * экран пропуска выглядел достоверно.
 *
 * Модули расставляются детерминированным генератором, поэтому картинка
 * одинакова при каждом открытии.
 */

const GRID = 17;
const CELL = 10;
const DARK = '#1a1712';

/** Линейный конгруэнтный генератор — тот же ряд чисел при том же зерне. */
function createRandom(seed) {
  let state = seed;
  return () => {
    state = (state * 1103515245 + 12345) & 0x7fffffff;
    return state / 0x7fffffff;
  };
}

/** Угловой «глаз» кода: три вложенных квадрата. */
function Finder({ x, y }) {
  return (
    <>
      <rect x={x} y={y} width={50} height={50} fill={DARK} />
      <rect x={x + 10} y={y + 10} width={30} height={30} fill="#fff" />
      <rect x={x + 18} y={y + 18} width={14} height={14} fill={DARK} />
    </>
  );
}

export function QrCode() {
  const random = createRandom(7);
  const modules = [];

  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      if (random() > 0.5) {
        modules.push(
          <rect key={`${x}-${y}`} x={x * CELL} y={y * CELL} width={CELL} height={CELL} fill={DARK} />
        );
      }
    }
  }

  const size = GRID * CELL;

  return (
    <svg viewBox={`0 0 ${size} ${size}`} width="100%" height="100%">
      {modules}
      <Finder x={0} y={0} />
      <Finder x={size - 50} y={0} />
      <Finder x={0} y={size - 50} />
    </svg>
  );
}

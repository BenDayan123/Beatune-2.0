export function shuffle<T>(arr: T[], seed: number[], unshuffle = false) {
  const newArr = Array.from(arr),
    len = arr.length;

  const swap = (a: number, b: number) =>
    ([newArr[a], newArr[b]] = [newArr[b], newArr[a]]);

  for (
    let i = unshuffle ? len - 1 : 0;
    (unshuffle && i >= 0) || (!unshuffle && i < len);
    i += unshuffle ? -1 : 1
  )
    swap(seed[i % seed.length] % len, i);

  return newArr;
}

export function unshuffle<T>(arr: T[], seed: number[]) {
  return shuffle(arr, seed, true);
}

export function generateSeed<T>(array: T[]) {
  const seed: number[] = [];
  for (var i = 0; i < array.length / 2; i++)
    seed.push(Math.ceil(Math.random() * 10));
  return seed;
}

function swap(a: number, b: number, list: any[]) {
  [list[a], list[b]] = [list[b], list[a]];
}

export function shuffle<T>(list: T[], index = 0) {
  const seed = [...Array(list.length).keys()];
  const temp = list.splice(index, 1);
  seed.splice(index, 1);
  for (let i = list.length - 1; i > 0; i--) {
    let j = Math.floor(Math.random() * (i + 1));
    swap(i, j, list);
    swap(i, j, seed);
  }
  list.splice(index, 0, ...temp);
  seed.splice(index, 0, index);
  return { list, seed };
}

export function unshuffle<T>(list: T[], seed: number[]): T[] {
  const newArr: T[] = [];
  seed.forEach((shuffle, original) => {
    newArr[shuffle] = list[original];
  });
  list = newArr;
  return list;
}


// const array = [0,10,20,30,40];
// const copy = [...array];
// const { list,seed } = shuffle(array,2);
// const unlist = unshuffle(list,seed);
// console.log(`[${unlist}] -> [${list}]`);
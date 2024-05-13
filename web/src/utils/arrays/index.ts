export function arrayAverage(arr: number[], decimals = 2): number {
  if (arr.length === 0) {
    return 0;
  }

  const avg = arr.map((i) => Number(i)).reduce((acc, curr) => acc + curr, 0) / arr.length;
  return Number(avg.toFixed(decimals));
}

export function removeDuplicates(arr: any[]): any[] {
  const isObjArray = arr.length > 0 && typeof arr[0] === 'object';
  return isObjArray
    ? arr
        .map((i) => JSON.stringify(i))
        .filter((value, index, self) => self.indexOf(value) === index)
        .map((i) => JSON.parse(i))
    : [...new Set(arr)];
}
export function sortByKey<T>({
  arr,
  isAscending = true,
  key,
}: {
  arr: T[];
  key: keyof T;
  isAscending?: boolean;
}): T[] {
  if (!arr || arr.length === 0) return arr;
  return arr.sort((a, b) => {
    const x = a[key];
    const y = b[key];
    if (isAscending) {
      return x < y ? -1 : x > y ? 1 : 0;
    } else {
      return x > y ? -1 : x < y ? 1 : 0;
    }
  });
}

export function areArraysWithTheSameElements(arr1: any[], arr2: any[]): boolean {
  if ((!arr1 && arr2) || (arr1 && !arr2)) return false;
  if (arr1.length !== arr2.length) return false;
  return arr1.every((item) => arr2.includes(item));
}

export function sortStringArray(arr: string[]): string[] {
  if (!arr || arr.length === 0) return arr;

  return arr.sort((a, b) => a.localeCompare(b));
}

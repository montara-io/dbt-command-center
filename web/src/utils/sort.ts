import fuzzysort from "fuzzysort";

export function fuzzySearch<T>({
  searchTerm,
  items,
  keys,
}: {
  searchTerm: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
  keys: string[];
}) {
  const result = fuzzysort.go<T>(searchTerm, items, {
    keys,
    all: true,
  });

  return result;
}

import { GlobalStorageKey } from '../../services/storage';

export function getInitialActiveIndex({ localStorageKey }: { localStorageKey?: GlobalStorageKey }) {
  if (localStorageKey) {
    const activeIndex = localStorage.getItem(localStorageKey);
    return activeIndex ? parseInt(activeIndex) : 0;
  } else {
    return 0;
  }
}

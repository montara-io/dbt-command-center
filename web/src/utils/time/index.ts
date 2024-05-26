export const DEFAULT_DEBOUNCE_TIME = 500;

export function formatDuration(
  durationSeconds: number,
  { minimumValue = 1, isAccurate = false }: { minimumValue?: number; isAccurate?: boolean } = {},
) {
  if (durationSeconds < minimumValue) {
    return '-';
    // return `${Math.round(durationSeconds * 60)} Mins.`;
  } else if (durationSeconds < 60) {
    return `${Math.round(durationSeconds)} Sec${Math.round(durationSeconds) === 1 ? '' : 's'}.`;
  } else if (durationSeconds < 3600) {
    const minutes = Math.floor(durationSeconds / 60);
    const seconds = Math.round(durationSeconds % 60);
    const minText = `${minutes} Min${minutes === 1 ? '' : 's'}.`;
    const secText = isAccurate && seconds > 0 ? ` ${seconds} Sec${seconds === 1 ? '' : 's'}.` : '';
    return `${minText}${secText}`;
  } else {
    const hours = Math.floor(durationSeconds / 3600);
    const minutes = Math.round((durationSeconds % 3600) / 60);
    const hourText = `${hours} Hr${hours === 1 ? '' : 's'}.`;
    const minText = isAccurate && minutes > 0 ? ` ${minutes} Min${minutes === 1 ? '' : 's'}.` : '';
    return `${hourText}${minText}`;
  }
}

export const debounce = (fn, delay = DEFAULT_DEBOUNCE_TIME) => {
  let timeoutId;
  return (...args) => {
    if (timeoutId) clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
};

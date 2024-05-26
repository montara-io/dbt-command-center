import { formatDuration } from '.';

describe('time util', () => {
  it('should format duration', () => {
    expect(formatDuration(0.5)).toEqual('-');
    expect(formatDuration(1)).toEqual('1 Sec.');
    expect(formatDuration(60)).toEqual('1 Min.');
    expect(formatDuration(3600)).toEqual('1 Hr.');
  });

  it('should format duration to the second', () => {
    expect(
      formatDuration(65, {
        isAccurate: true,
      }),
    ).toEqual('1 Min. 5 Secs.');
    expect(
      formatDuration(3650, {
        isAccurate: true,
      }),
    ).toEqual('1 Hr. 1 Min.');
    expect(
      formatDuration(3605, {
        isAccurate: true,
      }),
    ).toEqual('1 Hr.');
    expect(
      formatDuration(195, {
        isAccurate: true,
      }),
    ).toEqual('3 Mins. 15 Secs.');
  });
});

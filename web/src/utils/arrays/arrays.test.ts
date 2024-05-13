import { arrayAverage, removeDuplicates } from '.';

describe('array utils', () => {
  it('should calculate the average of an array of numbers', () => {
    expect(arrayAverage([1, 2, 3])).toEqual(2);
  });

  it('should remove array duplicates', () => {
    expect(
      removeDuplicates([
        { name: 'raw_listings', assetType: 'Source' },
        { name: 'cleansed_listings', assetType: 'Model' },
        { name: 'cleansed_listings', assetType: 'Model' },
        { name: 'Test Dadi', assetType: 'MontaraReport' },
      ]),
    ).toHaveLength(3);
  });

  it('should remove duplicates #2', () => {
    expect(
      removeDuplicates([
        {
          label: 'Failed',
          value: 'error',
        },
        {
          label: 'Failed',
          value: 'error',
        },
        {
          label: 'Success',
          value: 'success',
        },
        {
          label: 'Success',
          value: 'success',
        },
        {
          label: 'Success',
          value: 'success',
        },
        {
          label: 'Success',
          value: 'success',
        },
      ]),
    ).toHaveLength(2);
  });
});

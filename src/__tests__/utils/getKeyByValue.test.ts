import getKeyByValue from '../../utils/getKeyByValue';

describe('getKeyByValue', () => {
  test('should return value by the key', () => {
    const testData = {
      a: 'hello',
      b: 'hi',
    };

    expect(getKeyByValue(testData, 'hello')).toBe('a');
    expect(getKeyByValue(testData, 'hi')).toBe('b');
    expect(getKeyByValue(testData, 'hi')).not.toBe('a');
  });
});

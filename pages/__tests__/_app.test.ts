describe('given a string', () => {
  test('returns the string twice', () => {
    const string = 'test';
    expect(string + string).toBe('testtest');
  });
});
const { numberToWord } = require('.');

describe('numberToWord', () => {
  test('should throw an error if input is not an integer', () => {
    expect(() => {
      numberToWord(12.34);
    }).toThrow(Error);
    expect(() => {
      numberToWord('123');
    }).toThrow(Error);
  });

  test('should throw an error if input is outside the range', () => {
    expect(() => {
      numberToWord(-1);
    }).toThrow(Error);
    expect(() => {
      numberToWord(1000000);
    }).toThrow(Error);
  });

  test('should return the correct word representation of the number', () => {
    expect(numberToWord(0)).toBe('Zero');
    expect(numberToWord(999999)).toBe('Nine hundred and ninety-nine thousand nine hundred and ninety-nine');
    expect(numberToWord(0o7)).toBe('Seven');
    expect(numberToWord(125)).toBe('One hundred and twenty-five');

  });


});


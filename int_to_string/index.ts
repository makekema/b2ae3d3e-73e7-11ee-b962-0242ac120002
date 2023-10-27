export function numberToWord(num: number): string {

  // 1. Check for edge case: is input integer & smaller than 999999
  if (!Number.isInteger(num)) {
    throw new Error('Input must be an integer');
  }
  if (num < 0 || num > 999999) {
    throw new Error('Input must be between 0 and 999999');
  }

  // 2. Define the digits in words, put them in arrays with corresponding indices from 0-9 for later use (zero is taken care of above)
  const singleDigits: string[] = ['', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
  const teenDigits: string[] = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
  const tensDigits: string[] = ['', '', 'twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];

  // 3. Write a script
  function convertToWord (num: number): string {
    if (num === 0) {
      return 'zero';
    } else if (num < 100) {
      return getTwoDigitsWord(num);
    } else if (num < 1000) {
      return getThreeDigitsWord(num);
    } else {
      return getGreaterThanThreeDigitsWord(num)
    }
  };

  // 4. Write a function that can give back a one digit number as a word
  function getDigitWord (digit: number): string {
    const digitWords: string[] = [
      'zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'
    ];
    return digitWords[digit];
  };

  // 5. Write a function that can give back a two digits number as a word
  function getTwoDigitsWord (num: number): string {
    if (num < 10) {
      return getDigitWord(num);
    } else if (num >= 10 && num < 20) {
      return teenDigits[num - 10]; // If the number is between 10 and 19, get the word representation from the 'teenDigits' array
    } else {
      const tens = Math.floor(num / 10); // Extract the tens digit, e.g. 55 / 10 --> 5
      const ones = num % 10; // Extract the ones digit using the modulo operation, e.g. 55 % 10 --> 5
      
      // Construct the word representation of the two-digit number
      return tensDigits[tens] + (ones > 0 ? '-' + getDigitWord(ones) : '');
      // Retrieve the word representation of the tens digit from the 'tensDigits' array
      // If the ones digit is greater than 0, append a hyphen and the word representation of the ones digit
      // If it is not greater than 0, than append an empty string
    }
  };

  // 6. Write a function that can give back a three digits number as a word
  function getThreeDigitsWord (num: number): string {
    const hundreds = Math.floor(num / 100); // Extract the hundreds digit, eg. 555 / 100 --> 5 OR 33 / 100 --> 0 OR 2 / 100 --> 0 
    const remainder = num % 100; // Extract the remainder after removing the hundreds digit,  555 % 100 --> 55 OR 33 % 100 --> 33 OR 2 % 100 --> 2

    // Initialize the result string
    let result = '';
    // Check if the number has a hundreds digit
    if (hundreds > 0) {
      result += singleDigits[hundreds] + ' hundred'; // Append the word representation of the hundreds digit followed by 'hundred'
    }
    // Check if there is a remainder
    if (remainder > 0) {
      // Check if there is already a result string, means a hundred
      if (result !== '') {
        result += ' and '; // If yes, append 'and'
      }
      // Append the remaining two-digit number as a word
      result += getTwoDigitsWord(remainder);
    }
    // Return the final word representation of the three-digit number
    return result;
  };

  // 7. Write a function that deals with a number that is greater than three digits
  function getGreaterThanThreeDigitsWord (num: number): string {
    const thousands = Math.floor(num / 1000); // Extract the thousands digit, eg. 55555 / 1000 --> 55
    const remainder = num % 1000; // Extract the remainder after removing the thousands digit,  55555 % 1000 --> 555
  
    let result = getThreeDigitsWord(thousands) + ' thousand'; // getThreeDigitsWord can also be initialized with a single-digit number or a two-digit number
    if (remainder > 0) {
      result += ' ' + getThreeDigitsWord(remainder);
    }
    return result;
  }
  const result = convertToWord(num);
  const capitalizedResult = result.charAt(0).toUpperCase() + result.slice(1);

  return capitalizedResult;
}

// Usage examples
// console.log(numberToWord(55555)); // Output: "one hundred and twenty-five"
// console.log(numberToWord(100)); // Output: "one hundred and twenty-five"
// console.log(numberToWord(1)); // Output: "one hundred and twenty-five"
// console.log(numberToWord(123457)); // Output: "one hundred and twenty-five"
// console.log(numberToWord(3467)); // Output: "one hundred and twenty-five"
// console.log(numberToWord(1000)); // Output: "one hundred and twenty-five"
// console.log(numberToWord(233303)); // Output: "one hundred and twenty-five"
// console.log(numberToWord(0o7)); // Output: "seven"
// console.log(numberToWord(99999)); // Output: "seven"
// console.log(numberToWord(2389729)); // Throws an error
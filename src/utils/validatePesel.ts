export function validatePesel(digits: string[]): boolean {
  const PESEL_WEIGHTS = [1, 3, 7, 9, 1, 3, 7, 9, 1, 3];

  const controlDigitIsValid = (): boolean => {
    const multipliedDigits = [];

    for (let index = 0; index < digits.length - 1; index++) {
      multipliedDigits[index] = +digits[index] * PESEL_WEIGHTS[index];
    }

    const sum = multipliedDigits.reduce((a, b) => a + b, 0);

    const calculatedControlDigit = (10 - (sum % 10)) % 10;

    return calculatedControlDigit === +digits[10];
  };

  const isBirthDateValid = (): boolean => {
    const yearPart = +digits.slice(0, 2);
    const monthPart = +digits.slice(2, 4);
    const dayPart = +digits.slice(4, 6);

    let year = 0;
    let month = 0;

    switch (true) {
      case monthPart >= 1 && monthPart <= 12:
        year = 1900 + yearPart;
        month = monthPart;
        break;

      case monthPart >= 21 && monthPart <= 32:
        year = 2000 + yearPart;
        month = monthPart - 20;
        break;

      case monthPart >= 41 && monthPart <= 52:
        year = 2100 + yearPart;
        month = monthPart - 40;
        break;

      case monthPart >= 61 && monthPart <= 72:
        year = 2200 + yearPart;
        month = monthPart - 60;
        break;

      case monthPart >= 81 && monthPart <= 92:
        year = 1800 + yearPart;
        month = monthPart - 80;
        break;

      default:
        return false;
    }

    if (month < 1 || month > 12 || dayPart < 1 || dayPart > 31) return false;

    const date = new Date(year, month - 1, dayPart);

    return (
      date.getFullYear() === year &&
      date.getMonth() === month - 1 &&
      date.getDate() === dayPart
    );
  };

  return controlDigitIsValid() && isBirthDateValid();
}

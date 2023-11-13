const dayCount = document.querySelector("#day-count span");
const monthCount= document.querySelector("#month-count span");
const yearCount = document.querySelector("#year-count span");

const dayError = document.getElementById("day-error")
const monthError = document.getElementById("month-error")
const yearError = document.getElementById("year-error")

const calculateButton = document.getElementById('calculate-button');

const initialize = () => {
  calculateButton.addEventListener('click', (e) => {
    e.preventDefault();

    const ageResult = calculateAge();
    setDisplay(ageResult);
  });
}

const calculateAge = () => {
  const dayInput = document.getElementById("day");
  const monthInput = document.getElementById("month")
  const yearInput = document.getElementById("year");

  const today = new Date();
  const birthdate = new Date(`${yearInput.value}-${monthInput.value}-${dayInput.value}`);

  const timeDiff = today - birthdate;
  const ageDifference = new Date(timeDiff);

  // Get the year, month, and day components
  const years = ageDifference.getUTCFullYear() - 1970;
  const months = ageDifference.getUTCMonth();
  const days = ageDifference.getUTCDate() - 1; // Subtract 1 to account for the initial day (e.g., 31 - 1 = 30)

  const dayHasError = handleDayError(dayInput, monthInput, dayError);
  const monthHasError = handleMonthError(monthInput, monthError);
  const yearHasError = handleYearError(yearInput, years, yearError);

  if (dayHasError || monthHasError || yearHasError) {
      return { years: '--', months: '--', days: '--' };
  }
  return { years, months, days };
}

const handleDayError = (dayInput, monthInput, errorDisplay) => {
  const monthsWith31Days = [1, 3, 5, 7, 8, 10, 12];
  const monthsWith30Days = [4, 6, 9, 11];
  const day = Number(dayInput.value);
  const month = Number(monthInput.value);
  if (
    (monthsWith31Days.includes(month) && day > 31) || 
    (monthsWith30Days.includes(month) && day > 30) ||
    (month == 2 && day > 28) ||
    day > 31
  ) {
    errorDisplay.innerText = "Must be a valid day";
    dayInput.setCustomValidity("Must be a valid day");
    return true;
  }
  return handleDefaultError(dayInput, errorDisplay);
}

const handleMonthError = (input, errorDisplay) => {
  const month = Number(input.value);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  if (month && !isNaN(month) && !months.includes(month)) {
    errorDisplay.innerText = "Must be a valid month";
    input.setCustomValidity("Must be a valid month");
    return true;
  }
  return handleDefaultError(input, errorDisplay);
}

const handleYearError = (input, ageYears, errorDisplay) => {
  const year = Number(input.value);
  console.log(ageYears);

  if (year) {
    if (!isNaN(year) && year > new Date().getFullYear() || ageYears < 0) {
      errorDisplay.innerText = "Must be in the past";
      input.setCustomValidity("Must be in the past");
      return true;
    } else if (year < 1000) {
      errorDisplay.innerText = "Invalid input";
      input.setCustomValidity("Invalid input");
      return true;
    }
  }
  return handleDefaultError(input, errorDisplay);
}

const handleDefaultError = (input, errorDisplay) => {
  let message = "";
  
  if (!input.value) {
    message = "This field is required";
  }

  errorDisplay.innerText = message;
  input.setCustomValidity(message);

  return message ? true : false;
}

const setDisplay = ({ years, months, days }) => {
  yearCount.innerText = years;
  monthCount.innerText = months;
  dayCount.innerText = days;
}

initialize();
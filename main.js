const passwordInput = document.querySelector('.js-password-input');
const copyButton = document.querySelector('.js-copy-btn');
const characterCount = document.querySelector('.js-count-number');
const characterSlider = document.querySelector('.js-range-slider');
const checkboxUppercase = document.getElementById('uppercase');
const checkboxLowercase = document.getElementById('lowercase');
const checkboxNumbers = document.getElementById('numbers');
const checkboxSymbols = document.getElementById('symbols');
const strengthIndicatorContainer = document.querySelector(
  '.js-strength-container'
);
const strengthText = document.querySelector('.js-strength-level');
const strengthBar = document.querySelectorAll('.js-strength-bar');
const generateButton = document.querySelector('.js-generate-btn');

// Event Listener on slider bar to update the character count display on the UI
characterSlider.addEventListener('input', (e) => {
  characterCount.textContent = e.target.value;
});

console.log(checkboxUppercase.checked);
console.log(checkboxLowercase.checked);
console.log(checkboxNumbers.checked);
console.log(checkboxSymbols.checked);

const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

function generatePassword() {
  let password = '';
  let passwordLength = characterSlider.value;

  if (checkboxUppercase.checked === true) {
    password += upperCaseLetters;
  }

  if (checkboxLowercase.checked === true) {
    password += lowerCaseLetters;
  }

  if (checkboxNumbers.checked === true) {
    password += numbers;
  }

  if (checkboxSymbols.checked === true) {
    password += symbols;
  }

  if (password.length === 0) {
    alert('please select at least one character type');
    return '';
  }

  let finalPassword = '';

  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * password.length);
    finalPassword += password[randomIndex];
  }

  console.log(finalPassword);
  return finalPassword;
}

generateButton.addEventListener('click', () => {
  passwordInput.value = generatePassword();
});

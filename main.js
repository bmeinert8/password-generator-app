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

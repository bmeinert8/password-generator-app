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

//Inital fill of task bar on page load
const min = 6;
  const max = 20;
  const initialValue = characterSlider.value; // Default is 10
  const initialPercentage = ((initialValue - min) / (max - min)) * 100;
  characterSlider.style.background = `linear-gradient(to right, #A4FFAF ${initialPercentage}%, #24232C ${initialPercentage}%)`;

// Event Listener on slider bar to update the character count display on the UI
characterSlider.addEventListener('input', (e) => {
  characterCount.textContent = e.target.value;

  const min = 6;
  const max = 20;
  const value = e.target.value;
  const percentage = ((value - min) / (max - min)) * 100;

  // Apply linear gradient
  characterSlider.style.background = `linear-gradient(to right, #A4FFAF ${percentage}%, #24232C ${percentage}%)`;
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
  let charTypes = 0;

  if (checkboxUppercase.checked) {
    password += upperCaseLetters;
    charTypes ++;
  }

  if (checkboxLowercase.checked) {
    password += lowerCaseLetters;
    charTypes ++;
  }

  if (checkboxNumbers.checked) {
    password += numbers;
    charTypes++;
  }

  if (checkboxSymbols.checked) {
    password += symbols;
    charTypes++;
  }

  if (password.length === 0) {
    alert('please select at least one character type');
    return '';
  }

  console.log(charTypes);

let passwordStrength = '';
let strengthLevel = 0; // To determine number of bars (1-4)

if (charTypes === 4 || (charTypes === 3 && passwordLength >= 12)) {
  passwordStrength = 'Strong';
  strengthLevel = 4;
} else if ((charTypes === 3 && passwordLength >= 8) || (charTypes === 2 && passwordLength >= 10)) {
  passwordStrength = 'Medium';
  strengthLevel = 3;
} else if ((charTypes === 2 && passwordLength < 10) || (charTypes === 3 && passwordLength < 8)) {
  passwordStrength = 'Weak';
  strengthLevel = 2;
} else if (charTypes < 2) { // Length check not needed since min is 6
  passwordStrength = 'Too Weak!';
  strengthLevel = 1;
}

console.log(passwordStrength, 'Level:', strengthLevel);

strengthText.textContent = passwordStrength.toUpperCase();

strengthBar.forEach(bar => {
    bar.classList.remove('bar-filled-red', 'bar-filled-orange', 'bar-filled-yellow', 'bar-filled-green');
  });

  const colors = ['bar-filled-red', 'bar-filled-orange', 'bar-filled-yellow', 'bar-filled-green'];
  for (let i = 0; i < strengthLevel; i++) {
    strengthBar[i].classList.add(colors[i]);
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

copyButton.addEventListener('click', () => {
  const passwordToCopy = passwordInput.value;

  navigator.clipboard.writeText(passwordToCopy)
    .then(() => {
      alert('Copied to clipboard');
    })
    .catch((err) => {
      console.log('Copy failed', err);
    });
});
const passwordInput = document.querySelector('.js-password-input');
const copyButton = document.querySelector('.js-copy-btn');
const characterCount = document.querySelector('.js-count-number');
const characterSlider = document.querySelector('.js-range-slider');
const checkboxUppercase = document.getElementById('uppercase');
const checkboxLowercase = document.getElementById('lowercase');
const checkboxNumbers = document.getElementById('numbers');
const checkboxSymbols = document.getElementById('symbols');
const copiedText = document.querySelector('.js-copied-text');
const strengthIndicatorContainer = document.querySelector(
  '.js-strength-container'
);
const strengthText = document.querySelector('.js-strength-level');
const strengthBar = document.querySelectorAll('.js-strength-bar');
const generateButton = document.querySelector('.js-generate-btn');

//Slider constants
const MIN = 6;
const MAX = 20;
const FILLED_COLOR = '#A4FFAF';
const UNFILLED_COLOR = '#000000';

// Character sets for password generation
const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

// Configuration array for checkboxes and their character sets
const characterSets = [
  { checkbox: checkboxUppercase, characters: upperCaseLetters },
  { checkbox: checkboxLowercase, characters: lowerCaseLetters },
  { checkbox: checkboxNumbers, characters: numbers },
  { checkbox: checkboxSymbols, characters: symbols },
];

// Event Listeners
// Inital fill of task bar on page load with default value (10)
updateSliderFill(characterSlider.value);
toggleCopyButton();
const initialCharTypes = characterSets.filter(
  ({ checkbox }) => checkbox.checked
).length;
updateStrength(initialCharTypes, characterSlider.value);

// Update character count and slider fill when the slider value changes
characterSlider.addEventListener('input', (e) => {
  const value = e.target.value;
  characterCount.textContent = value;
  updateSliderFill(value);
  const charTypes = characterSets.filter(
    ({ checkbox }) => checkbox.checked
  ).length;
  updateStrength(charTypes, value); // Update strength based on slider value and checked checkboxes
});

// Prevent unchecking all checkboxes
characterSets.forEach(({ checkbox }) => {
  checkbox.addEventListener('change', (e) => {
    const checkedCount = characterSets.filter(
      (set) => set.checkbox.checked
    ).length;
    if (checkedCount === 0) {
      e.preventDefault();
      e.target.checked = true; // Revert the change
    } else {
      const charTypes = checkedCount;
      updateStrength(charTypes, characterSlider.value);
    }
  });
});

// Functions

// Function to toggle the copy button state based on whether the password is empy
function toggleCopyButton() {
  const isPlaceholder = passwordInput.classList.contains('placeholder');
  const hasContent = passwordInput.textContent && !isPlaceholder;
  copyButton.disabled = !hasContent;
}

// Function to update slider fill
function updateSliderFill(value) {
  const percentage = ((value - MIN) / (MAX - MIN)) * 100;
  characterSlider.style.background = `linear-gradient(to right, ${FILLED_COLOR} ${percentage}%, ${UNFILLED_COLOR} ${percentage}%`;
}

// Generate password based on selecter character types and length
function generatePassword() {
  let password = '';
  let passwordLength = characterSlider.value;
  let charTypes = 0;

  characterSets.forEach(({ checkbox, characters }) => {
    if (checkbox.checked) {
      password += characters;
      charTypes++;
    }
  });

  let finalPassword = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * password.length);
    finalPassword += password[randomIndex];
  }

  console.log(finalPassword);
  return { password: finalPassword, charTypes, passwordLength };
}

// Update the strength indicator UI based on character types and length
function updateStrength(charTypes, passwordLength) {
  let passwordStrength = '';
  let strengthLevel = 0;

  if (charTypes === 4 || (charTypes === 3 && passwordLength >= 12)) {
    passwordStrength = 'Strong';
    strengthLevel = 4;
  } else if (
    (charTypes === 3 && passwordLength >= 8) ||
    (charTypes === 2 && passwordLength >= 10)
  ) {
    passwordStrength = 'Medium';
    strengthLevel = 3;
  } else if (
    (charTypes === 2 && passwordLength < 10) ||
    (charTypes === 3 && passwordLength < 8)
  ) {
    passwordStrength = 'Weak';
    strengthLevel = 2;
  } else if (charTypes < 2) {
    passwordStrength = 'Too Weak!';
    strengthLevel = 1;
  }

  console.log(passwordStrength, 'Level:', strengthLevel);

  strengthText.textContent = passwordStrength.toUpperCase();

  strengthBar.forEach((bar) => {
    bar.classList.remove(
      'bar-filled-red',
      'bar-filled-orange',
      'bar-filled-yellow',
      'bar-filled-green'
    );
  });

  const colors = [
    'bar-filled-red',
    'bar-filled-orange',
    'bar-filled-yellow',
    'bar-filled-green',
  ];
  for (let i = 0; i < strengthLevel; i++) {
    strengthBar[i].classList.add(colors[i]);
  }
}

// Handle the generate button click to create and display a new password
generateButton.addEventListener('click', () => {
  const { password, charTypes, passwordLength } = generatePassword();
  passwordInput.textContent = password;
  passwordInput.classList.remove('placeholder');
  updateStrength(charTypes, passwordLength);
  toggleCopyButton();
});

let copyTimeout;
// Handle copy button click to copy pasword to clipboard
copyButton.addEventListener('click', () => {
  const passwordToCopy = passwordInput.textContent;

  navigator.clipboard
    .writeText(passwordToCopy)
    .then(() => {
      copiedText.classList.remove('hidden');

      if (copyTimeout) {
        clearTimeout(copyTimeout);
      }

      copyTimeout = setTimeout(() => {
        copiedText.classList.add('hidden');
      }, 2000);
    })
    .catch((err) => {
      console.log('Copy failed', err);
    });
});

const passwordInput = document.querySelector('.js-password-input');
const copyButton = document.querySelector('.js-copy-btn');
const characterCount = document.querySelector('.js-count-number');
const characterSlider = document.querySelector('.js-range-slider');
const checkboxUppercase = document.getElementById('uppercase');
const checkboxLowercase = document.getElementById('lowercase');
const checkboxNumbers = document.getElementById('numbers');
const checkboxSymbols = document.getElementById('symbols');
const checkboxContainer = document.querySelector('.js-checkbox-container');
const strengthIndicatorContainer = document.querySelector(
  '.js-strength-container'
);
const strengthText = document.querySelector('.js-strength-level');
const strengthBar = document.querySelectorAll('.js-strength-bar');
const generateButton = document.querySelector('.js-generate-btn');
const modal = document.getElementById('errorModal');
const closeBtn = document.querySelector('.modal-close-btn');

//Slider constants
const MIN = 6;
const MAX = 20;
const FILLED_COLOR = '#A4FFAF';
const UNFILLED_COLOR = '#000000';

// Function to update slider fill
function updateSliderFill(value) {
  const percentage = ((value - MIN) / (MAX - MIN)) * 100;
  characterSlider.style.background = `linear-gradient(to right, ${FILLED_COLOR} ${percentage}%, ${UNFILLED_COLOR} ${percentage}%`;
}

//Inital fill of task bar on page load
updateSliderFill(characterSlider.value);

// Event Listener on slider bar to update the character count display on the UI
characterSlider.addEventListener('input', (e) => {
  const value = e.target.value;
  characterCount.textContent = value;
  updateSliderFill(value);
});

// Close modal when the close button is clicked
closeBtn.addEventListener('click', () => {
  modal.classList.remove('show');
});

const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
const numbers = '0123456789';
const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';

const characterSets = [
  { checkbox: checkboxUppercase, characters: upperCaseLetters },
  { checkbox: checkboxLowercase, characters: lowerCaseLetters },
  { checkbox: checkboxNumbers, characters: numbers},
  { checkbox: checkboxSymbols, characters: symbols},
];

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

  if (password.length === 0) {
    showModal('Please select at least one character type');
    return { password: '', charTypes: 0, passwordLength };
  }

  let finalPassword = '';
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * password.length);
    finalPassword += password[randomIndex];
  }

  console.log(finalPassword);
  return { password: finalPassword, charTypes, passwordLength };
}

function updateStrength(charTypes, passwordLength) {
  let passwordStrength = '';
  let strengthLevel = 0;

  if (charTypes === 4 || (charTypes === 3 && passwordLength >= 12)) {
    passwordStrength = 'Strong';
    strengthLevel = 4;
  } else if ((charTypes === 3 && passwordLength >=8) || (charTypes === 2 && passwordLength >= 10)) {
    passwordStrength = 'Medium';
    strengthLevel = 3;
  } else if ((charTypes === 2 && passwordLength < 10) || (charTypes === 3 && passwordLength < 8)) {
    passwordStrength = 'Weak';
    strengthLevel = 2;
  } else if (charTypes < 2) {
    passwordStrength = 'Too Week!';
    strengthLevel = 1;
  }

  console.log(passwordStrength, 'Level:', strengthLevel);

  strengthText.textContent = passwordStrength.toUpperCase();

  strengthBar.forEach( bar => {
    bar.classList.remove('bar-filled-red', 'bar-filled-orange', 'bar-filled-yellow', 'bar-filled-green');
  });

  const colors = ['bar-filled-red', 'bar-filled-orange', 'bar-filled-yellow', 'bar-filled-green'];
  for( let i = 0; i < strengthLevel; i++) {
    strengthBar[i].classList.add(colors[i]);
  }
}

// Show the modal with a given message
function showModal(message) {
  const modalMessage = modal.querySelector('.modal-message');
  modalMessage.textContent = message;
  modal.classList.add('show');
}

generateButton.addEventListener('click', () => {
  const { password, charTypes, passwordLength } = generatePassword();
  passwordInput.value = password;
  if (password !== '') {
    updateStrength(charTypes, passwordLength);
  } else {
    strengthText.textContent = '';
    strengthBar.forEach(bar => {
      bar.classList.remove('bar-filled-red', 'bar-filled-orange', 'bar-filled-yellow', 'bar-filled-green');
    });
  }
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
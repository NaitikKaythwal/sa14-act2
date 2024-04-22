const registrationForm = document.getElementById('registration-form');
const usernameInput = document.getElementById('username');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');
const usernameError = document.getElementById('username-error');
const emailError = document.getElementById('email-error');
const passwordError = document.getElementById('password-error');

registrationForm.addEventListener('submit', function(event) {
    event.preventDefault();
    clearErrors();

    const usernameValue = usernameInput.value.trim();
    const emailValue = emailInput.value.trim();
    const passwordValue = passwordInput.value.trim();

    let isValid = true;

    if (usernameValue.length < 6) {
        showError(usernameError, 'Username must be at least 6 characters long');
        isValid = false;
    }

    if (!isValidEmail(emailValue)) {
        showError(emailError, 'Please enter a valid email address');
        isValid = false;
    }

    if (passwordValue.length < 8 || !containsCapitalAndNumber(passwordValue)) {
        showError(passwordError, 'Password must be at least 8 characters long and contain at least one capital letter and one number');
        isValid = false;
    }

    if (isValid) {
        alert('Registration successful!');
        registrationForm.reset();
    }
});

function showError(element, message) {
    element.textContent = message;
}

function clearErrors() {
    showError(usernameError, '');
    showError(emailError, '');
    showError(passwordError, '');
}

function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

function containsCapitalAndNumber(password) {
    const capitalLetterRegex = /[A-Z]/;
    const numberRegex = /[0-9]/;
    return capitalLetterRegex.test(password) && numberRegex.test(password);
}

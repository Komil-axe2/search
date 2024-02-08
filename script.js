const resultEl = document.querySelector(".result");
const lengthEl = document.getElementById("length");
const uppercaseEl = document.getElementById("uppercase");
const lowercaseEl = document.getElementById("lowercase");
const numbersEl = document.getElementById("numbers");
const symbolsEl = document.getElementById("symbols");
const generateEl = document.getElementById("generate");
const clipboardEl = document.getElementById("clipboard");

// Object to hold reference to the random functions
const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol,
};

// Event listener for clipboard copy
clipboardEl.addEventListener("click", () => {
    const password = resultEl.innerText;
    if (!password) {
        return;
    }

    navigator.clipboard.writeText(password);
    alert("Password copied to clipboard!");
});

// Event listener for generate password button
generateEl.addEventListener("click", () => {
    const length = +lengthEl.value;
    const hasLower = lowercaseEl.checked;
    const hasUpper = uppercaseEl.checked;
    const hasNumber = numbersEl.checked;
    const hasSymbol = symbolsEl.checked;

    // Validate the length
    if (length < 4 || length > 32) {
        alert("Password length must be between 4 and 32 characters");
        return;
    }

    // Generate the password and display
    resultEl.innerText = generatePassword(hasUpper, hasLower, hasNumber, hasSymbol, length);
});

// Function to generate the password
function generatePassword(upper, lower, number, symbol, length) {
    let generatedPassword = "";
    const typeCount = upper + lower + number + symbol;
    const typesArr = [{ upper }, { lower }, { number }, { symbol }].filter(item => Object.values(item)[0]);

    // Check if no options are selected
    if (typeCount === 0) {
        alert("Please select at least one option for password generation");
        return;
    }

    // Loop through password length
    for (let i = 0; i < length; i += typeCount) {
        typesArr.forEach(type => {
            const funcName = Object.keys(type)[0];
            generatedPassword += randomFunc[funcName]();
        });
    }

    // Trim the password to the desired length
    const finalPassword = generatedPassword.slice(0, length);

    return finalPassword;
}

// Function to generate random lowercase letter
function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

// Function to generate random uppercase letter
function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

// Function to generate random number
function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

// Function to generate random symbol
function getRandomSymbol() {
    const symbols = '!@#$%^&*(){}[]=<>/,.';
    return symbols[Math.floor(Math.random() * symbols.length)];
}

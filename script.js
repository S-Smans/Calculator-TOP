const add = (num1, num2) => {
    return num1 + num2;
}

const subtract = (num1, num2) => {
    return num1 - num2;
}

const multiply = (num1, num2) => {
    return num1 * num2;
}

const divide = (num1, num2) => {
    return num1 / num2;
}

// Recieves an operator and numbers that calls the required function
const operate = (operator, num1, num2) => {
    num1 = Number(num1);
    num2 = Number(num2);

    switch (operator) {
        case "+":
            return add(num1, num2);
        case "-":
            return subtract(num1, num2);
        case "*":
            return multiply(num1, num2);
        case "/":
            return divide(num1, num2);
        default:
            return "ERROR";
    }
}

// Gets all buttons from HTML
const buttons = [...document.querySelectorAll("button")];

// Gets main screen from HTML
let displayValue = document.getElementById("main-screen");
let historyValue = document.getElementById("history-screen");

const numberRegex = /^[0-9]/;
const deleteAllRegex = /^[A]/;
const undoRegex = /^[C]/;
const operatorRegex = /[+\-/*]/;
const equalsRegex = /[=]/;
const dotRegex = /[.]/;

let firstOperand = 0;
let secondOperand = 0;
let currentOperator = "+";

// Gets the clicked buttons value and does the required operations on it
const handleValue = (event) => {
    const value = event.target.innerText;

    if (numberRegex.test(value)) {
        // Displays pressed button value(number) on screen
        displayNumber(value);
    } else if (deleteAllRegex.test(value)) {
        // Deletes all input on screen
        deleteAll();
    } else if (undoRegex.test(value)) {
        // Deletes the last input
        undoInput();
    } else if (operatorRegex.test(value)) {
        // Displays operator to the screen
        displayOperator(value);
    } else if (equalsRegex.test(value)) {
        calculate();
    } else if (dotRegex.test(value)) {
        addDot();
    }
}

const addDot = () => {
    if (operatorRegex.test(displayValue.innerText)) {
        secondOperand = displayValue.innerText.substring(displayValue.innerText.indexOf(currentOperator) + 1);
        if (!dotRegex.test(secondOperand)) {
            displayValue.innerText += ".";
        }
    }

    if (!dotRegex.test(displayValue.innerText) && displayValue.innerText !== "") {
        displayValue.innerText += ".";
    }
}

const displayNumber = (number) => {
    if (displayValue.innerText.length <= 12) {
        displayValue.innerText += number;
    }
}

const deleteAll = () => {
    displayValue.innerText = "";
    historyValue.innerText = "";
    firstOperand = 0;
    secondOperand = 0;
    currentOperator = "+";
}

const undoInput = () => {
    displayValue.innerText = displayValue.innerText.substring(0, displayValue.innerText.length - 1);
}

const displayOperator = (operator) => {
    // If display is empty then only add - operator
    if (displayValue.innerText === "" && operator === "-") {
        displayValue.innerText = "-";
        return;
    } else if (displayValue.innerText === "") {
        return;
    }

    if (!operatorRegex.test(displayValue.innerText)) {
        firstOperand = displayValue.innerText;
        currentOperator = operator;
        displayValue.innerText += operator;
    } else if (secondOperand) {
        calculate();
        firstOperand = displayValue.innerText;
        currentOperator = operator;
        displayValue.innerText += operator;
    }
}

const calculate = () => {
    // If "=" is pressed right after pressing it then do nothing
    if (!currentOperator) {
        return;
    }

    secondOperand = displayValue.innerText.substring(displayValue.innerText.indexOf(currentOperator) + 1);
    const result = operate(currentOperator, firstOperand, secondOperand);
    historyValue.innerText = displayValue.innerText;
    displayValue.innerText = result;

    firstOperand = result;
    currentOperator = undefined;
    secondOperand = 0;
}

// Ads a event for each button click
buttons.forEach(button => {
    button.addEventListener("click", handleValue);
})

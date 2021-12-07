// retrieve elements from DOM
const mainDisplayElement = document.querySelector('#main-display');
const operationDisplayElement = document.querySelector('#operation-display');
const tempDisplayElement = document.querySelector('#temporary-result');
const operationElements = document.querySelectorAll('.operation');
const numberElements = document.querySelectorAll('.number');
const clearAllElement = document.querySelector("#clear-all");
const clearLastElement = document.querySelector("#clear-last");
const equalsElement = document.querySelector("#equals");

// global variable declarations
let operationDisplay = '';
let mainDisplay = '';
let result = null;
let lastOperation = '';
let hasDecimal = false;

// EVENT LISTENERS
// listen for click on number buttons
numberElements.forEach(number => {
    number.addEventListener('click', (e)=> {
        if (e.target.innerHTML === '.' && !hasDecimal){
            hasDecimal = true;
        } else if (e.target.innerHTML === '.' && hasDecimal){
            return;
        }
        mainDisplay += e.target.innerHTML;
        mainDisplayElement.innerHTML = mainDisplay;
    })
});

// listen for click on operation buttons
operationElements.forEach(operation => {
    operation.addEventListener('click', (e)=> {
        if (!mainDisplay) result;
        hasDecimal = false;
        const operationType = e.target.innerHTML;
        if (operationDisplay && mainDisplay && lastOperation){
            performOperation();
        } else {
             result = parseFloat(mainDisplay); 
        }
        clearMain(operationType);
        lastOperation = operationType;
    })
});

// listen for click on equals button
equalsElement.addEventListener('click', (e)=> {
    if (!mainDisplay || !operationDisplay) return;
    hasDecimal = false;
    performOperation();
    clearMain();
    operationDisplay += ' = ';
    mainDisplayElement.innerHTML = result;
    tempDisplayElement.innerHTML = '';
    mainDisplay = result;
    lastOperation = '';
});

// listen for click on clear all button
clearAllElement.addEventListener('click', (e)=> {
    operationDisplayElement.innerHTML = '0';
    mainDisplayElement.innerHTML = '0';
    tempDisplayElement.innerHTML = '0';
    mainDisplay = '';
    operationDisplay = '';
    result = '';
});

// listen for click on clear last entry button
clearLastElement.addEventListener('click', (e)=> {
    mainDisplayElement.innerHTML = '';
    mainDisplay = '';
});

// listen for keys pressed on the keyboard
window.addEventListener('keydown', (e)=>{
    if (
        e.key === '0' ||
        e.key === '1' ||
        e.key === '2' ||
        e.key === '3' ||
        e.key === '4' ||
        e.key === '5' ||
        e.key === '6' ||
        e.key === '7' ||
        e.key === '8' ||
        e.key === '9' ||
        e.key === '.'
    ){
        clickNumberElement(e.key);
    } else if (
        e.key === '-' ||
        e.key === '/' ||
        e.key === '+' 
    ) {
        clickOperationElement(e.key);
    } else if (e.key === '*') {
        clickOperationElement('x');
    } else if (e.key == 'Enter' || e.key === '=') {
        clickEqualsButton();
    }
})

// FUNCTIONS
// function to clear the main display and enter history of operations in the upper box 
function clearMain (operation = ''){
    operationDisplay += mainDisplay + ' ' + operation + ' ';
    operationDisplayElement.innerHTML = operationDisplay;
    mainDisplayElement.innerHTML = '';
    mainDisplay = '';
    tempDisplayElement.innerHTML = result;
}

// function to perform calculations
function performOperation() {
    if (lastOperation === 'x') {       
        result = parseFloat(result) * parseFloat(mainDisplay);
    } else if(lastOperation ==='+') {
        result = parseFloat(result) + parseFloat(mainDisplay);
    } else if (lastOperation === '-') {
        result = parseFloat(result) - parseFloat(mainDisplay);
    } else if (lastOperation === '÷') {
        result = parseFloat(result) / parseFloat(mainDisplay);
    }
}

// function to click the number buttons
function clickNumberElement(key) {
    numberElements.forEach(button => {
        if (button.innerHTML === key) {
            button.click();
        }
    })
}

// function to click the operation buttons
function clickOperationElement(key) {
    operationElements.forEach(button => {
        if (button.innerHTML === key) {
            button.click();
        }
    })
}

// function to click the equals button
function clickEqualsButton() {
    equalsElement.click();
}

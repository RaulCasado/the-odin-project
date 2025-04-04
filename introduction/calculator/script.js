class Calculator {
    constructor(displayElement) {
        this.displayElement = displayElement;
        this.currentDisplay = '0';
        this.firstOperand = null;
        this.currentOperator = null;
        this.waitingForSecondOperand = false;
        this.updateDisplay();
    }
    
    updateDisplay() {
        this.displayElement.textContent = this.currentDisplay;
    }
    
    inputNumber(num) {
        const shouldReplace = this.waitingForSecondOperand || this.currentDisplay === '0';
        if (shouldReplace) {
            this.currentDisplay = num;
            this.waitingForSecondOperand = false;
        } else {
            this.currentDisplay += num;
        }
        this.updateDisplay();
    }
    
    inputDecimal() {
        if (this.waitingForSecondOperand) {
            this.currentDisplay = '0.';
            this.waitingForSecondOperand = false;
            this.updateDisplay();
            return;
        }
        if (!this.currentDisplay.includes('.')) {
            this.currentDisplay += '.';
            this.updateDisplay();
        }
    }
    
    handleOperator(nextOperator) {
        const inputValue = parseFloat(this.currentDisplay);
        
        if (this.currentOperator && this.waitingForSecondOperand) {
            this.currentOperator = nextOperator;
            return;
        }
        if (this.firstOperand === null) {
            this.firstOperand = inputValue;
        } else if (this.currentOperator) {
            const result = this.operate(this.currentOperator, this.firstOperand, inputValue);
            this.currentDisplay = `${parseFloat(result.toFixed(7))}`;
            this.firstOperand = result;
            this.updateDisplay();
        }
        this.waitingForSecondOperand = true;
        this.currentOperator = nextOperator;
    }
    
    handleEquals() {
        if (this.currentOperator === null || this.waitingForSecondOperand)
            return;
        const inputValue = parseFloat(this.currentDisplay);
        const result = this.operate(this.currentOperator, this.firstOperand, inputValue);
        this.currentDisplay = `${parseFloat(result.toFixed(7))}`;
        this.firstOperand = null;
        this.currentOperator = null;
        this.waitingForSecondOperand = true;
        this.updateDisplay();
    }
    
    operate(operator, a, b) {
        // Do not use the eval fuction
        // Here we could use a object with functions as values
        // but I think this is more readable and given the few operators
        // it is not a big deal
        a = parseFloat(a);
        b = parseFloat(b);
        switch (operator) {
            case '+': return a + b;
            case '-': return a - b;
            case '*': return a * b;
            case '/':
                if (b === 0) {
                    alert("Can't divide by zero!");
                    this.clear();
                    return NaN;
                }
                return a / b;
            default: return b;
        }
    }
    
    clear() {
        this.currentDisplay = '0';
        this.firstOperand = null;
        this.currentOperator = null;
        this.waitingForSecondOperand = false;
        this.updateDisplay();
    }
    
    backspace() {
        this.currentDisplay = this.currentDisplay.slice(0, -1);
        if (this.currentDisplay === '')
            this.currentDisplay = '0';
        this.updateDisplay();
    }
}

// Event Listeners and Calculator initialization
const display = document.querySelector('.display');
const calculator = new Calculator(display);

document.querySelectorAll('.number').forEach(button => {
    button.addEventListener('click', () => calculator.inputNumber(button.dataset.number));
});

document.querySelectorAll('.operator').forEach(button => {
    button.addEventListener('click', () => calculator.handleOperator(button.dataset.operator));
});

document.querySelector('.equals').addEventListener('click', () => calculator.handleEquals());
document.querySelector('.clear').addEventListener('click', () => calculator.clear());
document.querySelector('.decimal').addEventListener('click', () => calculator.inputDecimal());
document.querySelector('.backspace').addEventListener('click', () => calculator.backspace());

document.addEventListener('keydown', (e) => {
    e.preventDefault();
    const keyActions = {
        '.': () => calculator.inputDecimal(),
        'Enter': () => calculator.handleEquals(),
        'Escape': () => calculator.clear(),
        'Backspace': () => calculator.backspace(),
        '+': () => calculator.handleOperator('+'),
        '-': () => calculator.handleOperator('-'),
        '*': () => calculator.handleOperator('*'),
        '/': () => calculator.handleOperator('/')
    };
    
    if (e.key >= '0' && e.key <= '9') {
        calculator.inputNumber(e.key);
    }
    if (keyActions[e.key]) {
        keyActions[e.key]();
    }
});
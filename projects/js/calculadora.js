// Conteúdo de calculadora-js.txt

let currentInput = '0';
let previousInput = '';
let operator = '';

function updateDisplay() {
    document.getElementById('display').textContent = currentInput;
    document.getElementById('history').textContent = previousInput + ' ' + operator;
}

function appendNumber(num) {
    if (currentInput === '0' && num !== '.') {
        currentInput = num;
    } else if (num === '.' && currentInput.includes('.')) {
        return;
    } else {
        currentInput += num;
    }
    updateDisplay();
}

function appendOperator(op) {
    if (currentInput === '' && previousInput !== '') {
        operator = op;
        updateDisplay();
        return;
    }

    if (previousInput !== '' && currentInput !== '') {
        calculate();
    }

    operator = op;
    previousInput = currentInput;
    currentInput = '';
    updateDisplay();
}

function calculate() {
    if (previousInput === '' || currentInput === '' || operator === '') {
        return;
    }

    const prev = parseFloat(previousInput);
    const current = parseFloat(currentInput);
    let result = 0;

    switch (operator) {
        case '+':
            result = prev + current;
            break;
        case '-':
            result = prev - current;
            break;
        case '*':
            result = prev * current;
            break;
        case '/':
            result = current !== 0 ? prev / current : 'Erro';
            break;
        case '%':
            result = prev % current;
            break;
    }

    currentInput = result.toString();
    operator = '';
    previousInput = '';
    updateDisplay();
}

function clearDisplay() {
    currentInput = '0';
    previousInput = '';
    operator = '';
    updateDisplay();
}

// Suporte ao teclado (Opcional: Garante que as funções existam no escopo global para o HTML)
document.addEventListener('keydown', function (event) {
    const key = event.key;

    if (key >= '0' && key <= '9' || key === '.') {
        appendNumber(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/' || key === '%') {
        appendOperator(key);
    } else if (key === 'Enter' || key === '=') {
        calculate();
    } else if (key === 'Delete' || key === 'c' || key === 'C') {
        clearDisplay();
    }
});

// Inicializa o display ao carregar a página
document.addEventListener('DOMContentLoaded', updateDisplay);
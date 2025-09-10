let currentOperand = '0';
        let previousOperand = '';
        let operation = undefined;

        const currentOperandElement = document.getElementById('currentOperand');
        const previousOperandElement = document.getElementById('previousOperand');

        function updateDisplay() {
            currentOperandElement.textContent = formatNumber(currentOperand);
            
            if (operation != null) {
                previousOperandElement.textContent = 
                    `${formatNumber(previousOperand)} ${operation}`;
            } else {
                previousOperandElement.textContent = previousOperand;
            }
        }

        function formatNumber(number) {
            if (number === '') return '';
            if (number === '.') return '.';
            
            const stringNumber = number.toString();
            const integerDigits = parseFloat(stringNumber.split('.')[0]);
            const decimalDigits = stringNumber.split('.')[1];
            let integerDisplay;
            
            if (isNaN(integerDigits)) {
                integerDisplay = '';
            } else {
                integerDisplay = integerDigits.toLocaleString('en', {
                    maximumFractionDigits: 0
                });
            }
            
            if (decimalDigits != null) {
                return `${integerDisplay}.${decimalDigits}`;
            } else {
                return integerDisplay;
            }
        }

        function clearAll() {
            currentOperand = '0';
            previousOperand = '';
            operation = undefined;
            updateDisplay();
            animateButton(event.target);
        }

        function deleteNumber() {
            if (currentOperand === '0') return;
            
            currentOperand = currentOperand.toString().slice(0, -1);
            if (currentOperand === '' || currentOperand === '-') {
                currentOperand = '0';
            }
            updateDisplay();
            animateButton(event.target);
        }

        function appendNumber(number) {
            if (number === '.' && currentOperand.includes('.')) return;
            
            if (currentOperand === '0' && number !== '.') {
                currentOperand = number;
            } else {
                currentOperand = currentOperand.toString() + number.toString();
            }
            
            updateDisplay();
            animateButton(event.target);
            currentOperandElement.classList.add('pulse');
            setTimeout(() => currentOperandElement.classList.remove('pulse'), 200);
        }

        function chooseOperation(op) {
            if (currentOperand === '') return;
            
            if (previousOperand !== '') {
                compute();
            }
            
            operation = op;
            previousOperand = currentOperand;
            currentOperand = '0';
            updateDisplay();
            animateButton(event.target);
        }

        function compute() {
            let computation;
            const prev = parseFloat(previousOperand);
            const current = parseFloat(currentOperand);
            
            if (isNaN(prev) || isNaN(current)) return;
            
            currentOperandElement.parentElement.classList.add('calculating');
            
            switch (operation) {
                case '+':
                    computation = prev + current;
                    break;
                case '-':
                case '−':
                    computation = prev - current;
                    break;
                case '×':
                case '*':
                    computation = prev * current;
                    break;
                case '÷':
                case '/':
                    computation = prev / current;
                    break;
                default:
                    return;
            }
            
            setTimeout(() => {
                currentOperand = computation.toString();
                operation = undefined;
                previousOperand = '';
                updateDisplay();
                currentOperandElement.parentElement.classList.remove('calculating');
            }, 300);
            
            animateButton(event.target);
        }

        function animateButton(button) {
            if (!button) return;
            button.style.transform = 'scale(0.95)';
            setTimeout(() => {
                button.style.transform = '';
            }, 100);
        }

        // Keyboard support
        document.addEventListener('keydown', (event) => {
            if (event.key >= '0' && event.key <= '9') {
                appendNumber(event.key);
            } else if (event.key === '.') {
                appendNumber('.');
            } else if (event.key === '+' || event.key === '-' || event.key === '*' || event.key === '/') {
                const operatorMap = {
                    '+': '+',
                    '-': '−',
                    '*': '×',
                    '/': '÷'
                };
                chooseOperation(operatorMap[event.key]);
            } else if (event.key === 'Enter' || event.key === '=') {
                compute();
            } else if (event.key === 'Backspace') {
                deleteNumber();
            } else if (event.key === 'Escape') {
                clearAll();
            }
        });

        // Initialize display
        updateDisplay();
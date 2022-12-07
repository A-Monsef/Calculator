class Calculator {

  constructor(previousOperandTextElement, currentOperandTextElement) {
    this.previousOperandTextElement = previousOperandTextElement;
    this.currentOperandTextElement = currentOperandTextElement;
    this.currentOperand = ``;
    this.previousOperand = ``;
  }
  clear() {
    this.currentOperand = ``;
    this.previousOperand = ``;
    this.operation = undefined;
  }
  delete() {
    this.currentOperand = this.currentOperand.toString().slice(0, -1);
  }

  appendNumber(number) {
    if (number === `.` && this.currentOperand.includes(`.`)) return;
    if (number === `( )`) {
      if (this.currentOperand && this.currentOperand.includes(`(`)) {
        this.currentOperand += ")";
      } else {
        this.currentOperand += "(";
      }
    } else {
      this.currentOperand = this.currentOperand
        ? this.currentOperand + number.toString()
        : number.toString();
    }
  }
  chooseOperation(operation) {
    if (this.currentOperand === ``) return;
    if (this.previousOperand !== ``) {
      this.compute();
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand;
    this.currentOperand = this.currentOperand + operation;
  }
  compute() {
    fillHistory(this.currentOperand);
    this.currentOperand = eval(this.currentOperand);
    console.log(this.currentOperand, eval(this.currentOperand));
  }
  updatedDisplay() {
    this.currentOperandTextElement.innerText = this.currentOperand
      ? this.currentOperand
      : ``;
    this.previousOperandTextElement.innerText = this.previousOperand
      ? this.previousOperand
      : ``;
  }
}
const historique = document.getElementById("historique")
const parButton = document.querySelector(`[data-par]`);
const numberButtons = document.querySelectorAll(`[data-number]`);
const operationButtons = document.querySelectorAll(`[data-operation]`);
const equalsButton = document.querySelector(`[data-equals]`);
const deleteButton = document.querySelector(`[data-delete]`);
const allClearButton = document.querySelector(`[data-all-clear]`);
const previousOperandTextElement = document.querySelector(
  `[data-previous-operand]`
);
const currentOperandTextElement = document.querySelector(
  `[data-current-operand]`
);

const calculator = new Calculator(
  previousOperandTextElement,
  currentOperandTextElement
);

parButton.addEventListener(`click`, (event) => {
  calculator.appendNumber(parButton.innerText);
  calculator.updatedDisplay();
});

numberButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    calculator.appendNumber(button.innerText);
    calculator.updatedDisplay();
  });
});

operationButtons.forEach((button) => {
  button.addEventListener(`click`, () => {
    calculator.chooseOperation(button.innerText);
    calculator.updatedDisplay();
  });
});

equalsButton.addEventListener(`click`, (button) => {
  calculator.compute();
  calculator.updatedDisplay();
});

allClearButton.addEventListener(`click`, (button) => {
  calculator.clear();
  calculator.updatedDisplay();
});

deleteButton.addEventListener(`click`, (button) => {
  calculator.delete();
  calculator.updatedDisplay();
});

const fillHistory = (op) => {
  let paragraph = document.createElement("p")
  let outcome = eval (op)
  let result = `${op} = ${outcome}`
  paragraph.innerText = result;
  historique.appendChild(paragraph)
}
let firstInput = document.getElementById("firstInput");
window.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== "Backspace") {
    let numbers = "0123456789+-*/.()";
    if (numbers.includes(event.key)) {
      calculator.appendNumber(event.key);
      calculator.updatedDisplay();
    }
  } else if (event.key == "Enter") {
    calculator.compute();
    calculator.updatedDisplay();

  } else if (event.key == "Backspace") {
    calculator.delete();
    calculator.updatedDisplay();

  }
}
)
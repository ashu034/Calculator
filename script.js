let display = document.getElementById("display");

function appendNumber(number) {
  if (display.innerText === "0") {
    display.innerText = number;
  } else {
    display.innerText += number;
  }
}

function appendOperator(operator) {
  const lastChar = display.innerText.slice(-1);
  if ("+-*/%".includes(lastChar)) {
    display.innerText = display.innerText.slice(0, -1) + operator;
  } else {
    display.innerText += operator;
  }
}

function clearDisplay() {
  display.innerText = "0";
}

function deleteLast() {
  let current = display.innerText;
  if (current.length === 1 || (current.length === 2 && current.startsWith("-"))) {
    display.innerText = "0";
  } else {
    display.innerText = current.slice(0, -1);
  }
}

function calculateResult() {
  try {
    const result = eval(display.innerText.replace("÷", "/").replace("×", "*"));
    display.innerText = result;
  } catch (error) {
    display.innerText = "Error";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light");
  const modeLabel = document.getElementById("mode-label");
  modeLabel.innerText = document.body.classList.contains("light") ? "Light Mode" : "Dark Mode";
}

// Keyboard support
document.addEventListener("keydown", function (e) {
  if (!isNaN(e.key) || e.key === ".") {
    appendNumber(e.key);
  } else if ("+-*/%".includes(e.key)) {
    appendOperator(e.key);
  } else if (e.key === "Enter") {
    calculateResult();
  } else if (e.key === "Backspace") {
    deleteLast();
  } else if (e.key.toLowerCase() === "c") {
    clearDisplay();
  }
});

const userInput = document.querySelector("#guessField");
const submit = document.querySelector("#submit");
const guessSlot = document.querySelector(".guesses");
const remGuess = document.querySelector(".lastResult");
const lowHigh = document.querySelector(".lowOrHi");
const startOver = document.querySelector(".result");
const resetGame = document.querySelector(".reset");

let random = Math.floor(Math.random() * 100) + 1;

const p = document.createElement("p");

let prevGuess = [];
let numGuess = 1;
let playGame = true;

if (playGame) {
  remGuess.style.color = "green";
  submit.addEventListener("click", (e) => {
    e.preventDefault();
    const guess = parseInt(userInput.value);
    console.log(guess);
    validateGuess(guess);
  });
}

resetGame.addEventListener("click", newGame);

function validateGuess(guess) {
  if (isNaN(guess)) {
    alert("Please enter a valid number");
  } else if (guess < 1) {
    alert("Please enter a number greater than 1");
  } else if (guess > 100) {
    alert("Please enter a number less than 100");
  } else {
    prevGuess.push(guess);
    if (numGuess === 10) {
      displayGuess(guess);
      displayMessage(`Game Over. Random number was ${random}`);
      endGame();
    } else {
      displayGuess(guess);
      checkGuess(guess);
    }
  }
}

function checkGuess(guess) {
  if (guess === random) {
    displayMessage("You guess it right ");
    lowHigh.style.color = "green";
    endGame();
  } else if (guess < random) {
    displayMessage(`Number is Too Low`);
  } else if (guess > random) {
    displayMessage(`Number it Too High`);
  }
}

function displayGuess(guess) {
  userInput.value = "";
  if (guessSlot.innerHTML === " " || guessSlot.innerHTML.trim() === "") {
    guessSlot.innerHTML = `${guess}`;
  } else {
    guessSlot.innerHTML += `,${guess}`;
  }
  numGuess++;
  const remaining = 11 - numGuess;
  remGuess.innerHTML = `${remaining}`;
  if (remaining < 4) {
    remGuess.style.color = "red";
  } else {
    remGuess.style.color = "green";
  }
}

function displayMessage(message) {
  lowHigh.innerHTML = `<p>${message}</p>`;
  lowHigh.style.color = "dodgerblue";
}

function endGame() {
  userInput.value = "";
  userInput.setAttribute("disabled", " ");
  resetGame.classList.remove("none");
  playGame = false;
}

function newGame() {
  random = Math.floor(Math.random() * 100) + 1;
  prevGuess = [];
  numGuess = 1;
  guessSlot.innerHTML = "";
  const remaining = 11 - numGuess;
  remGuess.innerHTML = `${remaining}`;

  remGuess.style.color = "green";
  lowHigh.innerHTML = "";
  userInput.removeAttribute("disabled");
  resetGame.classList.add("none");
  playGame = true;
}

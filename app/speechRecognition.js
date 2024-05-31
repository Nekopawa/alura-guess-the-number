window.SpeechRecognition = window.SpeechRecognition || webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "pt-BR"; //en returns "seven" instead of "7"
recognition.start();
recognition.addEventListener("result", onSpeak);
recognition.addEventListener("end", () => recognition.start());

function onSpeak(event) {
  const result = event.results[0][0].transcript;

  if (result === "game over") {
    handleGameOver();
  } else {
    handleFeedback(result);
  }

  handleButton();
}

function handleGameOver() {
  const mainElement = document.getElementsByTagName("main")[0];
  mainElement.classList.add("g-main__game-over");
  mainElement.innerHTML = `<h1>GAME OVER</h1>
                           <button id="g-play-again__button">Play again!</button>`;
  recognition.removeEventListener("result", onSpeak);
}

function handleFeedback(guessedNumber) {
  const guessedNumberElement = document.getElementById("g-guessed-number");
  const feedbackElement = document.getElementById("g-feedback");

  if (validateNumber(guessedNumber)) {
    guessedNumberElement.textContent = guessedNumber;
    if (guessedNumber > DRAWED_NUMBER) {
      feedbackElement.innerHTML = `The secret number is lower
        <i id="g-arrow-icon" class="fa-solid fa-arrow-down"></i>`;
    } else if (guessedNumber < DRAWED_NUMBER) {
      feedbackElement.innerHTML = `The secret number is higher
        <i id="g-arrow-icon" class="fa-solid fa-arrow-up"></i>`;
    } else {
      recognition.removeEventListener("result", onSpeak);
      const mainElement = document.getElementsByTagName("main")[0];
      mainElement.innerHTML = `<h1>You got it!</h1>
                               <h2>The secret number was ${DRAWED_NUMBER}</h2>
                               <button id="g-play-again__button">Play again!</button>`;
    }
  } else {
    guessedNumberElement.textContent = " ";
    feedbackElement.innerHTML = "Invalid number";
  }
}

function validateNumber(number) {
  number = parseInt(number);
  return !Number.isNaN(number) && number >= MIN_NUMBER && number <= MAX_NUMBER;
}

function handleButton() {
  const buttonElement = document.getElementById("g-play-again__button");
  if (buttonElement) {
    buttonElement.addEventListener("click", () => window.location.reload());
  }
}

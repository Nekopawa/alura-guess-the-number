const MIN_NUMBER = 0;
const MAX_NUMBER = 10;
let DRAWED_NUMBER;

document.addEventListener("DOMContentLoaded", (event) => {
  updateRangeValues();
  DRAWED_NUMBER = drawNumber();
  console.log(DRAWED_NUMBER);
});

function updateRangeValues() {
  const lowestNumber = document.getElementById("g-number-lowest");
  const highestNumber = document.getElementById("g-number-highest");

  lowestNumber.textContent = MIN_NUMBER;
  highestNumber.textContent = MAX_NUMBER;
}

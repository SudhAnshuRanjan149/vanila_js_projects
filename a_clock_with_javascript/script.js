setInterval(setClock, 1000);

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");

function setClock() {
  const currentDate = new Date();

  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);

  setDigitalClockSeconds();
  setDigitalClockMinutes();
  setDigitalClockHours();
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

// ********************************************************************
// Digital clock

function setDigitalClockSeconds() {
  const currentDate = new Date();
  let seconds = currentDate.getSeconds();

  const secondsBox = document.querySelectorAll(".d_second > .num");

  secondsBox[1].innerHTML = seconds % 10;
  secondsBox[0].innerHTML = Math.floor(seconds / 10);
}

function setDigitalClockMinutes() {
  const currentDate = new Date();
  let minutes = currentDate.getMinutes();

  const minutesBox = document.querySelectorAll(".d_minute > .num");

  minutesBox[1].innerHTML = minutes % 10;
  minutesBox[0].innerHTML = Math.floor(minutes / 10);
}

function setDigitalClockHours() {
  const currentDate = new Date();
  let hours = currentDate.getHours();

  const hoursBox = document.querySelectorAll(".d_hour > .num");

  hoursBox[1].innerHTML = hours % 10;
  hoursBox[0].innerHTML = Math.floor(hours / 10);
}

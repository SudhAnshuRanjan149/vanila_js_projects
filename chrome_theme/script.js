import { quotes } from "./quotes.js";

const hourHand = document.querySelector("[data-hour-hand]");
const minuteHand = document.querySelector("[data-minute-hand]");
const secondHand = document.querySelector("[data-second-hand]");

const quoteDiv = document.querySelector(".quote");
const greetingDiv = document.querySelector(".greeting");
const authorDiv = document.querySelector(".author");

const overlay = document.querySelector(".overlay");
const handSecond = document.querySelector(".hand.second");
const handMinute = document.querySelector(".hand.minute");
const handHour = document.querySelector(".hand.hour");

const greetings = ["Good morning", "Good afternoon", "Good evening"];

// quotes ---------------------------------------------------------
let quoteOfTheDay = "";

async function fetchQuotes() {
  const options = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "d88dc2c83cmsh72164b9294b3e72p174be4jsn9b4f1c87c4ed",
      "X-RapidAPI-Host": "quotes15.p.rapidapi.com",
    },
  };
  await fetch("https://quotes15.p.rapidapi.com/quotes/random/", options)
    .then((response) => response.json())
    .then((response) => {
      quoteOfTheDay = response.content;
      let author = response.originator.name;

      if (quoteOfTheDay.length === 0 || quoteOfTheDay.length > 100) {
        let x = Math.floor(Math.random() * 1000);
        quoteOfTheDay = quotes[x].text;
        author = quotes[x].author;
      }

      quoteDiv.innerHTML = quoteOfTheDay;
      authorDiv.innerHTML = author;
    })
    .catch((err) => console.error(err));
}

async function setQuotes() {
  const currentDate = new Date();
  let hours = currentDate.getHours();
  if (hours > 17) {
    greetingDiv.innerHTML = greetings[2];
  } else if (hours > 12) {
    greetingDiv.innerHTML = greetings[1];
  } else {
    greetingDiv.innerHTML = greetings[0];
  }

  await fetchQuotes();
}

setQuotes();

// CLock----------------------------------------------------
let overlayFlag = true;
function setClock() {
  const currentDate = new Date();

  const secondsRatio = currentDate.getSeconds() / 60;
  const minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60;
  const hoursRatio = (minutesRatio + currentDate.getHours()) / 12;

  setRotation(secondHand, secondsRatio);
  setRotation(minuteHand, minutesRatio);
  setRotation(hourHand, hoursRatio);

  if(overlayFlag){
	overlayFlag = false;
	handSecond.style.display = 'block';
	handMinute.style.display = 'block';
	handHour.style.display = 'block';
	overlay.style.display = 'none';
  }
}

function setRotation(element, rotationRatio) {
  element.style.setProperty("--rotation", rotationRatio * 360);
}

// *******************************************************

setInterval(setClock, 1000);
setInterval(fetchQuotes, 1000 * 60 * 60);

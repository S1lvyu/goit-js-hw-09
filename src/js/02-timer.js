'use strict';
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';
const datePicker = document.getElementById('datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');
const timer = document.querySelector('.timer');
let intervalId;
let dateSelected;
let ms;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    dateSelected = selectedDates[0];
    if (dateSelected < new Date()) {
      Notiflix.Notify.failure('Please choose a date in the future');
      return;
    }
    startBtn.disabled = false;
  },
};

timer.style.display = 'flex';
timer.style.gap = '40px';
timer.style.fontWeight = '600';

startBtn.disabled = true;

flatpickr(datePicker, options);

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function addLeadingZero(value) {
  for (key in value) {
    value[key] = String(value[key]).padStart(2, '0');
  }
  return value;
}
function countDownTime() {
  ms = dateSelected - new Date();
  if (ms < 1000) {
    clearInterval(intervalId);
  }
  let convertedValues = convertMs(ms);
  addLeadingZero(convertedValues);
  daysEl.textContent = convertedValues.days;
  hoursEl.textContent = convertedValues.hours;
  minutesEl.textContent = convertedValues.minutes;
  secondsEl.textContent = convertedValues.seconds;
}

startBtn.addEventListener('click', () => {
  intervalId = setInterval(countDownTime, 1000);
});

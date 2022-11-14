import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  input: document.querySelector('input#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.startBtn.addEventListener('click', onBtnStart);
refs.startBtn.setAttribute('disabled', true);

let targetDate = null;
let timerId = null;

flatpickr(refs.input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,

  onClose(selectedDates) {
    targetDate = selectedDates[0];
    if (targetDate < new Date()) {
      Notify.failure('Please choose a date in the future');
      refs.startBtn.setAttribute('disabled', true);
      return;
    } else {
      refs.startBtn.removeAttribute('disabled');
    }
  },
});

function onBtnStart() {
  refs.startBtn.setAttribute('disabled', true);
  timerId = setInterval(() => {
    const deltaTime = targetDate - new Date();
    if (deltaTime <= 0) {
      clearTimeout(timerId);
      refs.startBtn.removeAttribute('disabled');
      return;
    }
    const { days, hours, minutes, seconds } = convertMs(deltaTime);
    upDateTimer({ days, hours, minutes, seconds });
  }, 1000);
}

function upDateTimer({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}
function pad(value) {
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = pad(Math.floor(ms / day));
  // Remaining hours
  const hours = pad(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = pad(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = pad(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}

// ====================== #2===================

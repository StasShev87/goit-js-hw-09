const { default: flatpickr } = require('flatpickr');

const refs = {
  endDateInput: document.querySelector('#datetime-picker'),
  startBtn: document.querySelector('button[data-start]'),
  days: document.querySelector('.value[data-days]'),
  hours: document.querySelector('.value[data-hours]'),
  minutes: document.querySelector('.value[data-minutes]'),
  seconds: document.querySelector('.value[data-seconds]'),
};

// Set default state
refs.startBtn.disabled = true;

let endDate = null;
function selectEndDate(date) {
  if (date < Date.now()) {
    alert('Please choose a date in the future');
    return;
  }
  endDate = date;

  refs.startBtn.disabled = false;
}

// Add flatpickr
import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Init flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selectEndDate(selectedDates[0].getTime());
  },
};
flatpickr(refs.endDateInput, options);

class Timer {
  constructor(endDate, onTick) {
    this.endDate = endDate;
    this.onTick = onTick;

    this.intervalId = null;
  }

  doJob() {
    const currentDate = Date.now();
    const delta = endDate - currentDate;
    const dDate = this.convertMs(delta);
    const formatedDeltaDate = {
      days: this.addLeadingZero(dDate.days),
      hours: this.addLeadingZero(dDate.hours),
      minutes: this.addLeadingZero(dDate.minutes),
      seconds: this.addLeadingZero(dDate.seconds),
    };
    this.onTick(formatedDeltaDate);
  }

  start() {
    this.doJob();
    this.intervalId = setInterval(() => {
      this.doJob();
    }, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
  }

  convertMs(ms) {
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

  addLeadingZero(value) {
    return String(value).padStart(2, '0');
  }
}

refs.startBtn.addEventListener('click', () => {
  const timer = new Timer(endDate, populateClock);
  timer.start();
  refs.endDateInput.disabled = true;
  refs.startBtn.disabled = true;
});

function populateClock({ days, hours, minutes, seconds }) {
  refs.days.textContent = days;
  refs.hours.textContent = hours;
  refs.minutes.textContent = minutes;
  refs.seconds.textContent = seconds;
}

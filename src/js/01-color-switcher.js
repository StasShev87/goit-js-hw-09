function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

const refs = {
  startBtn: document.querySelector('button[data-start]'),
  stopBtn: document.querySelector('button[data-stop]'),
  body: document.querySelector('body'),
};

// Set initial state
refs.startBtn.disabled = false;
refs.stopBtn.disabled = true;

let timer;

refs.startBtn.addEventListener('click', event => {
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;

  timer = setInterval(() => {
    refs.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

refs.stopBtn.addEventListener('click', event => {
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;

  clearInterval(timer);
});


import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  fistDelay: document.querySelector('input[name=delay]'),
  delayStep: document.querySelector('input[name=step]'),
  amount: document.querySelector('input[name=amount]'),
  submitBtn: document.querySelector('button'),
};

refs.submitBtn.addEventListener('click', onSubmitBtn);

function onSubmitBtn(evt) {
  evt.preventDefault();
  let delay = Number(refs.fistDelay.value);
  const step = Number(refs.delayStep.value);
  const amount = Number(refs.amount.value);

  for (let i = 0; i < amount; i++) {
    let position = i + 1;
    if (position > 1) {
      delay += step;
    }
    createPromise(position, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
          useIcon: false,
        });
      });
  }
}

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

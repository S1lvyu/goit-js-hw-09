'use strict';
import Notiflix from 'notiflix';
const form = document.querySelector('.form');
const delay = document.querySelector('input[name=delay]');
const step = document.querySelector('input[name=step]');
const amount = document.querySelector('input[name=amount]');
const submitBtn = document.querySelector('button');
let delayValue;
let stepValue;
let amountValue;
function getValues() {
  event.preventDefault();
  delayValue = parseInt(delay.value);
  stepValue = parseInt(step.value);
  amountValue = parseInt(amount.value);
}

function generatePromises() {
  let currentStepValue = delayValue;

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, currentStepValue);
    currentStepValue += stepValue;
  }
}
function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      }
      reject({ position, delay });
    }, delay);
  })
    .then(({ position, delay }) => {
      Notiflix.Notify.success(` Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(` Rejected promise ${position} in ${delay}ms`);
    });
}

form.addEventListener('submit', getValues);
submitBtn.addEventListener('click', () => {
  setTimeout(generatePromises, delayValue);
});

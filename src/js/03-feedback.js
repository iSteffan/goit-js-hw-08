import throttle from 'lodash.throttle';

const formRef = document.querySelector('.feedback-form');
const emailRef = document.querySelector('input[name="email"]');
const textRef = document.querySelector('textarea[name="message"]');

formRef.addEventListener('input', throttle(onInputClick, 500)),
  formRef.addEventListener('submit', onSubmitClick);

formAutoFill();

const formData = {};

function onInputClick(e) {
  formData[e.target.name] = e.target.value;

  localStorage.setItem('feedback-form-state', JSON.stringify(formData));
}

function onSubmitClick(e) {
  e.preventDefault();
  const formDataJSON = localStorage.getItem('feedback-form-state');
  const formDataParseJSON = JSON.parse(formDataJSON);
  console.log(formDataParseJSON);
  e.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');
}

function formAutoFill() {
  const savedDataJSON = localStorage.getItem('feedback-form-state');

  if (savedDataJSON) {
    const savedDataParseJSON = JSON.parse(savedDataJSON);
    emailRef.value = savedDataParseJSON.email;
    textRef.value = savedDataParseJSON.message;
  }
}

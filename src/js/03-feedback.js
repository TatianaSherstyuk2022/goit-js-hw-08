import throttle  from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.js-feedback-form');
const email = document.querySelector('.js-feedback-form input');
const message = document.querySelector('.js-feedback-form textarea');


const fillFeedbackFormFields = () => {
  const userInfoFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );
 
  if (userInfoFromLS) {
    email.value = userInfoFromLS.email;
    message.value = userInfoFromLS.message;
  }
};

fillFeedbackFormFields();

const onFeedbackFormInput = event => {
  const formData = JSON.stringify({ email: email.value, message: message.value })
  localStorage.setItem('feedback-form-state', formData);
  
};

const onFeedbackFormSubmit = event => {
  console.log(JSON.parse(localStorage.getItem('feedback-form-state')));
  event.preventDefault();

  event.currentTarget.reset();
  localStorage.removeItem('feedback-form-state');

};


feedbackFormEl.addEventListener('input', throttle(onFeedbackFormInput, 500));
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);

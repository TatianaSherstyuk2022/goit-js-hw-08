import throttle  from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.js-feedback-form');
const userFeedbackForm = {};

const fillFeedbackElFormFields = () => {
  const userInfoFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (userInfoFromLS === null) {
    return;
  }

  for (const prop in userInfoFromLS) {
    feedbackFormEl.elements[prop].value = userInfoFromLS[prop];
  }
};

fillFeedbackElFormFields();

const onFeedbackFormFieldChange = event => {
  const { target } = event;

  const fieldValue = target.value;
  const fieldName = target.name;

  userFeedbackForm[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(userFeedbackForm));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  feedbackFormEl.reset();
  localStorage.removeItem('feedback-form-state');
};

feedbackFormEl.addEventListener('input', throttle(onFeedbackFormFieldChange, 500));
feedbackFormEl.addEventListener('submit', onFeedbackFormSubmit);

import throttle  from 'lodash.throttle';

const contactFormEl = document.querySelector('.js-feedback-form');
const userFeedback = {};

const fillContactFormFields = () => {
  const userInfoFromLS = JSON.parse(
    localStorage.getItem('feedback-form-state')
  );

  if (userInfoFromLS === null) {
    return;
  }

  for (const prop in userInfoFromLS) {
    contactFormEl.elements[prop].value = userInfoFromLS[prop];
  }
};

fillContactFormFields();

const onContactFormFieldChange = event => {
  const { target } = event;

  const fieldValue = target.value;
  const fieldName = target.name;

  userFeedback[fieldName] = fieldValue;

  localStorage.setItem('feedback-form-state', JSON.stringify(userFeedback));
};

const onContactFormSubmit = event => {
  event.preventDefault();

  contactFormEl.reset();
  localStorage.removeItem('feedback-form-state');
};

contactFormEl.addEventListener('input', throttle(onContactFormFieldChange, 500));
contactFormEl.addEventListener('submit', onContactFormSubmit);

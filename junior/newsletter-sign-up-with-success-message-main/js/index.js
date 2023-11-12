
const signupModal = document.querySelector('.signup');
const subscribeButton = document.querySelector('.signup__form > button');
const attribution = document.querySelector('.attribution');

const emailInput = document.querySelector('.form-row > input[type="email"]');

const onSubscribe = () => {
  if (!validateEmail(emailInput.value)) {
    handleEmailError(emailInput);
    return;
  }

  document.body.insertBefore(successModal(), attribution);
  signupModal.remove();
}

const successModal = () => {
  const success = document.createElement('div');
  success.classList.add('success');

  const successIcon = document.createElement('img');
  successIcon.src = "assets/images/icon-success.svg";
  successIcon.alt = "Success icon";
  successIcon.width = "40";

  const successTitle = document.createElement('h1');
  successTitle.innerText = "Thanks for subscribing!";

  const successDescription = document.createElement('p');
  successDescription.innerHTML = `A confirmation email has been sent to <span>${emailInput.value}</span>. Please open it and click the button inside to confirm your subscription.`;

  const dismissButton = document.createElement('button');
  dismissButton.innerText = "Dismiss message";

  success.append(successIcon);
  success.append(successTitle);
  success.append(successDescription);
  success.append(dismissButton);

  return success;
}

const handleEmailError = (emailInput) => {
    const emailLabel = document.querySelector('.form-row > label');

    if (emailLabel.children.length < 2) {
      const emailError = document.createElement('span');
      emailError.innerText = "Valid email required";
      emailLabel.append(emailError);
    }

    emailInput.classList.add('error');
}

const validateEmail = (email) => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
}

subscribeButton.addEventListener('click', onSubscribe);
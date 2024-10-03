"use strict";
const firstName = document.getElementById("first-name");
const lastName = document.getElementById("last-name");
const eMail = document.getElementById("email");
const message = document.getElementById("message");
const form = document.getElementById("form");
const btnSubmit = document.querySelector(".btn-submit");
const queryTypeRadios = document.querySelectorAll('input[name="query-type"]');
const consentCheckbox = document.querySelector('input[name="consent"]');
const closeModalBtn = document.querySelector(".close-btn-checkbox");
const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

function changeBorderColor(inputField, errorSelector) {
  const isEmpty = inputField.value.trim() === "";
  const borderColor = isEmpty ? "hsl(0, 66%, 54%)" : "hsl(169, 82%, 27%)";
  inputField.style.borderColor = borderColor;

  const errorElement = document.querySelector(errorSelector);
  errorElement.style.opacity = isEmpty ? 1 : 0;
}

function toggleQueryTypeError() {
  const queryTypeSelected = Array.from(queryTypeRadios).some(
    (radio) => radio.checked
  );
  const errorElement = document.querySelector(".empty-fields__query");
  errorElement.style.opacity = queryTypeSelected ? 0 : 1;
}

function toggleConsentError() {
  const errorElement = document.querySelector(".empty-fields__consent");
  errorElement.style.opacity = consentCheckbox.checked ? 0 : 1;
}

firstName.addEventListener("input", function () {
  changeBorderColor(firstName, ".empty-fields__name");
});

lastName.addEventListener("input", function () {
  changeBorderColor(lastName, ".empty-fields__name");
});

eMail.addEventListener("input", function () {
  const emailValue = eMail.value.trim();
  const isValidEmail = emailRegex.test(emailValue);
  if (isValidEmail) {
    eMail.style.borderColor = "hsl(169, 82%, 27%)";
    document.querySelector(".empty-fields__email").style.opacity = 0;
  } else {
    eMail.style.borderColor = "hsl(0, 66%, 54%)";
    document.querySelector(".empty-fields__email").style.opacity = 1;
  }
});

message.addEventListener("input", function () {
  changeBorderColor(message, ".empty-fields__message");
});

queryTypeRadios.forEach((radio) => {
  radio.addEventListener("change", toggleQueryTypeError);
});

consentCheckbox.addEventListener("change", toggleConsentError);
btnSubmit.addEventListener("click", function (e) {
  e.preventDefault();
  let queryTypeSelected = false;
  queryTypeRadios.forEach((radio) => {
    if (radio.checked) {
      queryTypeSelected = true;
    }
  });
  if (
    firstName.value === "" ||
    lastName.value === "" ||
    eMail.value === "" ||
    message.value === "" ||
    !consentCheckbox.checked ||
    !queryTypeSelected ||
    !emailRegex.test(eMail.value.trim())
  ) {
    changeBorderColor(firstName, ".empty-fields__name");
    changeBorderColor(lastName, ".empty-fields__name");
    changeBorderColor(eMail, ".empty-fields__email");
    changeBorderColor(message, ".empty-fields__message");
    toggleQueryTypeError();
    toggleConsentError();
    return;
  }

  document.querySelector(".empty-fields__name").style.opacity = 0;
  document.querySelector(".empty-fields__email").style.opacity = 0;
  document.querySelector(".empty-fields__message").style.opacity = 0;
  document.querySelector(".empty-fields__query").style.opacity = 0;
  document.querySelector(".empty-fields__consent").style.opacity = 0;
  document.querySelector(".success-modal").style.display = "block";
  clearFields();
});

const clearFields = function () {
  firstName.value = "";
  lastName.value = "";
  eMail.value = "";
  message.value = "";
};

closeModalBtn.addEventListener("click", function (e) {
  e.preventDefault();
  document.querySelector(".success-modal").style.display = "none";
  btnSubmit.disabled = false;
  resetForm();
});
const resetForm = function () {
  firstName.value = "";
  lastName.value = "";
  eMail.value = "";
  message.value = "";
  queryTypeRadios.forEach((radio) => {
    radio.checked = false;
  });
  consentCheckbox.checked = false;
  document.querySelectorAll(".empty-fields__error").forEach((error) => {
    error.style.opacity = 0;
  });
};

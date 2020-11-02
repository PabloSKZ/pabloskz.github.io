// Add Responsive class
function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

// Toggle Modal
function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

// Form Validation
function validate(e) {
  e.preventDefault();

  // Error field init
  firstError.innerHTML = "";
  lastError.innerHTML = "";
  emailError.innerHTML = "";
  birthdateError.innerHTML = "";
  quantityError.innerHTML = "";
  locationError.innerHTML = "";
  conditionsError.innerHTML = "";

  // Verification
  if (firstName.value.length < 2) {
    firstError.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  } else if (lastName.value.length < 2) {
    lastError.innerHTML =
      "Veuillez entrer 2 caractères ou plus pour le champ du nom.";
  } else if (
    !email.value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    emailError.innerHTML = "Veuillez entrer une adresse email valide.";
  } else if (birthdate.value == "") {
    birthdateError.innerHTML = "Veuillez entrer votre date de naissance.";
  } else if (quantity.value == "") {
    quantityError.innerHTML = "Veuillez un nombre.";
  } else if (
    !location1.checked &&
    !location2.checked &&
    !location3.checked &&
    !location4.checked &&
    !location5.checked &&
    !location6.checked
  ) {
    locationError.innerHTML = "Veuillez cocher un lieu";
  } else if (!checkbox1.checked) {
    conditionsError.innerHTML = "Veuillez accepter les conditions";
  } else {
    // Close Modal and Toggle Validation Alert for 2s
    closeModal();
    alertDiv.style.display = "block";
    setTimeout(() => {
      alertDiv.classList.add("hide");
    }, 2000);
    setTimeout(() => {
      alertDiv.style.display = "none";
      alertDiv.classList.remove("hide");
    }, 5000);
  }
}

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const alertDiv = document.getElementById("alert");

// DOM Elements - Form
const firstName = document.getElementById("first");
const lastName = document.getElementById("last");
const email = document.getElementById("email");
const birthdate = document.getElementById("birthdate");
const quantity = document.getElementById("quantity");
const location1 = document.getElementById("location1");
const location2 = document.getElementById("location2");
const location3 = document.getElementById("location3");
const location4 = document.getElementById("location4");
const location5 = document.getElementById("location5");
const location6 = document.getElementById("location6");
const checkbox1 = document.getElementById("checkbox1");
const checkbox2 = document.getElementById("checkbox2");

// DOM Elements - Input error
const firstError = document.getElementById("firstError");
const lastError = document.getElementById("lastError");
const emailError = document.getElementById("emailError");
const birthdateError = document.getElementById("birthdateError");
const quantityError = document.getElementById("quantityError");
const locationError = document.getElementById("locationError");
const conditionsError = document.getElementById("conditionsError");

// Modal Events
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

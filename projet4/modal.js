function editNav() {
  var x = document.getElementById("myTopnav");
  if (x.className === "topnav") {
    x.className += " responsive";
  } else {
    x.className = "topnav";
  }
}

function launchModal() {
  modalbg.style.display = "block";
}

function closeModal() {
  modalbg.style.display = "none";
}

function validate(e) {
  /*   if (firstName.value.length < 1) {
    firstName.nextElementSibling.nextElementSibling.innerHTML = "gnagnagna";
    e.preventDefault();
  }

  if (lastName.value.length < 1) {
    lastName.nextElementSibling.nextElementSibling.innerHTML = "gnagnagna";
    e.preventDefault();
  } */
  if (
    !location1.checked &&
    !location2.checked &&
    !location3.checked &&
    !location4.checked &&
    !location5.checked &&
    !location6.checked
  ) {
    locationError.innerHTML = "gnagnagna";
    e.preventDefault();
  }

  if (!checkbox1.checked) {
    conditionsError.innerHTML = "gnagnagna";
    e.preventDefault();
  }
}

const queryString = window.location.search;

// DOM Elements
const modalbg = document.querySelector(".bground");
const modalBtn = document.querySelectorAll(".modal-btn");
const formData = document.querySelectorAll(".formData");
const modalClose = document.querySelectorAll(".close");
const alertDiv = document.getElementById("alert");

// ... - Form
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
const locationError = document.getElementById("locationError");
const conditionsError = document.getElementById("conditionsError");
// Events
modalBtn.forEach((btn) => btn.addEventListener("click", launchModal));
modalClose.forEach((btn) => btn.addEventListener("click", closeModal));

if (queryString != "") {
  alertDiv.classList.remove("hide");
  setTimeout(() => {
    alertDiv.classList.add("hide");
  }, 2000);
}

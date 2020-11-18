import data from "../data/data.js";

function sortPictures(pictures, sortValue) {
  switch (sortValue) {
    case "popularity":
      return pictures.sort((a, b) => a.likes - b.likes).reverse();
    case "date":
      return pictures
        .sort((a, b) => convertDate(a.date) - convertDate(b.date))
        .reverse();
    case "title":
      return pictures.sort(function (a, b) {
        if (a.image != undefined) {
          var titleA = a.image.toUpperCase();
        } else if (a.video != undefined) {
          var titleA = a.video.toUpperCase();
        }
        if (b.image != undefined) {
          var titleB = b.image.toUpperCase();
        } else if (b.video != undefined) {
          var titleB = b.video.toUpperCase();
        }
        if (titleA < titleB) {
          return -1;
        }
        if (titleA > titleB) {
          return 1;
        }
        return 0;
      });
    default:
      return pictures.sort((a, b) => a.likes - b.likes).reverse();
  }
}

function filterPictures(picturesSorted, selectedTag = "") {
  let pictureFiltered = [];
  for (let j in picturesSorted) {
    if (
      (picturesSorted[j].image != undefined ||
        picturesSorted[j].video != undefined) &&
      (picturesSorted[j].tags.includes(selectedTag) || selectedTag == "")
    ) {
      pictureFiltered.push(picturesSorted[j]);
    }
  }
  return pictureFiltered;
}

function renderPictures(picturesSorted, selectedTag = "") {
  picturesSorted = sortPictures(pictures, sortValue);
  galleryHTML = "";
  for (let j in picturesSorted) {
    if (
      picturesSorted[j].image != undefined &&
      (picturesSorted[j].tags.includes(selectedTag) || selectedTag == "")
    ) {
      pictureName = splitFileName(picturesSorted[j].image);
      galleryHTML += `
      <div class="pic">
        <a href="#" id="p${
          picturesSorted[j].id
        }" aria-label="${pictureName}, closeup view"
        class="pic__link">
          <img
            src="https://assets-github-pabloskz.s3.eu-west-3.amazonaws.com/${
              photographer.name.split(" ")[0]
            }/${picturesSorted[j].image}"
            alt="${pictureName}"
            class="pic__img"
          />
        </a>
        <div class="pic__text">
          <p class="pic__title">${pictureName}</p>
          <p class="pic__price">${picturesSorted[j].price} €</p>
          <p class="pic__likes"><span>${picturesSorted[j].likes}</span> 
          <a href="#" id="${
            picturesSorted[j].id
          }" class="like-button" aria-label="likes"><i class="fas fa-heart"></i></a></p>
        </div>
      </div>
      `;
    } else if (
      picturesSorted[j].video != undefined &&
      (picturesSorted[j].tags.includes(selectedTag) || selectedTag == "")
    ) {
      pictureName = splitFileName(picturesSorted[j].video);
      galleryHTML += `
      <div class="pic">
        <a href="#" id="p${
          picturesSorted[j].id
        }" aria-label="${pictureName}, closeup view"
        class="pic__link">
          <video
            src="https://assets-github-pabloskz.s3.eu-west-3.amazonaws.com/${
              photographer.name.split(" ")[0]
            }/${picturesSorted[j].video}"
            alt="${pictureName}"
            class="pic__img"
            id="p${picturesSorted[j].id}"
          >
          </video>
        </a>
        <div class="play-icon">
          <span class="material-icons">
            play_arrow
          </span>
        </div>
        <div class="pic__text">
          <p class="pic__title">${pictureName}</p>
          <p class="pic__price">${picturesSorted[j].price} €</p>
          <p class="pic__likes"><span>${picturesSorted[j].likes}</span> 
          <a href="#" id="${
            picturesSorted[j].id
          }" class="like-button"><i class="fas fa-heart"></i></a></p>
        </div>
      </div>
      `;
    }
  }
  $gallery.innerHTML = galleryHTML;

  /* Lightbox Event Listener */
  Array.from($pictureCollection).forEach((el) => {
    el.addEventListener("click", (e) => {
      e.preventDefault();
      lightbox(el.id);
    });
  });

  /* Like Event Listener */
  Array.from($likeButtons).forEach((el) => {
    let image = {
      id: el.id,
      liked: false,
    };
    el.addEventListener("click", (e) => {
      e.preventDefault();
      if (!image.liked) {
        data.media.find((x) => x.id == image.id).likes++;
        image.liked = true;
        el.previousElementSibling.innerHTML = data.media.find(
          (x) => x.id == image.id
        ).likes;
        renderTotalLikes(pictures);
      }
    });
  });
}

function lightbox(clickedPicture) {
  clickedPicture = clickedPicture.substring(1);

  let pictureToShow = data.media.find((x) => x.id == clickedPicture);
  if (pictureToShow.image != undefined) {
    pictureName = splitFileName(pictureToShow.image);
    $lightboxVideo.classList.add("hide");
    $lightboxPicture.classList.remove("hide");
    $lightboxPicture.setAttribute(
      "src",
      `https://assets-github-pabloskz.s3.eu-west-3.amazonaws.com/${
        photographer.name.split(" ")[0]
      }/${pictureToShow.image}`
    );
    $lightboxPicture.setAttribute("alt", `${pictureName}`);
    $lightboxTitle.innerHTML = `${pictureName}`;
  } else if (pictureToShow.video != undefined) {
    pictureName = splitFileName(pictureToShow.video);
    $lightboxPicture.classList.add("hide");
    $lightboxVideo.classList.remove("hide");
    $lightboxVideo.setAttribute(
      "src",
      `https://assets-github-pabloskz.s3.eu-west-3.amazonaws.com/${
        photographer.name.split(" ")[0]
      }/${pictureToShow.video}`
    );
    $lightboxVideo.setAttribute("alt", `${pictureName}`);
    $lightboxTitle.innerHTML = `${pictureName}`;
  }
  $lightboxPicture.setAttribute("id", `${pictureToShow.id}`);
  $lightboxBg.classList.remove("hide");
}

function lightboxNext(picturesSorted, selectedTag = "") {
  let picturesFiltered = filterPictures(picturesSorted, selectedTag);
  let nextPictureIndex = picturesFiltered.length - 1;
  if (
    picturesFiltered.indexOf(
      picturesFiltered.find((x) => x.id == $lightboxPicture.id)
    ) !=
    picturesFiltered.length - 1
  ) {
    nextPictureIndex =
      picturesFiltered.indexOf(
        picturesFiltered.find((x) => x.id == $lightboxPicture.id)
      ) + 1;
  }
  if (
    picturesFiltered[nextPictureIndex].image == undefined &&
    picturesFiltered[nextPictureIndex].video == undefined
  ) {
    console.log("stop");
  } else {
    lightbox(`p${picturesFiltered[nextPictureIndex].id}`);
  }
}

function lightboxPrevious(picturesSorted, selectedTag = "") {
  let picturesFiltered = filterPictures(picturesSorted, selectedTag);
  let previousPictureIndex = 0;
  if (
    picturesFiltered.indexOf(
      picturesFiltered.find((x) => x.id == $lightboxPicture.id)
    ) != 0
  ) {
    previousPictureIndex =
      picturesFiltered.indexOf(
        picturesFiltered.find((x) => x.id == $lightboxPicture.id)
      ) - 1;
  }
  if (
    picturesFiltered[previousPictureIndex].image == undefined &&
    picturesFiltered[previousPictureIndex].video == undefined
  ) {
    console.log("stop");
  } else {
    lightbox(`p${picturesFiltered[previousPictureIndex].id}`);
  }
}

function convertDate(date) {
  return parseInt(date.split("-").join());
}

function splitFileName(pictureName) {
  pictureName = pictureName.split("_");
  pictureName.shift();
  pictureName = pictureName.join(" ");
  pictureName = pictureName.toString().split(".");
  pictureName.pop();
  return pictureName.join(" ").toString();
}

function toggleDropdown() {
  if ($dropdownList.classList.contains("hide")) {
    $dropdownList.classList.remove("hide");
    $dropdownArrow.innerHTML = "keyboard_arrow_up";
    renderDropdown(sortValue);
  } else {
    $dropdownList.classList.add("hide");
    $dropdownArrow.innerHTML = "keyboard_arrow_down";
  }
}

function renderDropdown(sortValue) {
  switch (sortValue) {
    case "popularity":
      $dropdownPopularity.classList.add("hide");
      $dropdownDate.classList.remove("hide");
      $dropdownTitle.classList.remove("hide");
      break;
    case "date":
      $dropdownDate.classList.add("hide");
      $dropdownPopularity.classList.remove("hide");
      $dropdownTitle.classList.remove("hide");
      break;
    case "title":
      $dropdownTitle.classList.add("hide");
      $dropdownDate.classList.remove("hide");
      $dropdownPopularity.classList.remove("hide");
      break;
    default:
      $dropdownPopularity.classList.add("hide");
      $dropdownDate.classList.remove("hide");
      $dropdownTitle.classList.remove("hide");
      break;
  }
}

function renderTotalLikes(pictures) {
  let total = 0;
  for (let l in pictures) {
    total += pictures[l].likes;
  }
  $totalLikes.innerHTML = total;
  return total;
}

function validateForm() {
  // Error field init
  $fnameError.innerHTML = "";
  $lnameError.innerHTML = "";
  $emailError.innerHTML = "";
  $messageError.innerHTML = "";

  // Verification
  if ($fnameInput.value.length < 2) {
    $fnameError.innerHTML = "Votre prénom doit comporter 2 caractères ou plus.";
  } else if ($lnameInput.value.length < 2) {
    $lnameError.innerHTML = "Votre nom doit comporter 2 caractères ou plus.";
  } else if (
    !$emailInput.value.match(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
  ) {
    $emailError.innerHTML = "Veuillez entrer une adresse email valide.";
  } else if ($messageInput.value.length < 10) {
    $messageError.innerHTML =
      "Votre message doit comporter 10 caractères ou plus.";
  } else {
    console.log($fnameInput.value);
    console.log($lnameInput.value);
    console.log($emailInput.value);
    console.log($messageInput.value);
    $modalBg.classList.add("hide");
  }
}

/* DOM Variables */
const $name = document.getElementById("name");
const $location = document.getElementById("location");
const $copyline = document.getElementById("copyline");
const $tags = document.getElementById("tags");
const $pp = document.getElementById("pp");
const $contact = document.getElementById("contact");
const $gallery = document.getElementById("gallery");
const $price = document.getElementById("price");
const $totalLikes = document.getElementById("total-likes");

const $modalBg = document.getElementById("modal-bg");
const $closeModal = document.getElementById("close-modal");
const $contactName = document.getElementById("contact-name");

const $fnameInput = document.getElementById("fname-input");
const $lnameInput = document.getElementById("lname-input");
const $emailInput = document.getElementById("email-input");
const $messageInput = document.getElementById("message-input");
const $fnameError = document.getElementById("fname-error");
const $lnameError = document.getElementById("lname-error");
const $emailError = document.getElementById("email-error");
const $messageError = document.getElementById("message-error");
const $submit = document.getElementById("submit");

const $lightbox = document.getElementById("lightbox");
const $lightboxBg = document.getElementById("lightbox-bg");
const $closeLightbox = document.getElementById("close-lightbox");
const $lightboxPicture = document.getElementById("lightbox-picture");
const $lightboxVideo = document.getElementById("lightbox-video");
const $lightboxNext = document.getElementById("lightbox-next");
const $lightboxPrevious = document.getElementById("lightbox-previous");
const $lightboxTitle = document.getElementById("lightbox-title");

const $dropdownButton = document.getElementById("dropdown-button");
const $dropdownSelected = document.getElementById("dropdown-selected");
const $dropdownList = document.getElementById("dropdown-list");
const $dropdownArrow = document.getElementById("dropdown-arrow");
const $dropdownPopularity = document.getElementById("dropdown-list-popularity");
const $dropdownDate = document.getElementById("dropdown-list-date");
const $dropdownTitle = document.getElementById("dropdown-list-title");

const $likeButtons = document.getElementsByClassName("like-button");
const $tagCollection = document.getElementsByClassName("tag");
const $pictureCollection = document.getElementsByClassName("pic__link");

/* Get id from url params */
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const urlEntries = urlParams.entries();
for (const entry of urlEntries) {
  if (entry[0] == "id") {
    var id = entry[1];
  }
}

/* Fetch Data */
const photographer = data.photographers.find((x) => x.id == id);
const pictures = data.media.filter((x) => x.photographerId == id);

/* Initialization */
let tagsHTML = "";
let galleryHTML = "";
let clickOnLightbox = false;

let pictureName = "";
let sortValue = "popularity";
let picturesSorted = sortPictures(pictures, sortValue);
let selectedTag = "";

/* Event Listeners */
$dropdownButton.addEventListener("click", (e) => {
  e.preventDefault();
  toggleDropdown();
});

$dropdownPopularity.addEventListener("click", (e) => {
  e.preventDefault();
  sortValue = "popularity";
  $dropdownSelected.innerHTML = "Popularité";
  toggleDropdown();
  renderPictures(picturesSorted, selectedTag);
});

$dropdownDate.addEventListener("click", (e) => {
  e.preventDefault();
  sortValue = "date";
  $dropdownSelected.innerHTML = "Date";
  toggleDropdown();
  renderPictures(picturesSorted, selectedTag);
});

$dropdownTitle.addEventListener("click", (e) => {
  e.preventDefault();
  sortValue = "title";
  $dropdownSelected.innerHTML = "Titre";
  toggleDropdown();
  renderPictures(picturesSorted, selectedTag);
});

$contact.addEventListener("click", (e) => {
  e.preventDefault();
  $contactName.innerHTML = photographer.name;
  $modalBg.classList.remove("hide");
});

$closeModal.addEventListener("click", (e) => {
  e.preventDefault();
  $modalBg.classList.add("hide");
});

$submit.addEventListener("click", (e) => {
  e.preventDefault();
  validateForm();
});

$closeLightbox.addEventListener("click", (e) => {
  e.preventDefault();
  $lightboxBg.classList.add("hide");
});

$lightboxNext.addEventListener("click", (e) => {
  e.preventDefault();
  lightboxNext(picturesSorted, selectedTag);
});

$lightboxPrevious.addEventListener("click", (e) => {
  e.preventDefault();
  lightboxPrevious(picturesSorted, selectedTag);
});

document.addEventListener("click", (e) => {
  e.preventDefault();
  clickOnLightbox = false;
});

$lightbox.addEventListener("click", (e) => {
  e.preventDefault();
  clickOnLightbox = true;
});

$lightboxBg.addEventListener("click", (e) => {
  e.preventDefault();
  if (!clickOnLightbox) {
    $lightboxBg.classList.add("hide");
  }
});

document.addEventListener("keydown", (e) => {
  if (!$lightboxBg.classList.contains("hide")) {
    if (e.key == "ArrowRight") {
      lightboxNext(picturesSorted, selectedTag);
    } else if (e.key == "ArrowLeft") {
      lightboxPrevious(picturesSorted, selectedTag);
    } else if (e.key == "Escape") {
      $lightboxBg.classList.add("hide");
    }
  }
});

/* Render Photographer Profile */
$name.innerHTML = photographer.name;
$location.innerHTML = `${photographer.city}, ${photographer.country}`;
$copyline.innerHTML = photographer.tagline;
$pp.setAttribute(
  "src",
  `https://assets-github-pabloskz.s3.eu-west-3.amazonaws.com/Photographers_ID_Photos/${photographer.portrait}`
);
$pp.setAttribute("alt", `${photographer.name}`);
for (let i in photographer.tags) {
  tagsHTML += `<a href="#" class="tag">#${photographer.tags[i]}</a>`;
}
$tags.innerHTML = tagsHTML;

$price.innerHTML = photographer.price;
renderTotalLikes(pictures);

renderPictures(picturesSorted, selectedTag);

/* Event Listeners on tags */
Array.from($tagCollection).forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (el.classList.contains("active-tag")) {
      el.classList.remove("active-tag");
      selectedTag = "";
      renderPictures(picturesSorted, selectedTag);
    } else {
      Array.from($tagCollection).forEach((elem) => {
        elem.classList.remove("active-tag");
      });
      el.classList.add("active-tag");
      selectedTag = el.innerHTML.split("#")[1].toString();
      renderPictures(picturesSorted, selectedTag);
    }
  });
});

// ! To output new media alt : decomment following block

/* const mediaWithAlt = createAlt(data.media);
console.log(JSON.stringify(mediaWithAlt));

function createAlt(media) {
  for (let i in media) {
    if (media[i].image != undefined) {
      media[i].alt = splitFileName(media[i].image);
    } else if (media[i].video != undefined) {
      media[i].alt = splitFileName(media[i].video);
    }
  }
  return media;
} */

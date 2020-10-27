import data from "../data/data.js";

function renderIndex() {
  $photographers.innerHTML = "";
  let photographersHTML = "";

  /* Render HTML tags */
  for (let i in data.photographers) {
    let tags = data.photographers[i].tags;
    let tagsHTML = "";

    for (let j in tags) {
      tagsHTML += `
      <a href="#" class="tag">
          #${tags[j]}
      </a>
      `;
    }
    photographersHTML += ` 
    <div class="card hide" id="${data.photographers[i].id}"">
      <a href="photographers/?id=${data.photographers[i].id}" class="photographer-link">
        <img
          src="assets/Photographers_ID_Photos/${data.photographers[i].portrait}"
          alt="Fisheye Home page"
          class="pp"
        />
        <h2 class="name">${data.photographers[i].name}</h2>
      </a>
      <p class="location">${data.photographers[i].city}, ${data.photographers[i].country}</p>
      <p class="copy-line">${data.photographers[i].tagline}</p>
      <p class="price">${data.photographers[i].price}€/jour</p>
    <div class="tags" id="tags">
      ${tagsHTML}
    </div>
  </div>
    `;
  }
  $photographers.innerHTML = photographersHTML;
  filterIndex(selectedTag);
}

function filterIndex(selectedTag) {
  let filtredPhotographers = data.photographers.filter((x) =>
    x.tags.includes(selectedTag)
  );
  Array.from($cards).forEach((el) => {
    el.classList.add("hide");
    if (filtredPhotographers.length == 0) {
      el.classList.remove("hide");
    } else {
      for (let k in filtredPhotographers) {
        if (filtredPhotographers[k].id == el.id || selectedTag == "") {
          el.classList.remove("hide");
        }
      }
    }
  });
}

const $photographers = document.getElementById("photographers");
const $tags = document.getElementsByClassName("tag");
const $cards = document.getElementsByClassName("card");

let selectedTag = "";

renderIndex("");
filterIndex(selectedTag);

/* Event Listeners on tags */
Array.from($tags).forEach((el) => {
  el.addEventListener("click", (e) => {
    e.preventDefault();
    if (el.classList.contains("active-tag")) {
      el.classList.remove("active-tag");
      filterIndex("");
    } else {
      Array.from($tags).forEach((elem) => {
        elem.classList.remove("active-tag");
      });
      el.classList.add("active-tag");
      selectedTag = el.innerHTML
        .replace(/\s/g, "")
        .replace(/#/, "")
        .toLowerCase()
        .toString();
      filterIndex(selectedTag);
    }
  });
});

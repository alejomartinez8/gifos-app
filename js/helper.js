let favorites = localStorage.getItem("favorites");
favorites = favorites ? JSON.parse(favorites) : [];

let mygifos = localStorage.getItem("mygifos");
mygifos = mygifos ? JSON.parse(mygifos) : [];

// Functions
function setAttribute(elm, att, val) {
  if (elm) elm.setAttribute(att, val);
}

function displayBlock(elm) {
  elm.style.display = "block";
}

function displayNone(elm) {
  elm.style.display = "none";
}

function addClass(elm, className) {
  elm.classList.add(className);
}

function removeClass(elm, className) {
  elm.classList.remove(className);
}

function hiddenElement(elm) {
  elm.classList.add("hidden");
}

function showElement(elm) {
  elm.classList.remove("hidden");
}

function createGifos(container, gifos, options) {
  if (!container) return;

  gifos.forEach((gifo) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");
    const img = document.createElement("img");
    img.setAttribute(
      "src",
      gifo.images?.preview_webp?.url
        ? gifo.images.preview_webp.url
        : gifo.images.original.url
    );
    img.setAttribute("alt", gifo.title);

    imageContainer.appendChild(img);
    gifoHover(imageContainer, gifo, options);
    container.appendChild(imageContainer);
  });
}

function downloadURI(uri, name = "") {
  fetch(uri)
    .then((response) => response.blob())
    .then((blob) => {
      const imgHref = window.URL.createObjectURL(new Blob([blob]));
      var link = document.createElement("a");
      link.setAttribute("download", name);
      link.href = imgHref;
      document.body.appendChild(link);
      link.click();
      link.remove();
    });
}

function toggleFavoriteGifo(gifo) {
  const favoriteIndex = favorites.findIndex((fav) => fav.id === gifo.id);
  if (favoriteIndex === -1) {
    favorites.push(gifo);
  } else {
    favorites.splice(favoriteIndex, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFavorite(gifo) {
  return favorites.find((fav) => fav.id === gifo.id);
}

function storageMyGifo(gifo) {
  mygifos.push(gifo);
  localStorage.setItem("mygifos", JSON.stringify(mygifos));
}

function getMyGifo(gifo) {
  return mygifos.find((mygifo) => mygifo.id === gifo.id);
}

const SPINNER = `
<div class="sk-fading-circle">
  <div class="sk-circle1 sk-circle"></div>
  <div class="sk-circle2 sk-circle"></div>
  <div class="sk-circle3 sk-circle"></div>
  <div class="sk-circle4 sk-circle"></div>
  <div class="sk-circle5 sk-circle"></div>
  <div class="sk-circle6 sk-circle"></div>
  <div class="sk-circle7 sk-circle"></div>
  <div class="sk-circle8 sk-circle"></div>
  <div class="sk-circle9 sk-circle"></div>
  <div class="sk-circle10 sk-circle"></div>
  <div class="sk-circle11 sk-circle"></div>
  <div class="sk-circle12 sk-circle"></div>
</div>
`;

const SUCCESS = `
  <div class="icon-success"></div>
`;

const getIcon = (type) => {
  switch (type) {
    case "spinner":
      return SPINNER;

    case "success":
      return SUCCESS;

    default:
      break;
  }
};

function addPagination(container, count, offset, total, callBack) {
  const totalPages = total / count;
  const actualPage = offset / count;

  const paginationDiv = document.createElement("div");
  paginationDiv.classList.add("pagination-container");

  if (actualPage !== 0) {
    const backButton = document.createElement("div");
    backButton.innerText = "<";
    paginationDiv.appendChild(backButton);
    backButton.addEventListener("click", () => callBack(actualPage - 1));
  }

  for (
    let page = actualPage;
    (page < actualPage + 5) & (page < totalPages);
    page++
  ) {
    const pageDiv = document.createElement("div");
    pageDiv.innerText = page + 1;
    if (page === actualPage) pageDiv.classList.add("active");
    pageDiv.addEventListener("click", () => callBack(page));
    paginationDiv.appendChild(pageDiv);
  }

  if (actualPage < totalPages - 5) {
    const nextButton = document.createElement("div");
    nextButton.innerText = ">";
    paginationDiv.appendChild(nextButton);
    nextButton.addEventListener("click", () => callBack(actualPage + 1));
  }

  container.appendChild(paginationDiv);
}

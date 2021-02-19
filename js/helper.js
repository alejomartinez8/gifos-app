let favorites = localStorage.getItem("favorites");
favorites = favorites ? JSON.parse(favorites) : [];

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

function createGifos(container, gifos, options) {
  if (!container) return;

  gifos.forEach((gifo) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.setAttribute("src", gifo.images?.preview_webp?.url);
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

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

function imgHover(elm, hover, unhover) {
  elm.addEventListener("mouseenter", () => {
    setAttribute(elm, "src", hover);
  });

  elm.addEventListener("mouseleave", () => {
    setAttribute(elm, "src", unhover);
  });
}

function createGifos(container, gifos) {∫
  gifos.forEach((gifo) => {
    const imageContainer = document.createElement("div");
    imageContainer.classList.add("img-container");

    const img = document.createElement("img");
    img.setAttribute("src", gifo.images?.downsized?.url);
    img.setAttribute("alt", gifo.title);

    imageContainer.appendChild(img);
    gifoHover(imageContainer, gifo);
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

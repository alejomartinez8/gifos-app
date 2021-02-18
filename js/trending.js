const containerGifosTrending = document.getElementById("container-trending");
const buttonRight = document.getElementById("button-trending-right");
const buttonLeft = document.getElementById("button-trending-left");
let offsetTrending = 0;

async function addGifosTrending(limit, offset) {
  console.log(limit, offset);

  try {
    const trendingGifos = await getTrendingGifos(limit, offset * 3);
    // console.log(trendingGifos);

    containerGifosTrending.innerHTML = "";
    if (offsetTrending === 0) {
      displayNone(buttonLeft);
    } else {
      displayBlock(buttonLeft);
    }

    trendingGifos.data.forEach((gifo) => {
      // console.log(gifo);
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("img-container");

      const img = document.createElement("img");
      img.setAttribute("src", gifo.images?.fixed_width?.url);
      img.setAttribute("alt", gifo.title);

      imageContainer.appendChild(img);
      gifoHover(
        imageContainer,
        gifo.title,
        gifo.username,
        gifo.images?.original?.url
      );
      containerGifosTrending.appendChild(imageContainer);
    });
  } catch (error) {
    console.error(error);
  }
}

function loadGifos() {
  if (window.matchMedia("(min-width:767px)").matches) {
    addGifosTrending(3, 0);
  } else {
    addGifosTrending(10, 0);
  }
}

window.onresize = loadGifos;

buttonLeft.addEventListener("click", () => {
  if (offsetTrending) offsetTrending--;
  addGifosTrending(3, offsetTrending);
});

buttonRight.addEventListener("click", () => {
  offsetTrending++;
  addGifosTrending(3, offsetTrending);
});

const containerGifosTrending = document.getElementById("container-trending");
const buttonRight = document.getElementById("button-trending-right");
const buttonLeft = document.getElementById("button-trending-left");
let offsetTrending = 0;

async function addGifosTrending(offset) {
  try {
    const trendingGifos = await getTrendingGifos(3, offset * 3);
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

addGifosTrending();

buttonLeft.addEventListener("click", () => {
  if (offsetTrending) offsetTrending--;
  addGifosTrending(offsetTrending);
});

buttonRight.addEventListener("click", () => {
  offsetTrending++;
  addGifosTrending(offsetTrending);
});

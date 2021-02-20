const containerTrending = document.getElementById("container-trending");
const buttonRight = document.getElementById("button-trending-right");
const buttonLeft = document.getElementById("button-trending-left");

let offsetTrending = 0;
let trendingGifos = [];
let offsetScroll = 0;

async function addGifosTrending(limit, offset) {
  const lenghtGifos = trendingGifos[0] ? trendingGifos.length : 0;

  if (offset + limit > lenghtGifos) {
    const newGifos = await fetchTrendingGifos(10, lenghtGifos);
    trendingGifos = trendingGifos.concat(newGifos.data);
  }

  const gifosToShow = [];

  for (let i = 0; i < limit; i++) {
    gifosToShow[i] = trendingGifos[i + offset];
  }

  if (window.matchMedia("(min-width:768px)").matches) {
    if (offset === 0) {
      displayNone(buttonLeft);
    } else {
      displayBlock(buttonLeft);
    }
  } else {
    displayNone(buttonLeft);
  }

  containerTrending.innerHTML = "";
  createGifos(containerTrending, gifosToShow, { type: "trending" });
}

function loadGifos() {
  if (window.matchMedia("(min-width:768px)").matches) {
    addGifosTrending(3, 0);
  } else {
    addGifosTrending(10, 0);
  }
}

loadGifos();
window.onresize = loadGifos;

buttonLeft.addEventListener("click", () => {
  if (offsetTrending) offsetTrending--;
  addGifosTrending(3, offsetTrending);
});

buttonRight.addEventListener("click", () => {
  offsetTrending++;
  addGifosTrending(3, offsetTrending);
});

containerTrending.addEventListener("scroll", (e) => {
  console.log(parseInt(e.target.scrollLeft / 200) % 3);
});

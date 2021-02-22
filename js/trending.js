const containerTrending = document.getElementById("container-trending");
const buttonRight = document.getElementById("button-trending-right");
const buttonLeft = document.getElementById("button-trending-left");

let offsetTrending = 0;

async function addGifosTrending(limit, offset) {
  const newGifos = await fetchTrendingGifos(limit, offset);

  if (window.matchMedia("(min-width:768px)").matches) {
    containerTrending.innerHTML = "";
    createGifos(containerTrending, newGifos.data, { type: "trending" });

    if (offset === 0) {
      displayNone(buttonLeft);
    } else {
      displayBlock(buttonLeft);
    }
  } else {
    displayNone(buttonLeft);
    createGifos(containerTrending, newGifos.data, { type: "trending" });
  }
}

function loadGifos() {
  addGifosTrending(3, 0);
}

loadGifos();
// window.onresize = loadGifos;

buttonLeft.addEventListener("click", () => {
  if (offsetTrending) offsetTrending--;
  addGifosTrending(3, offsetTrending);
});

buttonRight.addEventListener("click", () => {
  offsetTrending++;
  addGifosTrending(3, offsetTrending);
});

let lastScrollPosition = 0;

containerTrending.addEventListener("scroll", (e) => {
  const scrollPosition = parseInt(
    e.target.scrollLeft / (window.innerWidth * 0.5)
  );
  console.log(scrollPosition, lastScrollPosition);
  if (scrollPosition > lastScrollPosition) {
    lastScrollPosition = scrollPosition;
    offsetTrending += 3;
    addGifosTrending(3, offsetTrending);
  }
});

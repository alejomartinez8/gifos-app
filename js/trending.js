const containerGifosTrending = document.getElementById(
  "container-gifos-trending"
);

async function addGifosTrending() {
  try {
    const trendingGifos = await getTrendingGifos();
    console.log(trendingGifos);

    trendingGifos.data.forEach((gifo) => {
      console.log(gifo);
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

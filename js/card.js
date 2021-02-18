function gifoHover(imgContainer, gifo) {
  const img = imgContainer.firstElementChild;

  const { title, username, images } = gifo;

  if (window.matchMedia("(max-width:768px").matches) {
    img.addEventListener("click", () => setModalData(gifo));
  } else {
    imgContainer.addEventListener("mouseenter", () => {
      let divHover = document.createElement("div");
      divHover.classList.add("hover-img");
      divHover.innerHTML = `
              <div class="icon-container">
                  <div class="icon-fav"></div>
                  <div class="icon-download"></div>
                  <div class="icon-expand"></div>
              </div>
              <div class="text-container">
                  <p class="user">${username}</p>
                  <p class="title">${title}</p>
              </div>
              `;

      divHover.style.width = `${img.offsetWidth}px`;
      divHover.style.height = `${img.offsetHeight}px`;

      imgContainer.insertBefore(divHover, img);

      const iconFav = divHover.children[0].children[0];
      const iconDownload = divHover.children[0].children[1];
      const iconExpand = divHover.children[0].children[2];

      if (getFavorite(gifo)) {
        iconFav.classList.add("saved");
      }

      iconFav.addEventListener("click", () => {
        if (getFavorite(gifo)) {
          iconFav.classList.remove("saved");
        } else {
          iconFav.classList.add("saved");
        }
        toggleFavoriteGifo(gifo);
      });

      iconDownload.addEventListener("click", () => {
        downloadURI(images?.original?.url);
      });

      iconExpand.addEventListener("click", () => setModalData(gifo));
    });

    imgContainer.addEventListener("mouseleave", () => {
      const divHover = imgContainer.firstElementChild;
      imgContainer.removeChild(divHover);
    });
  }
}

function gifoHover(
  imgContainer,
  title = "Titulo GIFO",
  username = "User",
  image = ""
) {
  const img = imgContainer.firstElementChild;

  if (window.matchMedia("(max-width:768px").matches) {
    img.addEventListener("click", () => setModalData(image, username, title));
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

      iconFav.addEventListener("click", () => {
        console.log("fav", img); // TODO - call function
      });

      iconDownload.addEventListener("click", () => {
        downloadURI(img.src);
      });

      iconExpand.addEventListener("click", () =>
        setModalData(image, username, title)
      );
    });

    imgContainer.addEventListener("mouseleave", () => {
      const divHover = imgContainer.firstElementChild;
      imgContainer.removeChild(divHover);
    });
  }
}

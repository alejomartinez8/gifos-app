// Hovers
const buttonsSliderLeft = document.querySelectorAll(
  'img[alt = "button-slider-left"]'
);

const buttonsSliderRight = document.querySelectorAll(
  'img[alt = "button-slider-right"]'
);

buttonsSliderLeft.forEach((button) => {
  imgHover(
    button,
    "./img/button-slider-left-hover.svg",
    "./img/button-slider-left.svg"
  );
});

buttonsSliderRight.forEach((button) => {
  imgHover(
    button,
    "./img/Button-Slider-right-hover.svg",
    "./img/Button-Slider-right.svg"
  );
});

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

function gifoHover(
  imgContainer,
  title = "Titulo GIFO",
  username = "User",
  image = ""
) {
  imgContainer.addEventListener("mouseenter", () => {
    const img = imgContainer.firstElementChild;
    let divHover = document.createElement("div");
    divHover.classList.add("hover-img");
    divHover.innerHTML = `
        <div class="icon-container">
            <img src="./img/icon-fav.svg" alt="icon-fav" />
            <img src="./img/icon-download.svg" alt="icon-download" />
            <img src="./img/icon-max-normal.svg" alt="" />
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

    if (window.matchMedia("(max-width:768px")) {
      img.addEventListener("click", () => setModalData(image, username, title));
    }
  });

  imgContainer.addEventListener("mouseleave", () => {
    const divHover = imgContainer.firstElementChild;
    imgContainer.removeChild(divHover);
  });
}

function downloadURI(uri, name = "") {
  var link = document.createElement("a");

  link.setAttribute("download", name);
  link.href = uri;
  console.log(link);
  document.body.appendChild(link);
  link.click();
  link.remove();
}

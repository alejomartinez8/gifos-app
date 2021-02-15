// Slider
const buttonSliderLeft = document.querySelector(
	'img[alt = "button-slider-left"]'
);

const buttonSliderRight = document.querySelector(
	'img[alt = "button-slider-right"]'
);

imgHover(
	buttonSliderLeft,
	"./img/button-slider-left-hover.svg",
	"./img/button-slider-left.svg"
);

imgHover(
	buttonSliderRight,
	"./img/Button-Slider-right-hover.svg",
	"./img/Button-Slider-right.svg"
);

// Img Hover
const gifosTrending = document.querySelector(".gifos-images").children;
console.log(gifosTrending);

for (let i = 0; i < gifosTrending.length; i++) {
	gifoHover(gifosTrending[i]);
}

function gifoHover(elm) {
	elm.addEventListener("mouseenter", () => {
		const img = elm.firstElementChild;
		let divHover = document.createElement("div");
		divHover.classList.add("hover-img");
		divHover.innerHTML = `
        <div class="icon-container">
            <img src="./img/icon-fav.svg" alt="icon-fav" />
            <img src="./img/icon-download.svg" alt="icon-download" />
            <img src="./img/icon-max-normal.svg" alt="" />
        </div>
        <div class="text-container">
            <p class="user">User</p>
            <p class="title">Titulo GIFO</p>
        </div>
        `;

		elm.insertBefore(divHover, img);

		const icons = divHover.children[0].children;

		for (let i = 0; i < icons.length; i++) {
			icons[i].addEventListener("click", () => {
				console.log(i, img); // TODO - call function
			});
		}
	});

	elm.addEventListener("mouseleave", () => {
		const divHover = elm.firstElementChild;
		elm.removeChild(divHover);
	});
}

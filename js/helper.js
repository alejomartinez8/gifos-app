// Slider
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

function imgHover(elm, hover, unhover) {
	elm.addEventListener("mouseenter", () => {
		setAttribute(elm, "src", hover);
	});

	elm.addEventListener("mouseleave", () => {
		setAttribute(elm, "src", unhover);
	});
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

		const iconFav = divHover.children[0].children[0];
		const iconDownload = divHover.children[0].children[1];
		const iconExpand = divHover.children[0].children[2];

		iconFav.addEventListener("click", () => {
			console.log("fav", img); // TODO - call function
		});

		iconDownload.addEventListener("click", () => {
			console.log("download", img); // TODO - call function
		});

		iconExpand.addEventListener("click", () => {
			console.log("expand", img); // TODO - call function
		});
	});

	elm.addEventListener("mouseleave", () => {
		const divHover = elm.firstElementChild;
		elm.removeChild(divHover);
	});
}

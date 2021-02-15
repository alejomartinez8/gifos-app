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

// Result Hover
const gifosResult = document.querySelector("#container-gifos-result").children;

for (let i = 0; i < gifosResult.length; i++) {
	gifoHover(gifosResult[i]);
}

// Trending Hover
const gifosTrending = document.querySelector(".gifos-images").children;

for (let i = 0; i < gifosTrending.length; i++) {
	gifoHover(gifosTrending[i]);
}

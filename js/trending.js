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

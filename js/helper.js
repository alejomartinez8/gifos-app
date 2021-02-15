function setAttribute(elm, att, val) {
	if (elm) elm.setAttribute(att, val);
}

function imgHover(elm, hover, unhover) {
	elm.addEventListener("mouseover", () => {
		setAttribute(elm, "src", hover);
	});

	elm.addEventListener("mouseout", () => {
		setAttribute(elm, "src", unhover);
	});
}

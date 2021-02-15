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

const mainMenuButton = document.getElementById("main-menu-button");
const navMenu = document.getElementById("nav-menu");
const toggleTheme = document.getElementById("toggle-theme-button");
const searchIcon = document.getElementById("search-icon");
const logoImg = document.getElementById("img-logo");

let theme = "";
let menuOpen = navMenu.style.display === "block";

if (localStorage.getItem("theme") === "dark") {
	setTheme();
}

function toggleMenu() {
	menuOpen = !menuOpen;
	navMenu.style.display = menuOpen ? "block" : "none";
	mainMenuButton.setAttribute(
		"src",
		theme === "dark"
			? menuOpen
				? "./img/close-modo-noct.svg"
				: "./img/burger-modo-noct.svg"
			: menuOpen
			? "./img/close.svg"
			: "./img/burger.svg"
	);
}

function setAttribute(elm, att, val) {
	if (elm) elm.setAttribute(att, val);
}

function setTheme(e) {
	if (e) e.preventDefault();
	document.body.classList.toggle("dark");
	theme = document.body.classList.value;
	console.log(theme);
	if (theme === "dark") {
		localStorage.setItem("theme", "dark");
		if (menuOpen)
			setAttribute(mainMenuButton, "src", "./img/close-modo-noct.svg");
		else mainMenuButton.setAttribute("src", "./img/burger-modo-noct.svg");
		toggleTheme.innerHTML = "Modo Diurno";
		setAttribute(searchIcon, "src", "./img/icon-search-mod-noc.svg");
		// TODO - when be desktop
		setAttribute(logoImg, "src", "./img/logo-mobile-modo-noct.svg");
	} else {
		localStorage.setItem("theme", "");
		if (menuOpen) setAttribute(mainMenuButton, "src", "./img/close.svg");
		else setAttributeNS(mainMenuButton, "src", "./img/burger.svg");
		toggleTheme.innerHTML = "Modo Nocturno";
		setAttribute(searchIcon, "src", "./img/icon-search.svg");
		// TODO - when be desktop
		setAttribute(logoImg, "src", "./img/logo-mobile.svg");
	}
}

mainMenuButton.addEventListener("click", toggleMenu);
toggleTheme.addEventListener("click", setTheme);

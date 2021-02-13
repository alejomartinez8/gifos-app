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

function setTheme(e) {
	if (e) e.preventDefault();
	document.body.classList.toggle("dark");
	theme = document.body.classList.value;
	console.log(theme);
	if (theme === "dark") {
		localStorage.setItem("theme", "dark");
		if (menuOpen) mainMenuButton.setAttribute("src", "./img/close-modo-noct.svg");
		else mainMenuButton.setAttribute("src", "./img/burger-modo-noct.svg");
		toggleTheme.innerHTML = "Modo Diurno";
		searchIcon.setAttribute("src", "./img/icon-search-mod-noc.svg");
		// TODO - when be desktop
		logoImg.setAttribute("src", "./img/logo-mobile-modo-noct.svg");
	} else {
		localStorage.setItem("theme", "");
		if (menuOpen) mainMenuButton.setAttribute("src", "./img/close.svg");
		else mainMenuButton.setAttributeNS("src", "./img/burger.svg");
		toggleTheme.innerHTML = "Modo Nocturno";
		searchIcon.setAttribute("src", "./img/icon-search.svg");
		// TODO - when be desktop
		logoImg.setAttribute("src", "./img/logo-mobile.svg");
	}
}

mainMenuButton.addEventListener("click", toggleMenu);
toggleTheme.addEventListener("click", setTheme);

const mainMenuButton = document.getElementById("main-menu-button");
const menuContainer = document.getElementById("menu-container");
const toggleTheme = document.getElementById("toggle-theme-button");
const searchIcon = document.getElementById("search-icon");
const logoImg = document.getElementById("img-logo");

let theme = "";
let menuOpen = menuContainer.style.display === "block";

if (localStorage.getItem("theme") === "dark") {
	setTheme();
}

function toggleMenu() {
	menuOpen = !menuOpen;
	menuContainer.classList.toggle("close");
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

	if (theme === "dark") {
		localStorage.setItem("theme", "dark");
		setAttribute(
			mainMenuButton,
			"src",
			menuOpen ? "./img/close-modo-noct.svg" : "./img/burger-modo-noct.svg"
		);
		setAttribute(searchIcon, "src", "./img/icon-search-mod-noc.svg");
		setAttribute(logoImg, "src", "./img/logo-mobile-modo-noct.svg");
		toggleTheme.innerHTML = "Modo Diurno";
	} else {
		localStorage.setItem("theme", "");
		setAttribute(mainMenuButton, menuOpen && "src", "./img/close.svg");
		setAttribute(searchIcon, "src", "./img/icon-search.svg");
		setAttribute(logoImg, "src", "./img/logo-mobile.svg");
		toggleTheme.innerHTML = "Modo Nocturno";
	}
}

mainMenuButton.addEventListener("click", toggleMenu);
toggleTheme.addEventListener("click", setTheme);

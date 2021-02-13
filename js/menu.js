const mainMenu = document.getElementById("main-menu-button");
const navMenu = document.getElementById("nav-menu");

let menuOpen = navMenu.style.display === "block";

mainMenu.addEventListener("click", () => {
	menuOpen = !menuOpen;

	navMenu.style.display = menuOpen ? "block" : "none";
	mainMenu.setAttribute(
		"src",
		menuOpen ? "./img/close.svg" : "./img/burger.svg"
	);
});

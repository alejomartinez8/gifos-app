const toggleThemeButton = document.getElementById("toggle-theme-button");

let theme = "";

if (localStorage.getItem("theme") === "dark") {
	setTheme();
}

function setTheme(e) {
	if (e) e.preventDefault();
	document.body.classList.toggle("dark");
	theme = document.body.classList.value;
	console.log(theme);
	if (theme === "dark") {
		if (menuOpen) {
			mainMenu.setAttribute("src", "./img/close-modo-noct.svg");
		}
	}
}

toggleThemeButton.addEventListener("click", setTheme);

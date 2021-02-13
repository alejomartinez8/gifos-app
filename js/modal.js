const closeModalIcon = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal");

closeModalIcon.addEventListener("click", () => {
	modalContainer.style.display = "none";
});

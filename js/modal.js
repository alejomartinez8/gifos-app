const closeModalIcon = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal");

closeModalIcon.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

function setModalData(image, username, title) {
  modalContainer.style.display = "flex";
  const modalImage = document.getElementById("image-modal");
  const modalUser = document.getElementById("modal-user");
  const modalTitle = document.getElementById("modal-title");
  setAttribute(modalImage, "src", image);
  modalUser.innerText = username;
  modalTitle.innerText = title;
}

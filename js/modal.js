const closeModalIcon = document.getElementById("close-modal");
const modalContainer = document.getElementById("modal");
const buttonModalRight = document.getElementById("button-modal-right");
const buttonModalLeft = document.getElementById("button-modal-left");
let offsetModal = 0;

closeModalIcon.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

function setModalData(gifo) {
  const { username, title, images } = gifo;

  modalContainer.style.display = "flex";
  const modalImage = document.getElementById("image-modal");
  const modalUser = document.getElementById("modal-user");
  const modalTitle = document.getElementById("modal-title");
  setAttribute(modalImage, "src", images?.original?.url);
  modalUser.innerText = username;
  modalTitle.innerText = title;
}

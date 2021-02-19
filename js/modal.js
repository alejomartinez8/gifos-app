const modalContainer = document.getElementById("modal");
const buttonModalRight = document.getElementById("button-modal-right");
const buttonModalLeft = document.getElementById("button-modal-left");
const modalImage = document.getElementById("image-modal");
const modalUser = document.getElementById("modal-user");
const modalTitle = document.getElementById("modal-title");
const closeModalIcon = document.getElementById("close-modal");

let offsetModal = 0;
let gifoOptions = "";

closeModalIcon.addEventListener("click", () => {
  modalContainer.style.display = "none";
});

function setModalData(gifo, options) {
  const { username, title, images } = gifo;
  gifoOptions = options;

  modalContainer.style.display = "flex";
  setAttribute(modalImage, "src", images?.original?.url);
  modalUser.innerText = username;
  modalTitle.innerText = title;
}

async function addGifoToModal(offset, options) {
  let gifoToShow = {
    data: [],
  };
  console.log(options);

  switch (options.type) {
    case "trending":
      gifoToShow = await fetchTrendingGifos(1, offset);
      break;

    case "search":
      gifoToShow = await fetchSearchedGifos(options.search, offset, 1);
      break;

    case "favorite":
      break;
  }

  setModalData(gifoToShow.data[0], options);
}

function clearModal() {
  modalTitle.innerText = "";
  modalUser.innerText = "";
  setAttribute(modalImage, "src", "");
}

buttonModalLeft.addEventListener("click", () => {
  if (offsetModal) offsetModal--;
  clearModal();
  addGifoToModal(offsetModal, gifoOptions);
});

buttonModalRight.addEventListener("click", () => {
  offsetModal++;
  clearModal();
  addGifoToModal(offsetModal, gifoOptions);
});

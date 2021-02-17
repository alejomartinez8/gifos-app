const searchContainer = document.getElementById("search-container");
const inputSearch = document.getElementById("input-search");
const suggestedContainer = document.getElementById("suggested-container");

inputSearch.addEventListener("input", (e) => {
  suggestedContainer.style.display = "block";

  console.log(e.target.value);
  if (e.target.value === "") {
    suggestedContainer.style.display = "none";
  }
});

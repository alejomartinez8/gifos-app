const searchContainer = document.getElementById("search-container");
const inputSearch = document.getElementById("input-search");
const suggestedContainer = document.getElementById("suggested-container");

const API_KEY = "4SBXaLwgUjTtP0BLoT3mnAk5FL86H0qQ";

async function getSuggestedWords(term) {
  return await (
    await fetch(
      `https://api.giphy.com/v1/tags/related/${term}?api_key=${API_KEY}`
    )
  ).json();
}

inputSearch.addEventListener("input", async (e) => {
  console.log(e.target.value);

  if (e.target.value.length > 1) {
    const suggestedWords = await getSuggestedWords(e.target.value);
    if (suggestedWords.data.length) {
      suggestedContainer.style.display = "block";
      suggestedContainer.innerHTML = "";
      console.log(suggestedWords);
      for (let i = 0; (i < 4) & (i < suggestedWords.data.length); i++) {
        const term = document.createElement("li");
        term.innerText = suggestedWords.data[i]?.name;
        term.tabIndex = 0;
        suggestedContainer.appendChild(term);
      }
    } else {
      suggestedContainer.style.display = "none";
      suggestedContainer.innerHTML = "";
    }
  } else {
    suggestedContainer.style.display = "none";
    suggestedContainer.innerHTML = "";
  }
});

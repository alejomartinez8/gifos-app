const inputSearch = document.getElementById("input-search");

const API_KEY = "4SBXaLwgUjTtP0BLoT3mnAk5FL86H0qQ";

async function getSuggestedWords(term) {
  return await (
    await fetch(
      `https://api.giphy.com/v1/tags/related/${term}?api_key=${API_KEY}`
    )
  ).json();
}

inputSearch.addEventListener("input", async (e) => {
  const suggestedContainer = document.getElementById("suggested-container");
  const lineInputBottom = document.getElementById("line-input-bottom");
  if (e.target.value.length > 1) {
    const suggestedWords = await getSuggestedWords(e.target.value);
    if (suggestedWords.data.length) {
      displayBlock(suggestedContainer);
      displayBlock(lineInputBottom);
      suggestedContainer.innerHTML = "";
      for (let i = 0; i < suggestedWords.data.length; i++) {
        const term = document.createElement("li");
        term.innerText = suggestedWords.data[i]?.name;
        term.tabIndex = 0;
        suggestedContainer.appendChild(term);
      }
    } else {
      displayNone(suggestedContainer);
      displayNone(lineInputBottom);
      suggestedContainer.innerHTML = "";
    }
  } else {
    displayNone(suggestedContainer);
    displayNone(lineInputBottom);
    suggestedContainer.innerHTML = "";
  }
});

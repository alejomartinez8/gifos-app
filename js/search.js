const inputSearch = document.getElementById("input-search");
const iconSearch = document.getElementById("icon-search");
const sectionResults = document.getElementById("section-results");
const resultContainer = document.getElementById("container-gifos-result");
const headingResult = document.getElementById("heading-gifos-result");
const buttonViewMore = document.getElementById("btn-view-more");
let viewMoreCount = 0;

const API_KEY = "4SBXaLwgUjTtP0BLoT3mnAk5FL86H0qQ";

async function getSuggestedWords(term) {
  return await fetch(
    `https://api.giphy.com/v1/tags/related/${term}?api_key=${API_KEY}`
  ).then((response) => response.json());
}

async function getSearchedGifos(term, offset = 0, limit = 12) {
  return await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=${limit}&offset=${offset}`
  ).then((response) => response.json());
}

// Add Suggested Words to Searcher
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
        term.addEventListener("click", () => {
          inputSearch.value = term.innerText;
          inputSearch.focus();
        });
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

// Add Searched gifos
async function addGifosResult(term, options = { viewMore: false }) {
  try {
    const searchedGifos = await getSearchedGifos(
      term,
      options.viewMore ? viewMoreCount * 12 : 0
    );

    displayBlock(sectionResults);
    headingResult.textContent = inputSearch.value;

    searchedGifos.data.forEach((gifo) => {
      console.log(gifo);
      const imageContainer = document.createElement("div");
      imageContainer.classList.add("img-container");

      const img = document.createElement("img");
      img.setAttribute("src", gifo.images?.downsized?.url);
      img.setAttribute("alt", gifo.title);

      imageContainer.appendChild(img);
      gifoHover(
        imageContainer,
        gifo.title,
        gifo.username,
        gifo.images?.original?.url
      );
      resultContainer.appendChild(imageContainer);
    });

    if (!options.viewMore) {
      sectionResults.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    console.error(error);
  }
}

iconSearch.addEventListener("click", () => {
  resultContainer.innerHTML = "";
  addGifosResult(inputSearch.value);
});

buttonViewMore.addEventListener("click", () => {
  viewMoreCount++;
  addGifosResult(inputSearch.value, { viewMore: true });
});

const inputSearch = document.getElementById("input-search");
const iconSearch = document.getElementById("icon-search");
const sectionResults = document.getElementById("section-results");
const containerGifosResult = document.getElementById("container-gifos-result");
const headingResult = document.getElementById("heading-gifos-result");
const buttonViewMore = document.getElementById("btn-view-more");
const suggestedContainer = document.getElementById("suggested-container");
const lineInputBottom = document.getElementById("line-input-bottom");
let viewMoreCount = 0;

// Add Suggested Words to Searcher
inputSearch.addEventListener("input", async (e) => {
  if (e.target.value.length > 1) {
    const suggestedWords = await getSuggestedWords(e.target.value);
    if (suggestedWords.data.length) {
      displayBlock(suggestedContainer);
      displayBlock(lineInputBottom);
      suggestedContainer.innerHTML = "";
      suggestedWords.data.forEach((word) => {
        const term = document.createElement("li");
        term.innerText = word.name;
        term.tabIndex = 0;
        suggestedContainer.appendChild(term);
        term.addEventListener("click", () => {
          inputSearch.value = term.innerText;
          inputSearch.focus();
          containerGifosResult.innerHTML = "";
          addGifosResult(inputSearch.value);
        });
      });
    } else {
      clearSearch();
    }
  } else {
    clearSearch();
  }
});

function clearSearch() {
  displayNone(suggestedContainer);
  displayNone(lineInputBottom);
  suggestedContainer.innerHTML = "";
}

// Add gifos result to Section
async function addGifosResult(term, options = { viewMore: false }) {
  try {
    const searchedGifos = await getSearchedGifos(
      term,
      options.viewMore ? viewMoreCount * 12 : 0
    );

    displayBlock(sectionResults);
    headingResult.textContent = inputSearch.value;

    createGifos(containerGifosResult, searchedGifos.data);

    // searchedGifos.data.forEach((gifo) => {
    //   const imageContainer = document.createElement("div");
    //   imageContainer.classList.add("img-container");

    //   const img = document.createElement("img");
    //   img.setAttribute("src", gifo.images?.downsized?.url);
    //   img.setAttribute("alt", gifo.title);

    //   imageContainer.appendChild(img);
    //   gifoHover(imageContainer, gifo);
    //   containerGifosResult.appendChild(imageContainer);
    // });

    if (!options.viewMore) {
      sectionResults.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    console.error(error);
  }
}

iconSearch.addEventListener("click", () => {
  containerGifosResult.innerHTML = "";
  addGifosResult(inputSearch.value);
});

buttonViewMore.addEventListener("click", () => {
  viewMoreCount++;
  addGifosResult(inputSearch.value, { viewMore: true });
});

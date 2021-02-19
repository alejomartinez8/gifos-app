const inputSearch = document.getElementById("input-search");
const iconSearch = document.getElementById("icon-search");
const sectionResults = document.getElementById("section-results");
const containerGifosResult = document.getElementById("container-gifos-result");
const headingResult = document.getElementById("heading-gifos-result");
const buttonViewMore = document.getElementById("btn-view-more");
const suggestedContainer = document.getElementById("suggested-container");
const lineInputBottom = document.getElementById("line-input-bottom");

let viewMoreCount = 0;

// Add gifos result to Section
async function addGifosResult(term, options = { viewMore: false }) {
  try {
    const searchedGifos = await fetchSearchedGifos(
      term,
      options.viewMore ? viewMoreCount * 12 : 0
    );

    displayBlock(sectionResults);
    headingResult.textContent = inputSearch.value;

    createGifos(containerGifosResult, searchedGifos.data, {
      type: "search",
      search: term,
    });

    if (!options.viewMore) {
      sectionResults.scrollIntoView({ behavior: "smooth" });
    }
  } catch (error) {
    console.error(error);
  }
}

async function addTrendingSearchTerms() {
  const trendingTerms = document.getElementById("trending-terms");
  try {
    const terms = await fetchTrendingSearchTerms();

    terms.data.forEach((term, index) => {
      if (index < 5) {
        const upperCaseTerm = term[0].toUpperCase() + term.slice(1);
        const linkTerm = document.createElement("span");
        linkTerm.innerText = upperCaseTerm;
        linkTerm.addEventListener("click", () => {
          containerGifosResult.innerHTML = "";
          inputSearch.value = upperCaseTerm;
          addGifosResult(upperCaseTerm);
        });
        trendingTerms.appendChild(linkTerm);
        if (index !== 4) trendingTerms.append(", ");
      }
    });
  } catch (error) {
    console.error(error);
  }
}

addTrendingSearchTerms();

// Add Suggested Words to Searcher
inputSearch.addEventListener("input", async (e) => {
  if (e.target.value.length > 1) {
    iconSearch.classList.add("search");
    const suggestedWords = await fetchSuggestedWords(e.target.value);
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
    iconSearch.classList.remove("search");
    clearSearch();
  }
});

function clearSearch() {
  displayNone(suggestedContainer);
  displayNone(lineInputBottom);
  suggestedContainer.innerHTML = "";
}

iconSearch.addEventListener("click", () => {
  containerGifosResult.innerHTML = "";
  addGifosResult(inputSearch.value);
});

buttonViewMore.addEventListener("click", () => {
  viewMoreCount++;
  addGifosResult(inputSearch.value, { viewMore: true });
});

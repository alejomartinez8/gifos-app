const API_KEY = "4SBXaLwgUjTtP0BLoT3mnAk5FL86H0qQ";

async function fetchSuggestedWords(term) {
  return await fetch(
    `https://api.giphy.com/v1/tags/related/${term}?api_key=${API_KEY}`
  ).then((response) => response.json());
}

async function fetchSearchedGifos(term, offset = 0, limit = 12) {
  return await fetch(
    `https://api.giphy.com/v1/gifs/search?api_key=${API_KEY}&q=${term}&limit=${limit}&offset=${offset}`
  ).then((response) => response.json());
}

async function fetchTrendingGifos(limit = 3, offset = 0) {
  return await fetch(
    `https://api.giphy.com/v1/gifs/trending?api_key=${API_KEY}&limit=${limit}&offset=${offset}`
  ).then((response) => response.json());
}

async function fetchTrendingSearchTerms() {
  return await fetch(
    `https://api.giphy.com/v1/trending/searches?api_key=${API_KEY}`
  ).then((response) => response.json());
}
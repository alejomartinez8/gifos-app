let favorites = localStorage.getItem("favorites");
favorites = favorites ? JSON.parse(favorites) : [];

function toggleFavoriteGifo(gifo) {
  const favoriteIndex = favorites.findIndex((fav) => fav.id === gifo.id);
  if (favoriteIndex === -1) {
    favorites.push(gifo);
  } else {
    favorites.splice(favoriteIndex, 1);
  }

  localStorage.setItem("favorites", JSON.stringify(favorites));
}

function getFavorite(gifo) {
  return favorites.find((fav) => fav.id === gifo.id);
}

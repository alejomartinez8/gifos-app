const containerFavorites = document.getElementById("container-favorites");

if (favorites.length) {
  createGifos(containerFavorites, favorites, { type: "favorite" });
} else {
  containerFavorites.innerHTML = `
    <img
        class="no-result-icon"
        src="./img/icon-fav-sin-contenido.svg"
        alt="busqueda-sin-resultado"
    />
    <p class="no-result-text">"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"</p>
    `;
}

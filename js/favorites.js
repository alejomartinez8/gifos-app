const containerFavorites = document.getElementById("container-favorites");
const buttonViewMore = document.getElementById("btn-view-more");

if (favorites.length) {
  createGifos(containerFavorites, favorites, { type: "favorite" });
  //   buttonViewMore.classList.add("active");
} else {
  containerFavorites.innerHTML = `
    <img
        class="no-result-icon"
        src="./img/icon-fav-sin-contenido.svg"
        alt="busqueda-sin-resultado"
    />
    <p class="no-result-text">"¡Guarda tu primer GIFO en Favoritos para que se muestre aquí!"</p>
    `;
  buttonViewMore.classList.remove("active");
}

function getQueryParam(name) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(name);
}

document.addEventListener("DOMContentLoaded", () => {
  const title = getQueryParam("title");

  fetch("data/anime-data.json")
    .then((response) => response.json())
    .then((data) => {
      const selectedAnime = data.find((anime) => anime.title === title);

      if (selectedAnime) {
        const detailContainer = document.getElementById("animeDetails");
        detailContainer.innerHTML = `
          <h2>${selectedAnime.title}</h2>
          <img src="${selectedAnime.image}" alt="${selectedAnime.title}">
          <p><strong>Genre:</strong> ${selectedAnime.genre}</p>
          <p><strong>Rating:</strong> ${selectedAnime.rating}/10</p>
          <p><strong>Description:</strong> ${selectedAnime.description}</p>
          <button id="favoriteBtn" class="favorite-btn">Add to Favorites</button>
        `;

        const favoriteBtn = document.getElementById("favoriteBtn");
        let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

        updateFavoriteButton(
          favoriteBtn,
          favorites.includes(selectedAnime.title)
        );

        favoriteBtn.addEventListener("click", () => {
          let isFavorited = favorites.includes(selectedAnime.title);

          if (isFavorited) {
            // Remove from favorites
            favorites = favorites.filter(
              (title) => title !== selectedAnime.title
            );
          } else {
            // Add to favorites
            favorites.push(selectedAnime.title);
          }

          localStorage.setItem("favorites", JSON.stringify(favorites));
          updateFavoriteButton(favoriteBtn, !isFavorited);
        });
      } else {
        document.getElementById("animeDetails").innerText = "Anime not found.";
      }
    });

  function updateFavoriteButton(button, isFavorited) {
    if (isFavorited) {
      button.textContent = "Favorited ❤️";
      button.classList.add("favorited");
    } else {
      button.textContent = "Add to Favorites";
      button.classList.remove("favorited");
    }
  }
});

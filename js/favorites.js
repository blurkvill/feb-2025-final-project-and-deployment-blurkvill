function fetchAnimeJSON(path) {
  return fetch(path)
    .then((response) => response.json())
    .then((data) => data);
}

document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("favoritesContainer");

  fetchAnimeJSON("data/anime-data.json").then((animeData) => {
    const favoriteTitles = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favoriteTitles.length === 0) {
      container.innerHTML = `<p>No favorites yet. Go to the <a href="anime-list.html">Anime List</a> to add some!</p>`;
      return;
    }

    const favoriteAnimes = animeData.filter((anime) =>
      favoriteTitles.includes(anime.title)
    );

    if (favoriteAnimes.length === 0) {
      container.innerHTML = `<p>No favorites found. It seems like none of your favorites match the data.</p>`;
      return;
    }

    favoriteAnimes.forEach((anime) => {
      const card = document.createElement("div");
      card.className = "anime-card";
      card.innerHTML = `
        <a href="anime-detail.html?title=${encodeURIComponent(anime.title)}">
          <img src="${anime.image}" alt="${anime.title}">
          <h3>${anime.title}</h3>
          <p>Genre: ${anime.genre}</p>
          <p>Rating: ${anime.rating}/10</p>
        </a>
      `;
      container.appendChild(card);
    });
  });
});

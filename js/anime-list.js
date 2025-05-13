function fetchAnimeJSON(path) {
  return fetch(path).then((response) => response.json()); // Fetch and parse JSON data
}

function displayAnimeList(animeList) {
  const container = document.getElementById("animeList");
  container.innerHTML = "";

  animeList.forEach((anime) => {
    const card = document.createElement("div");
    card.className = "anime-card";
    card.innerHTML = `
            <a href="anime-detail.html?title=${encodeURIComponent(
              anime.title
            )}">
                <img src="${anime.image}" alt="${anime.title}">
                <h3>${anime.title}</h3>
                <p>Genre: ${anime.genre}</p>
                <p>Rating: ${anime.rating}/10</p>
            </a>
        `;
    container.appendChild(card);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  fetchAnimeJSON("data/anime-data.json").then((animeData) => {
    displayAnimeList(animeData);

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", () => {
      const filtered = animeData.filter((anime) =>
        anime.title.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      displayAnimeList(filtered);
    });
  });
});

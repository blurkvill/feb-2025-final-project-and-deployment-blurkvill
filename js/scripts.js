document.addEventListener("DOMContentLoaded", () => {
  // Fetch anime data from the JSON file
  fetch("data/anime-data.json")
    .then((response) => response.json())
    .then((animeData) => {
      displayFeaturedAnime(animeData);
    });

  function displayFeaturedAnime(animeData) {
    const featuredContainer = document.getElementById("featured");
    featuredContainer.innerHTML = ""; // Clears any existing content

    const featuredAnimes = getFeaturedAnimes(animeData, 6); // Number of featured anime to display

    featuredAnimes.forEach((anime) => {
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
      featuredContainer.appendChild(card);
    });
  }

  // Function to randomly pick featured anime
  function getFeaturedAnimes(animeData, count) {
    const shuffled = animeData.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
});

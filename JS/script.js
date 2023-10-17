const playButton = document.getElementById("play-button");
const creditsButton = document.getElementById("credits-button");

playButton.addEventListener("click", () => {
  // Redirigir al usuario a la página del juego al hacer clic en "Play"
  window.location.href = "raw.html";
});

creditsButton.addEventListener("click", () => {
  // Redirigir al usuario a la página de créditos al hacer clic en "Créditos"
  window.location.href = "creditos.html";
});

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

window.addEventListener("scroll", function () {
  var header = document.querySelector("header");
  var navmenu__menu = document.querySelector(".nav-menu__menu");
  var toTop = document.querySelector(".to-top");

  header.classList.toggle("down", window.scrollY > 0);
  navmenu__menu.classList.toggle("down", window.scrollY > 0);

  if (window.pageYOffset > 100) {
    toTop.classList.add("active");
  } else {
    toTop.classList.remove("active");
  }
});
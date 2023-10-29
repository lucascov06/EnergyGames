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

const el = document.getElementById('play-button')
const height = el.clientHeight
const width = el.clientWidth

el.addEventListener('mousemove',(evt)=> {
  const {layerX, layerY} = evt

  const yRotation=(
    (layerX-width/2)/width
  )*20

  const xRotation = (
    (layerY - height / 2)/ height
  )*20

  const string=`
    perspective(500px)
    scale(1.1)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)`
  el.style.transform = string

})

el.addEventListener('mouseout',()=>{
  el.style.transform=`
    perspective(500px)
    scale(1)
    rotateX(0)
    rotateY(0)`
})


const el1 = document.getElementById('credits-button')
const height1 = el1.clientHeight
const width1 = el1.clientWidth

el1.addEventListener('mousemove',(evt)=> {
  const {layerX, layerY} = evt

  const yRotation=(
    (layerX-width1/2)/width1
  )*20

  const xRotation = (
    (layerY - height1 / 2)/ height1
  )*20

  const string=`
    perspective(500px)
    scale(1.1)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)`
  el1.style.transform = string

})

el1.addEventListener('mouseout',()=>{
  el1.style.transform=`
    perspective(500px)
    scale(1)
    rotateX(0)
    rotateY(0)`
})

const el2 = document.getElementById('volver')
const height2 = el.clientHeight
const width2 = el.clientWidth

el.addEventListener('mousemove',(evt)=> {
  const {layerX, layerY} = evt

  const yRotation=(
    (layerX-width2/2)/width2
  )*20

  const xRotation = (
    (layerY - height2 / 2)/ height2
  )*20

  const string=`
    perspective(500px)
    scale(1.1)
    rotateX(${xRotation}deg)
    rotateY(${yRotation}deg)`
  el.style.transform = string

})

el.addEventListener('mouseout',()=>{
  el.style.transform=`
    perspective(500px)
    scale(1)
    rotateX(0)
    rotateY(0)`
})
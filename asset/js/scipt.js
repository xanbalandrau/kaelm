// fonction pour le menu burger
const menu = document.getElementById("navBar_menuBurger");
const icon = document.getElementById("navBar_menuBurger_icon");
function ouvertureMenuBurger() {
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
const fermer = document.getElementById("fermer");
fermer.addEventListener("click", () => {
  console.log("click");

  menu.classList.remove("open");
  icon.classList.remove("open");
});

// fonction pour ouvrir les liens des réseaux
let toggle = document.querySelector(".toggle");
let share = document.querySelector(".share");
function toggleAcitve() {
  share.classList.toggle("active");
}

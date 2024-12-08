// fonction pour le menu burger
function ouvertureMenuBurger() {
  const menu = document.getElementById("navBar_menuBurger");
  const icon = document.getElementById("navBar_menuBurger_icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}
// fonction pour ouvrir les liens des réseaux
let toggle = document.querySelector(".toggle");
let share = document.querySelector(".share");
function toggleAcitve() {
  share.classList.toggle("active");
}

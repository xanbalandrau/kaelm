// ***************** Lightbox *****************

// Classe principale Lightbox
class Lightbox {
  // Méthode statique pour initialiser la lightbox
  static init() {
    // Récupérer tous les liens d'images et de vidéos (.png, .jpeg, .jpg, .mp4)
    const links = Array.from(
      document.querySelectorAll(
        `a[href$=".png"],a[href$=".jpeg"],a[href$=".jpg"],a[href$=".mp4"]`
      )
    );

    // Créer une galerie (tableau des URLs des médias)
    const galerie = links.map((links) => links.getAttribute("href"));

    // Ajouter un événement de clic sur chaque lien
    links.forEach((links) => {
      links.addEventListener("click", (e) => {
        e.preventDefault(); // Empêche le comportement par défaut du lien
        new Lightbox(e.currentTarget.getAttribute("href"), galerie); // Crée une nouvelle instance de la Lightbox
      });
    });
  }

  // Constructeur : initialise une instance de la lightbox avec l'URL et la galerie
  constructor(url, galerie) {
    this.element = this.buildDOM(url); // Crée l'élément HTML de la lightbox
    this.galerie = galerie; // Galerie des chemins des images
    this.url = url; // URL actuelle de l'image
    this.onKeyUp = this.onKeyUp.bind(this); // Lie la méthode au contexte de l'instance
    document.body.appendChild(this.element); // Ajoute la lightbox au DOM
    document.addEventListener("keyup", this.onKeyUp); // Ajoute un écouteur pour les touches du clavier
  }

  // Charge une nouvelle image dans la lightbox
  loadImage(url) {
    const image = new Image(); // Crée un nouvel élément <img>
    const container = this.element.querySelector(".lightbox_container"); // Sélectionne le conteneur de l'image
    container.innerHTML = ""; // Vide le conteneur
    image.onload = () => {
      container.appendChild(image); // Ajoute l'image au conteneur une fois chargée
      this.url = url; // Met à jour l'URL actuelle
    };
    image.src = url; // Définit la source de l'image
  }

  // Gestion des interactions clavier
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e); // Ferme la lightbox si "Escape" est pressé
    } else if (e.key === "ArrowLeft") {
      this.prev(e); // Passe à l'image précédente si "Flèche gauche" est pressée
    } else if (e.key === "ArrowRight") {
      this.next(e); // Passe à l'image suivante si "Flèche droite" est pressée
    }
  }

  // Ferme la lightbox
  close(e) {
    e.preventDefault();
    this.element.classList.add("close"); // Ajoute une classe pour l'animation de fermeture
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element); // Retire l'élément du DOM après l'animation
    }, 500); // Temps de délai correspondant à l'animation CSS
    document.removeEventListener("keyup", this.onKeyUp); // Supprime l'écouteur d'événements clavier
  }

  // Passe à l'image suivante
  next(e) {
    e.preventDefault();
    let i = this.galerie.findIndex((image) => image === this.url); // Trouve l'index de l'image actuelle
    if (i === this.galerie.length - 1) {
      i = -1; // Revient au début si on est à la dernière image
    }
    this.loadImage(this.galerie[i + 1]); // Charge l'image suivante
  }

  // Passe à l'image précédente
  prev(e) {
    e.preventDefault();
    let i = this.galerie.findIndex((galerie) => galerie === this.url); // Trouve l'index de l'image actuelle
    if (i === 0) {
      i = this.galerie.length; // Revient à la fin si on est à la première image
    }
    this.loadImage(this.galerie[i - 1]); // Charge l'image précédente
  }

  // Construit et retourne l'élément HTML de la lightbox
  buildDOM(url) {
    const dom = document.createElement("div"); // Crée un élément <div>
    dom.classList.add("lightbox"); // Ajoute une classe "lightbox"
    dom.innerHTML = `
      <button class="lightbox_close">
        <i class="fa fa-times"></i>
      </button>
      <button class="lightbox_next">
        <i class="fa fa-chevron-right"></i>
      </button>
      <button class="lightbox_prev">
        <i class="fa fa-chevron-left"></i>
      </button>
      <div class="lightbox_container">
        <img
          src="${url}"
          alt=""
        />
      </div>`;
    // Ajoute des événements aux boutons
    dom
      .querySelector(".lightbox_close")
      .addEventListener("click", this.close.bind(this)); // Bouton "Fermer"
    dom
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this)); // Bouton "Suivant"
    dom
      .querySelector(".lightbox_prev")
      .addEventListener("click", this.prev.bind(this)); // Bouton "Précédent"
    return dom; // Retourne l'élément construit
  }
}

// Initialisation de la lightbox (lance le script)
Lightbox.init();
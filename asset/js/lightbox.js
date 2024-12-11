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
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("href"), galerie);
      });
    });
  }

  // Constructeur : initialise une instance de la lightbox avec l'URL et la galerie
  constructor(url, galerie) {
    this.element = this.buildDOM(url); // Crée l'élément HTML de la lightbox
    this.galerie = galerie;
    this.url = url; 
    this.onKeyUp = this.onKeyUp.bind(this); // Lie la méthode au contexte de l'instance
    document.body.appendChild(this.element); // Ajoute la lightbox au DOM
    document.addEventListener("keyup", this.onKeyUp); // Ajoute un écouteur pour les touches du clavier
  }

  // Charge une nouvelle image dans la lightbox
  loadImage(url) {
    const image = new Image(); 
    const container = this.element.querySelector(".lightbox_container"); 
    container.innerHTML = "";
    image.onload = () => {
      container.appendChild(image); // Ajoute l'image au conteneur une fois chargée
      this.url = url; // Met à jour l'URL actuelle
    };
    image.src = url; // Définit la source de l'image
  }

  // Gestion des interactions clavier
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e); 
    } else if (e.key === "ArrowLeft") {
      this.prev(e); 
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }

  // Ferme la lightbox
  close(e) {
    e.preventDefault();
    this.element.classList.add("close");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element); 
    }, 500); 
    document.removeEventListener("keyup", this.onKeyUp);
  }

  // Passe à l'image suivante
  next(e) {
    e.preventDefault();
    let i = this.galerie.findIndex((image) => image === this.url); // Trouve l'index de l'image actuelle
    if (i === this.galerie.length - 1) {
      i = -1;
    }
    this.loadImage(this.galerie[i + 1]);
  }

  // Passe à l'image précédente
  prev(e) {
    e.preventDefault();
    let i = this.galerie.findIndex((galerie) => galerie === this.url); // Trouve l'index de l'image actuelle
    if (i === 0) {
      i = this.galerie.length;
    }
    this.loadImage(this.galerie[i - 1]);
  }

  // Construit et retourne l'élément HTML de la lightbox
  buildDOM(url) {
    const dom = document.createElement("div"); 
    dom.classList.add("lightbox");
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
      .addEventListener("click", this.close.bind(this)); 
    dom
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox_prev")
      .addEventListener("click", this.prev.bind(this));
    return dom; // Retourne l'élément construit
  }
}

// Initialisation de la lightbox (lance le script)
Lightbox.init();
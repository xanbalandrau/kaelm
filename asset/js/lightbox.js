// lightbox
class Lightbox {
  static init() {
    const links = Array.from(
      document.querySelectorAll(
        `a[href$=".png"],a[href$=".jpeg"],a[href$=".jpg"],a[href$=".mp4"]`
      )
    );
    const galerie = links.map((links) => links.getAttribute("href"));

    links.forEach((links) => {
      links.addEventListener("click", (e) => {
        e.preventDefault();
        new Lightbox(e.currentTarget.getAttribute("href"), galerie);
      });
    });
  }
  // URl vers URL de l'image et galerie chemins des images
  constructor(url, galerie) {
    this.element = this.buildDOM(url);
    this.galerie = galerie;
    this.url = url;
    this.onKeyUp = this.onKeyUp.bind(this);
    document.body.appendChild(this.element);
    document.addEventListener("keyup", this.onKeyUp);
  }
  // Pour avoir l'url de l'image
  loadImage(url) {
    const image = new Image();
    const cointainer = this.element.querySelector(".lightbox_container");
    cointainer.innerHTML = "";
    image.onload = () => {
      cointainer.appendChild(image);
      this.url = url;
    };
    image.src = url;
  }
  // Pour utiliser le clavier
  onKeyUp(e) {
    if (e.key === "Escape") {
      this.close(e);
    } else if (e.key === "ArrowLeft") {
      this.prev(e);
    } else if (e.key === "ArrowRight") {
      this.next(e);
    }
  }
  // pour fermer la lightbox
  close(e) {
    e.preventDefault();
    this.element.classList.add("close");
    window.setTimeout(() => {
      this.element.parentElement.removeChild(this.element);
    }, 500);
    document.removeEventListener("keyup", this.onKeyUp);
  }
  // Pour next
  next(e) {
    e.preventDefault();
    let i = this.galerie.findIndex((image) => image === this.url);
    if (i === this.galerie.length - 1) {
      i = -1;
    }
    this.loadImage(this.galerie[i + 1]);
  }
  //Pour prev
  prev(e) {
    e.preventDefault();
    let i = this.galerie.findIndex((galerie) => galerie === this.url);
    if (i === 0) {
      i = this.galerie.length;
    }
    this.loadImage(this.galerie[i - 1]);
  }
  // return un element html
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
    dom
      .querySelector(".lightbox_close")
      .addEventListener("click", this.close.bind(this));
    dom
      .querySelector(".lightbox_next")
      .addEventListener("click", this.next.bind(this));
    dom
      .querySelector(".lightbox_prev")
      .addEventListener("click", this.prev.bind(this));
    return dom;
  }
}

Lightbox.init();

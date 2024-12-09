// Validation du formulaire en js
document.getElementById("formContact").addEventListener("submit", (e) => {
  e.preventDefault();
  const nom = document.getElementById("nom").value.trim();
  const prenom = document.getElementById("prenom").value.trim();
  const email = document.getElementById("email").value.trim();
  const sujet = document.getElementById("sujet").value.trim();
  const message = document.getElementById("message").value.trim();
  const erreur = document.querySelector(".error");
  // Réinitialiser le message erreur
  erreur.innerHTML = "";
  switch (true) {
    case nom === "":
      erreur.innerHTML += "J'ai besoin d'un nom!";
      break;
    case prenom === "":
      erreur.innerHTML += "J'ai besoin d'un prénom!";
      break;
    // regex -> // puis \S+ au moins un caractère
    case email === "" || !/\S+@\S+\.\S+/.test(email):
      erreur.innerHTML +=
        "J'ai besoin d'un adresse email valide pour te répondre!";
      break;
    case sujet === "":
      erreur.innerHTML += "J'attend un motif de contact!";
      break;
    case message === "":
      erreur.innerHTML +=
        "J'attend un message qui explique pourquoi tu me contactes!";
      break;
    default:
      erreur.innerHTML += "Bravo, formulaire envoyé avec succès!";
      erreur.classList = "envoye";
      break;
  }
});
// compteur pour le message
document.getElementById("message").addEventListener("keyup", function () {
  document.getElementById("compteur").innerHTML = message.value.length + "/500";
});

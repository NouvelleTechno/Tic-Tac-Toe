// On charge les informations utiles
const statut = document.querySelector("h2")
let jeuActif = true
let joueurActif = "X"
let etatJeu = ["", "", "", "", "", "", "", "", ""]

// On définit les conditions de victoire
const conditionsVictoire = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
]

// Messages
const gagne = () => `Le joueur ${joueurActif} a gagné`
const egalite = () => "Egalité"
const tourJoueur = () => `C'est au tour du joueur ${joueurActif}`

// On affiche quel joueur commence
statut.innerHTML = tourJoueur()

// On met en place les écouteurs d'évènements
document.querySelectorAll(".case").forEach(cell => cell.addEventListener("click", gestionClicCase))
document.querySelector("#recommencer").addEventListener("click", recommencer)

/**
 * Cette fonction gère le clic sur les cases du jeu
 */
function gestionClicCase(){
    // On récupère l'index de la case cliquée
    const indexCase = parseInt(this.dataset.index)
    
    // On vérifie si la case est déjà remplie ou le jeu terminé
    if(etatJeu[indexCase] !== "" || !jeuActif){
        return
    }

    // On écrit le symbole du joueur dans le tableau etatJeu et la case
    etatJeu[indexCase] = joueurActif
    this.innerHTML = joueurActif

    // On vérifie si le joueur a gagné
    verifGagne()
}

/**
 * Cette fonction vérifie si le joueur a gagné
 */
function verifGagne(){
    let tourGagnant = false

    // On parcourt toutes les conditions de victoire
    for(let conditionVictoire of conditionsVictoire){
        // On récupère les 3 cases de la condition de victoire
        let val1 = etatJeu[conditionVictoire[0]]
        let val2 = etatJeu[conditionVictoire[1]]
        let val3 = etatJeu[conditionVictoire[2]]

        // Si l'une des cases est vide
        if(val1 === "" || val2 === "" || val3 === ""){
            continue
        }

        // Si les 3 cases sont identiques
        if(val1 === val2 && val2 === val3){
            // On gagne
            tourGagnant = true
            break
        }
    }

    // Si on a gagné
    if(tourGagnant){
        statut.innerHTML = gagne()
        jeuActif = false
        return
    }

    // Si toutes les cases sont remplies
    if(!etatJeu.includes("")){
        statut.innerHTML = egalite()
        jeuActif = false
        return
    }

    // On change de joueur
    joueurActif = joueurActif === "X" ? "O" : "X"
    statut.innerHTML = tourJoueur()
}

/**
 * Cette fonction réinitialise le jeu
 */
function recommencer(){
    joueurActif = "X"
    jeuActif = true
    etatJeu = ["", "", "", "", "", "", "", "", ""]
    statut.innerHTML = tourJoueur()
    document.querySelectorAll(".case").forEach(cell => cell.innerHTML = "")
}
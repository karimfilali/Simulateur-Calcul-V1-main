const CAFactureClientEURL = document.getElementById("CAFactureClientEURL")
const honorairesDWEURL = document.getElementById("honorairesDWEURL")
const achatsSocieteEURL_1 = document.getElementById("achatsSocieteEURL_1")
const fraisRepasEURL_1 = document.getElementById("fraisRepasEURL_1")
const fraisDeplacementEURL_1 = document.getElementById("fraisDeplacementEURL_1")
const salaireBrutEURL = document.getElementById("salaireBrutEURL")
const RCAIEURL = document.getElementById("RCAIEURL")
const IS_EURL = document.getElementById("IS_EURL")
const revenuNetAvantImpotEURL = document.getElementById("revenuNetAvantImpotEURL")
const salaireChargeEURL = document.getElementById("salaireChargeEURL")
const salaireNetAvantImpotEURL = document.getElementById("salaireNetAvantImpotEURL")
const impotSurRevenuEURL = document.getElementById("impotSurRevenuEURL")
const PFU_EURL = document.getElementById("PFU_EURL")
const baremeProgressifEURL = document.getElementById("baremeProgressifEURL")
const revenuNetImpotTotalEURL = document.getElementById("revenuNetImpotTotalEURL")
const achatsSocieteEURL_2 = document.getElementById("achatsSocieteEURL_2")
const fraisRepasEURL_2 = document.getElementById("fraisRepasEURL_2")
const fraisDeplacementEURL_2 = document.getElementById("fraisDeplacementEURL_2")
const pouvoirAchatEURL = document.getElementById("pouvoirAchatEURL")
const rendementEURL = document.getElementById("rendementEURL")

function afficherDataEURL(){
    const CAFactureClientMois = nbJoursTravailAn * TJM / 12
    const honorairesDWMois = - CAFactureClientMois * honoraires / 100
    const achatsSocieteMois = - achatSociete / 12
    const fraisRepasMois = - fraisRepas
    const fraisDeplacementMois = - fraisDeplacements
    const salaireBrutMois = revenuConsultantBrut / 12
    const RCAIMois = CAFactureClientMois + honorairesDWMois + achatsSocieteMois + fraisRepasMois + fraisDeplacementMois - salaireBrutMois
    const ISMois = RCAIMois > varISMois ? (-0.25 * (RCAIMois - varISMois) - 0.15 * varISMois) : (-0.15 * RCAIMois)
    const revenuNetAvantImpotMois = RCAIMois + ISMois
    const salaireNetAvantImpotMois = 7989 / 12
    // const salaireNetAvantImpotMois = ??
    const PFUMois = calculBaremeProgressif("PFU", [salaireNetAvantImpotMois, revenuNetAvantImpotMois]) // Calcul du PFU
    const baremeProgressifMois = calculBaremeProgressif("Mod1", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[0] // Calcul du barème progressif. On récupère la première valeur
    const impotSurRevenuMois = Math.max(PFUMois, baremeProgressifMois)
    const revenuNetImpotTotalMois = salaireNetAvantImpotMois + revenuNetAvantImpotMois + impotSurRevenuMois
    const pouvoirAchatMois = revenuNetImpotTotalMois - fraisDeplacementMois - fraisRepasMois - achatsSocieteMois
    const rendementMois = pouvoirAchatMois / CAFactureClientMois * 100

    // Affichage des éléments dans la fiche de paie simplifiée (pas nécessairement d'affichage)
    CAFactureClientEURL.innerText = `${CAFactureClientMois.toFixed(2)} €`
    honorairesDWEURL.innerText = `${honorairesDWMois.toFixed(2)} €`
    achatsSocieteEURL_1.innerText = `${achatsSocieteMois.toFixed(2)} €`
    fraisRepasEURL_1.innerText = `${fraisRepasMois.toFixed(2)} €`
    fraisDeplacementEURL_1.innerText = `${fraisDeplacementMois.toFixed(2)} €`
    salaireBrutEURL.innerText = `${-salaireBrutMois.toFixed(2)} €`
    RCAIEURL.innerText = `${RCAIMois.toFixed(2)} €`
    IS_EURL.innerText = `${ISMois.toFixed(2)} €`
    revenuNetAvantImpotEURL.innerText = `${revenuNetAvantImpotMois.toFixed(2)} €`
    salaireChargeEURL.innerText = `${salaireBrutMois.toFixed(2)} €`
    salaireNetAvantImpotEURL.innerText = `${salaireNetAvantImpotMois.toFixed(2)} €`
    impotSurRevenuEURL.innerText = `${impotSurRevenuMois.toFixed(2)} €`
    PFU_EURL.innerText = `${PFUMois.toFixed(2)} €`
    baremeProgressifEURL.innerText = `${baremeProgressifMois.toFixed(2)} €`
    revenuNetImpotTotalEURL.innerText = `${revenuNetImpotTotalMois.toFixed(2)} €`
    achatsSocieteEURL_2.innerText = `${-achatsSocieteMois.toFixed(2)} €`
    fraisRepasEURL_2.innerText = `${-fraisRepasMois.toFixed(2)} €`
    fraisDeplacementEURL_2.innerText = `${-fraisDeplacementMois.toFixed(2)} €`
    pouvoirAchatEURL.innerText = `${pouvoirAchatMois.toFixed(2)} €`
    rendementEURL.innerText = `${rendementMois.toFixed(2)}%`

    return ["EURL IS", pouvoirAchatMois, rendementMois]
}

function getSalaireNet(salaireBrutAnnee){
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", 'data.json', false);
    xhReq.send(null);
    var data = JSON.parse(xhReq.responseText);  // Lecture du fichier data.json
    if(salaireBrutAnnee >= 6000 && salaireBrutAnnee < 422450){
        var row = parseInt((salaireBrutAnnee - 6000) / 50) // On obtient le numéro de la ligne par calcul mathématique
        return data[row][5];
    }
    
}
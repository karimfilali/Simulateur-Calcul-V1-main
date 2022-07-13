

const CAFactureClientSASUMod1 = document.getElementById("CAFactureClientSASUMod1")
const honorairesDWSASUMod1 = document.getElementById("honorairesDWSASUMod1")
const achatsSocieteSASUMod1_1 = document.getElementById("achatsSocieteSASUMod1_1")
const fraisRepasSASUMod1_1 = document.getElementById("fraisRepasSASUMod1_1")
const fraisDeplacementSASUMod1_1 = document.getElementById("fraisDeplacementSASUMod1_1")
const salaireBrutSASUMod1 = document.getElementById("salaireBrutSASUMod1")
const RCAISASUMod1 = document.getElementById("RCAISASUMod1")
const IS = document.getElementById("IS")
const revenuNetAvantImpotSASUMod1 = document.getElementById("revenuNetAvantImpotSASU1")
const salaireChargeSASUMod1 = document.getElementById("salaireChargeSASUMod1")
const salaireNetAvantImpotSASUMod1 = document.getElementById("salaireNetAvantImpotSASUMod1")
const impotSurRevenuSASUMod1 = document.getElementById("impotSurRevenuSASUMod1")
const PFU = document.getElementById("PFU")
const baremeProgressifSASUMod1 = document.getElementById("baremeProgressifSASUMod1")
const revenuNetImpotTotalSASUMod1 = document.getElementById("revenuNetImpotTotalSASUMod1")
const achatsSocieteSASUMod1_2 = document.getElementById("achatsSocieteSASUMod1_2")
const fraisRepasSASUMod1_2 = document.getElementById("fraisRepasSASUMod1_2")
const fraisDeplacementSASUMod1_2 = document.getElementById("fraisDeplacementSASUMod1_2")
const pouvoirAchatSASUMod1 = document.getElementById("pouvoirAchatSASUMod1")
const rendementSASUMod1 = document.getElementById("rendementSASUMod1")

function afficherDataMod1(){ // Fonction de calcul du pouvoir d'achat et du rendement dans le cas du comparatif, du scénario ou du calculTJM
    const CAFactureClientMois = nbJoursTravailAn * TJM / 12
    const honorairesDWMois = - CAFactureClientMois * honoraires / 100
    const achatsSocieteMois = - parseInt(inputAchatSociete.value) / 12
    const fraisRepasMois = - parseInt(inputFraisRepas.value)
    const fraisDeplacementMois = - parseInt(inputFraisDeplacements.value)
    const salaireBrutMois = parseInt(inputRevenuConsultantBrut.value) / 12
    const RCAIMois = CAFactureClientMois + honorairesDWMois + achatsSocieteMois + fraisRepasMois + fraisDeplacementMois - salaireBrutMois
    const ISMois = RCAIMois > varISMois ? (-0.25 * (RCAIMois - varISMois) - 0.15 * varISMois) : (-0.15 * RCAIMois)
    const revenuNetAvantImpotMois = RCAIMois + ISMois
    const salaireNetAvantImpotMois = 12 * salaireBrutMois >= 6000 ? getNetAvantImpot(12 * salaireBrutMois) / 12 : 0
    const PFUMois = calculBaremeProgressif("PFU", [salaireNetAvantImpotMois, revenuNetAvantImpotMois]) // Calcul du PFU
    const baremeProgressifMois = calculBaremeProgressif("Mod1", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[0] // Calcul du barème progressif. On récupère la première valeur
    const impotSurRevenuMois = Math.max(PFUMois, baremeProgressifMois)
    const revenuNetImpotTotalMois = salaireNetAvantImpotMois + revenuNetAvantImpotMois + impotSurRevenuMois - fraisDeplacementMois - fraisRepasMois - achatsSocieteMois
    const rendementMois = revenuNetImpotTotalMois / CAFactureClientMois * 100

    // Affichage des éléments dans la fiche de paie simplifiée (pas nécessairement d'affichage)
    CAFactureClientSASUMod1.innerText = `${CAFactureClientMois.toFixed(2)} €`
    honorairesDWSASUMod1.innerText = `${honorairesDWMois.toFixed(2)} €`
    achatsSocieteSASUMod1_1.innerText = `${achatsSocieteMois.toFixed(2)} €`
    fraisRepasSASUMod1_1.innerText = `${fraisRepasMois.toFixed(2)} €`
    fraisDeplacementSASUMod1_1.innerText = `${fraisDeplacementMois.toFixed(2)} €`
    salaireBrutSASUMod1.innerText = `${-salaireBrutMois.toFixed(2)} €`
    RCAISASUMod1.innerText = `${RCAIMois.toFixed(2)} €`
    IS.innerText = `${ISMois.toFixed(2)} €`
    revenuNetAvantImpotSASUMod1.innerText = `${revenuNetAvantImpotMois.toFixed(2)} €`
    salaireChargeSASUMod1.innerText = `${salaireBrutMois.toFixed(2)} €`
    salaireNetAvantImpotSASUMod1.innerText = `${salaireNetAvantImpotMois.toFixed(2)} €`
    impotSurRevenuSASUMod1.innerText = `${impotSurRevenuMois.toFixed(2)} €`
    PFU.innerText = `${PFUMois.toFixed(2)} €`
    baremeProgressifSASUMod1.innerText = `${baremeProgressifMois.toFixed(2)} €`
    revenuNetImpotTotalSASUMod1.innerText = `${revenuNetImpotTotalMois.toFixed(2)} €`
    achatsSocieteSASUMod1_2.innerText = `${-achatsSocieteMois.toFixed(2)} €`
    fraisRepasSASUMod1_2.innerText = `${-fraisRepasMois.toFixed(2)} €`
    fraisDeplacementSASUMod1_2.innerText = `${-fraisDeplacementMois.toFixed(2)} €`
    pouvoirAchatSASUMod1.innerText = `${revenuNetImpotTotalMois.toFixed(2)} €`
    rendementSASUMod1.innerText = `${rendementMois.toFixed(2)}%`

    return ["SASU Mod 1", revenuNetImpotTotalMois, rendementMois]
}


function getNetAvantImpot(salaireBr){ // Récupération du Net Avant Impot (ligne 9) en fonction du salaire brut dans le fichier data.json (BDD)
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", 'data.json', false);
    xhReq.send(null);
    var data = JSON.parse(xhReq.responseText);  // Lecture du fichier data.json
    var row = (salaireBr - 6000 - salaireBr % 50) / 50 // On obtient le numéro de la ligne par calcul mathématique
    return data[row][9];
}
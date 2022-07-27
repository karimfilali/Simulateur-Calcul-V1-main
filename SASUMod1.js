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
    const achatsSocieteMois = - achatSociete / 12
    const fraisRepasMois = - fraisRepas
    const fraisDeplacementMois = - fraisDeplacements
    const salaireBrutMois = revenuConsultantBrut / 12
    const ISMois = RCAIMois > varISMois ? (-0.25 * (RCAIMois - varISMois) - 0.15 * varISMois) : (-0.15 * RCAIMois)
    const revenuNetAvantImpotMois = RCAIMois + ISMois
    const salaireNetAvantImpotMois = salaireNetAvantImpot_AssimileSalarie()
    const PFUMois = calculBaremeProgressif("PFU", [salaireNetAvantImpotMois, revenuNetAvantImpotMois]) // Calcul du PFU
    const baremeProgressifMois = calculBaremeProgressif("Mod1", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[0] // Calcul du barème progressif. On récupère la première valeur
    const impotSurRevenuMois = Math.max(PFUMois, baremeProgressifMois)
    const revenuNetImpotTotalMois = salaireNetAvantImpotMois + revenuNetAvantImpotMois + impotSurRevenuMois
    const pouvoirAchatMois = revenuNetImpotTotalMois - fraisDeplacementMois - fraisRepasMois - achatsSocieteMois
    const rendementMois = pouvoirAchatMois / CAFactureClientMois * 100

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
    pouvoirAchatSASUMod1.innerText = `${pouvoirAchatMois.toFixed(2)} €`
    rendementSASUMod1.innerText = `${rendementMois.toFixed(2)}%`

    return ["SASU Mod 1", pouvoirAchatMois, rendementMois]
}


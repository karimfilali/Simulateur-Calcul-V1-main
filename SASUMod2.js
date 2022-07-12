const CAFactureClientSASUMod2 = document.getElementById("CAFactureClientSASUMod2")
const honorairesDWSASUMod2 = document.getElementById("honorairesDWSASUMod2")
const achatsSocieteSASUMod2_1 = document.getElementById("achatsSocieteSASUMod2_1")
const fraisRepasSASUMod2_1 = document.getElementById("fraisRepasSASUMod2_1")
const fraisDeplacementSASUMod2_1 = document.getElementById("fraisDeplacementSASUMod2_1")
const salaireBrutSASUMod2 = document.getElementById("salaireBrutSASUMod2")
const RCAISASUMod2 = document.getElementById("RCAISASUMod2")
const CSG = document.getElementById("CSG")
const revenuNetAvantImpotSASUMod2 = document.getElementById("revenuNetAvantImpotSASUMod2")
const salaireChargeSASUMod2 = document.getElementById("salaireChargeSASUMod2")
const salaireNetAvantImpotSASUMod2 = document.getElementById("salaireNetAvantImpotSASUMod2")
const impotSurRevenuSASUMod2 = document.getElementById("impotSurRevenuSASUMod2")
const baremeProgressifSASUMod2 = document.getElementById("baremeProgressifSASUMod2")
const revenuNetImpotTotalSASUMod2 = document.getElementById("revenuNetImpotTotalSASUMod2")
const achatsSocieteSASUMod2_2 = document.getElementById("achatsSocieteSASUMod2_2")
const fraisRepasSASUMod2_2 = document.getElementById("fraisRepasSASUMod2_2")
const fraisDeplacementSASUMod2_2 = document.getElementById("fraisDeplacementSASUMod2_2")
const pouvoirAchatSASUMod2 = document.getElementById("pouvoirAchatSASUMod2")
const rendementSASUMod2 = document.getElementById("rendementSASUMod2")

function afficherDataMod2(){
    const CAFactureClientMois = nbJoursTravailAn * TJM / 12
    const honorairesDWMois = - CAFactureClientMois * honoraires / 100
    const achatsSocieteMois = - parseInt(inputAchatSociete.value) / 12
    const fraisRepasMois = - parseInt(inputFraisRepas.value)
    const fraisDeplacementMois = - parseInt(inputFraisDeplacements.value)
    const salaireBrutMois = parseInt(inputRevenuConsultantBrut.value) / 12
    const RCAIMois = CAFactureClientMois + honorairesDWMois + achatsSocieteMois + fraisRepasMois + fraisDeplacementMois - salaireBrutMois
    const CSGMois = -0.097 * RCAIMois
    const revenuNetAvantImpotMois = RCAIMois + CSGMois
    const salaireNetAvantImpotMois = 12 * salaireBrutMois >= 6000 ? getNetAvantImpot(12 * salaireBrutMois) / 12 : 0
    const baremeProgressifMois = calculBaremeProgressif("Mod2", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])
    const pouvoirAchatMois = revenuNetAvantImpotMois + salaireNetAvantImpotMois + baremeProgressifMois - achatsSocieteMois - fraisDeplacementMois - fraisRepasMois
    const rendementMois = pouvoirAchatMois / CAFactureClientMois * 100

    CAFactureClientSASUMod2.innerText = `${CAFactureClientMois.toFixed(2)} €`
    honorairesDWSASUMod2.innerText = `${honorairesDWMois.toFixed(2)} €`
    achatsSocieteSASUMod2_1.innerText = `${achatsSocieteMois.toFixed(2)} €`
    fraisRepasSASUMod2_1.innerText = `${fraisRepasMois.toFixed(2)} €`
    fraisDeplacementSASUMod2_1.innerText = `${fraisDeplacementMois.toFixed(2)} €`
    salaireBrutSASUMod2.innerText = `${-salaireBrutMois.toFixed(2)} €`
    RCAISASUMod2.innerText = `${RCAIMois.toFixed(2)} €`
    CSG.innerText = `${CSGMois.toFixed(2)} €`
    revenuNetAvantImpotSASUMod2.innerText = `${revenuNetAvantImpotMois.toFixed(2)} €`
    salaireChargeSASUMod2.innerText = `${salaireBrutMois.toFixed(2)} €`
    salaireNetAvantImpotSASUMod2.innerText = `${salaireNetAvantImpotMois.toFixed(2)} €`
    impotSurRevenuSASUMod2.innerText = `${baremeProgressifMois.toFixed(2)} €`
    baremeProgressifSASUMod2.innerText = `${baremeProgressifMois.toFixed(2)} €`
    revenuNetImpotTotalSASUMod2.innerText = `${pouvoirAchatMois.toFixed(2)} €`
    achatsSocieteSASUMod2_2.innerText = `${-achatsSocieteMois.toFixed(2)} €`
    fraisRepasSASUMod2_2.innerText = `${-fraisRepasMois.toFixed(2)} €`
    fraisDeplacementSASUMod2_2.innerText = `${-fraisDeplacementMois.toFixed(2)} €`
    pouvoirAchatSASUMod2.innerText = `${pouvoirAchatMois.toFixed(2)} €`
    rendementSASUMod2.innerText = `${rendementMois.toFixed(2)}%`

    return ["SASU Mod 2", pouvoirAchatMois, rendementMois]
}


function getNetAvantImpot(salaireBr){
    var xhReq = new XMLHttpRequest();
    xhReq.open("GET", 'data.json', false);
    xhReq.send(null);
    var data = JSON.parse(xhReq.responseText);  // Lecture du fichier data.json
    var row = (salaireBr - 6000 - salaireBr % 50) / 50 // On obtient le numéro de la ligne par calcul mathématique
    return data[row][9];
}
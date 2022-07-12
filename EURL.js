const CAFactureClientEURL = document.getElementById("CAFactureClientEURL")
const honorairesDWEURL = document.getElementById("honorairesDWEURL")
const achatsSocieteEURL_1 = document.getElementById("achatsSocieteEURL_1")
const fraisRepasEURL_1 = document.getElementById("fraisRepasEURL_1")
const fraisDeplacementEURL_1 = document.getElementById("fraisDeplacementEURL_1")
const salaireBrutEURL = document.getElementById("salaireBrutEURL")
const cotisationsSalarialesPatronales = document.getElementById("cotisationsSalarialesPatronales")
const salaireNetAvantImpotEURL = document.getElementById("salaireNetAvantImpotEURL")
const impotSurRevenuEURL = document.getElementById("impotSurRevenuEURL")
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
    const achatsSocieteMois = -parseInt(inputAchatSociete.value) / 12
    const fraisRepasMois = -parseInt(inputFraisRepas.value)
    const fraisDeplacementMois = -parseInt(inputFraisDeplacements.value)
    const CAIndependantMois = CAFactureClientMois + honorairesDWMois + achatsSocieteMois + fraisRepasMois + fraisDeplacementMois
    const salaireBrutMois = CAIndependantMois - ((CAIndependantMois * 12) % 50) / 12
    const salaireNetAvantImpotMois = getSalaireNet(salaireBrutMois * 12) / 12
    const cotisationsSalarialesPatronalesMois = salaireNetAvantImpotMois - salaireBrutMois
    const baremeProgressifMois = calculBaremeProgressif("EURL", salaireNetAvantImpotMois)[0]
    const revenuNetImpotTotalMois = salaireNetAvantImpotMois + baremeProgressifMois
    const pouvoirAchatMois = revenuNetImpotTotalMois - achatsSocieteMois - fraisDeplacementMois - fraisRepasMois
    const rendementMois = pouvoirAchatMois / CAFactureClientMois * 100

    CAFactureClientEURL.innerText = `${CAFactureClientMois.toFixed(2)} €`
    honorairesDWEURL.innerText = `${honorairesDWMois.toFixed(2)} €`
    achatsSocieteEURL_1.innerText = `${achatsSocieteMois.toFixed(2)} €`
    fraisRepasEURL_1.innerText = `${fraisRepasMois.toFixed(2)} €`
    fraisDeplacementEURL_1.innerText = `${fraisDeplacementMois.toFixed(2)} €`
    salaireBrutEURL.innerText = `${salaireBrutMois.toFixed(2)} €`
    cotisationsSalarialesPatronales.innerText = `${cotisationsSalarialesPatronalesMois.toFixed(2)} €`
    salaireNetAvantImpotEURL.innerText = `${salaireNetAvantImpotMois.toFixed(2)} €`
    impotSurRevenuEURL.innerText = `${baremeProgressifMois.toFixed(2)} €`
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
const ACRE = document.getElementById("ACRE")
const fiscalite = document.getElementById("fiscalite")
const CAFactureClient = document.getElementById("CAFactureClientME")
const honorairesDW = document.getElementById("honorairesDWME")
const URSSAF = document.getElementById("URSSAF")
const formation = document.getElementById("formation")
const revenuAvantImpotME = document.getElementById("revenuAvantImpotME")
const impotSurRevenuME = document.getElementById("impotSurRevenuME")
const prelevementLiberatoire = document.getElementById("prelevementLiberatoire")
const baremeProgressifME = document.getElementById("baremeProgressifME")
const revenuNetImpotTotalME = document.getElementById("revenuNetImpotTotalME")
const pouvoirAchatME = document.getElementById("pouvoirAchatME")
const rendementME = document.getElementById("rendementME")

document.getElementById("ACRE").addEventListener("change", () => { // Recalcul de la fiche de paie en cas de changement du bouton ACRE
    getInputData()
    afficherDataME("affiche")
})

document.getElementById("fiscalite").addEventListener("change", () => { // Recalcul de la fiche de paie en cas de changement du bouton fiscalité
    getInputData()
    afficherDataME("affiche")
})

function afficherDataME(selection, i){ // Fonction de calcul du pouvoir d'achat et du rendement dans le cas du comparatif, du scénario ou du calculTJM
    const CAClientMois = nbJoursTravailAn * TJM / 12 // Cellule C28
    const honorairesMois = -CAClientMois * honoraires / 100  // Cellule C29
    const CAIndependantMois = CAClientMois + honorairesMois
    let URSSAFMois
    // Les trois cas suivants permettent de savoir si l'on change la valeur du bouton ACRE dans le cas du comparatif, de l'affichage, du calcul TJM ou du scénario
    // Il faut donc récupérer le bon bouton et la bonne valeur en fonction du cas
    if(selection == "compare" || selection == "calculTJM") URSSAFMois = valueACREinput ? (-0.11 * CAIndependantMois) : (-0.22 * CAIndependantMois)
    if(selection == "affiche") URSSAFMois = valueACRE_affiche ? (-0.11 * CAIndependantMois) : (-0.22 * CAIndependantMois)
    if(selection == "scenario") URSSAFMois = (ACREselects[i].value === "oui") ? (-0.11 * CAIndependantMois) : (-0.22 * CAIndependantMois)

    const formationMois = -0.002 * CAIndependantMois
    const revenuAvantImpotMois = CAIndependantMois + URSSAFMois + formationMois
    const prelevementLiberatoireMois = -0.022 * CAIndependantMois
    const baremeProgressifMois = calculBaremeProgressif("ME", CAIndependantMois)[0]
    let impotSurRevenuMois
    // Les trois cas suivants permettent de savoir si l'on change la valeur du bouton Fiscalité dans le cas du comparatif, de l'affichage, du calcul TJM ou du scénario
    // Il faut donc récupérer le bon bouton et la bonne valeur en fonction du cas
    if(selection == "compare" || selection == "calculTJM") impotSurRevenuMois = valueFiscaliteInput ? Math.max(prelevementLiberatoireMois, baremeProgressifMois) : baremeProgressifMois
    if(selection == "affiche") impotSurRevenuMois = valuePrelevementLiberatoire_affiche ? Math.max(prelevementLiberatoireMois, baremeProgressifMois) : baremeProgressifMois
    if(selection == "scenario") impotSurRevenuMois = (fiscaliteSelects[i].value === "oui") ? Math.max(prelevementLiberatoireMois, baremeProgressifMois) : baremeProgressifMois
    
    const revenuNetImpotTotalMois = revenuAvantImpotMois + impotSurRevenuMois
    const pouvoirAchatMois = revenuAvantImpotMois + impotSurRevenuMois
    const rendementMois = pouvoirAchatMois / CAClientMois * 100

    // Remplissage de la fiche de paie simplifiée (pas nécessairement d'affichage)
    CAFactureClient.innerText = `${CAClientMois.toFixed(2)} €`
    honorairesDW.innerText = `${honorairesMois.toFixed(2)} €`
    URSSAF.innerText = `${URSSAFMois.toFixed(2)} €`
    formation.innerText = `${formationMois.toFixed(2)} €`
    revenuAvantImpotME.innerText = `${revenuAvantImpotMois.toFixed(2)} €`
    impotSurRevenuME.innerText = `${impotSurRevenuMois.toFixed(2)} €`
    prelevementLiberatoire.innerText = `${prelevementLiberatoireMois.toFixed(2)} €`
    baremeProgressifME.innerText = `${baremeProgressifMois.toFixed(2)} €`
    revenuNetImpotTotalME.innerText = `${revenuNetImpotTotalMois.toFixed(2)} €`
    pouvoirAchatME.innerText = `${pouvoirAchatMois.toFixed(2)} €`
    rendementME.innerText = `${rendementMois.toFixed(2)} %`

    return ["Micro Entreprise", pouvoirAchatMois, rendementMois]
}
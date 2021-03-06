const selectInputs1 = document.querySelectorAll(".selectInput1")
const nbMoisInput = document.querySelectorAll(".nbMoisInput")
const salairesMois = document.querySelectorAll(".salaireMois")
const cumulsPeriode = document.querySelectorAll(".cumulPeriode")
const selectInputs2 = document.querySelectorAll(".selectInput2")
const indemnitesNetMensuel = document.querySelectorAll(".indemniteNetMensuel")
const indemnitesNetPeriode = document.querySelectorAll(".indemniteNetPeriode")
const pouvoirAchatMois = document.querySelectorAll(".PAMois")
const pouvoirAchatPeriode = document.querySelectorAll(".PAPeriode")

const ACREselects = document.querySelectorAll(".ACREselect")
const fiscaliteSelects = document.querySelectorAll(".fiscaliteSelect")

const disabledARCE = document.querySelectorAll(".disabledARCE")
const disabledFiscalite = document.querySelectorAll(".disabledFiscalite")
const disabledARCE_droitsPE = document.querySelectorAll(".disabledARCE_droitsPE")
const disabledARE_droitsPE = document.querySelectorAll(".disabledARE_droitsPE")

let capitalInitial
let nbMois
let J5 // Référence à la case Départ!J5

document.getElementById("inputBrutPE").addEventListener("change", calculateScenario) // Recalcul de la page scénario lorsque l'on modifie n'importe quelle valeur
document.getElementById("inputIndemnitePE").addEventListener("change", calculateScenario)
selectInputs1.forEach(input => input.addEventListener("change", calculateScenario))
nbMoisInput.forEach(input => input.addEventListener("change", calculateScenario))
selectInputs2.forEach(input => input.addEventListener("change", calculateScenario))
ACREselects.forEach(select => select.addEventListener("change", calculateScenario))
fiscaliteSelects.forEach(select => select.addEventListener("change", calculateScenario)) // Recalcul de la page scénario lorsque l'on modifie n'importe quelle valeur

let ligneARCE
let ligneARE
let ligneSoldeDroits
let ligneIndemnisationPeriode
let ligneImpotPeriode

function calculCapitalInitialEtJ5(){ // Case I5 de la feuille départ
    if(oldBrutPE < 54000) capitalInitial = oldBrutPE * 0.57 * dureeIndemnitePE / 12
    else capitalInitial = (dureeIndemnitePE <= 8) ? oldBrutPE * 0.57 * dureeIndemnitePE / 12 : (oldBrutPE * 0,57 * 8 / 12) + (oldBrutPE * 0,57 * 0,7 * (dureeIndemnitePE - 8) / 12)
    J5 = capitalInitial * 12 / dureeIndemnitePE // Return Départ!J5
}

function calculLigneARCEetARE(){
    ligneARCE = [0, 0, 0, 0, 0] // Réinitialisation pour chaque changement de valeur
    ligneARE = [] // Réinitialisation pour chaque changement de valeur

    for(let i = 0 ; i < 5 ; i++){
        if(selectInputs1[i].value == "PS") selectInputs2[i].value = "aucun"
        if(selectInputs1[i].value == "ME" && selectInputs2[i].value == "ARE") selectInputs2[i].value = "aucun"
        if(selectInputs1[i].value == "SASUMod2" && selectInputs2[i].value == "ARE") selectInputs2[i].value = "aucun"

        if(selectInputs1[i].value != "ME") ACREselects[i].value = "non"
        if(selectInputs1[i].value != "ME") fiscaliteSelects[i].value = "non"
        if(selectInputs2[i].value == "ARCE" && !ligneARCE.includes(1)) ligneARCE[i] = 1 // Si l'on sélectionne l'ARCE à la colonne i et qu'il n'a pas été sélecionné aux colonnes avant
        if(selectInputs2[i].value == "ARE") ligneARE.push(Math.min(nbMois[i], parseInt(dureeIndemnitePE - ligneARE.reduce((partialSum, a) => partialSum + a, 0))))
        else ligneARE.push(0)
    }
}

function calculateScenario(){
    getInputData()
    nbMois = [parseInt(nbMoisInput[0].value), parseInt(nbMoisInput[1].value), parseInt(nbMoisInput[2].value), parseInt(nbMoisInput[3].value), parseInt(nbMoisInput[4].value)]
    let indemniteNetPeriodeTab = []
    let indemniteNetMoisTab = []
    let salaireMoisTab = []
    let pouvoirAchatMoisTab = []

    calculCapitalInitialEtJ5()
    calculLigneARCEetARE()

    ligneSoldeDroits = [capitalInitial]
    ligneIndemnisationPeriode = []
    ligneImpotPeriode = []

    for(let i = 0 ; i < 5 ; i++){
        disabledARCE[i].disabled = true
        disabledFiscalite[i].disabled = true // On empêche la sélection de l'ARCE et de la fiscalité si l'on n'est pas dans ME
        disabledARCE_droitsPE[i].disabled = true
        disabledARE_droitsPE[i].disabled = true // On empêche la sélection de l'ARCE et de l'ARE pour les droits Pôle Emploi

        if(selectInputs1[i].value == "PS"){
            createFichePaie()
            salaireMoisTab.push(sendDataSimplifieePS()[1])
            ligneIndemnisationPeriode.push(0)
            ligneSoldeDroits.push(ligneSoldeDroits[i] - ligneIndemnisationPeriode[i])
        }
        if(selectInputs1[i].value == "ME"){
            disabledARCE[i].disabled = false
            disabledFiscalite[i].disabled = false
            disabledARCE_droitsPE[i].disabled = false // On réactive la possibilité de sélectionner l'ARCE, la fiscalité et l'ARCE Pôle Emploi

            salaireMoisTab.push(afficherDataME("scenario", i)[1])
            if(ligneARCE[i] == 1) ligneIndemnisationPeriode.push(ligneSoldeDroits[i] * 0.45)
            else ligneIndemnisationPeriode.push(Math.min(ligneSoldeDroits[i], ligneARE[i] * capitalInitial / dureeIndemnitePE))
            ligneSoldeDroits.push(ligneSoldeDroits[i] - ligneIndemnisationPeriode[i])
        }
        if(selectInputs1[i].value == "SASUMod1"){
            disabledARCE_droitsPE[i].disabled = false
            disabledARE_droitsPE[i].disabled = false
            
            salaireMoisTab.push(afficherDataMod1()[1])
            if(ligneARCE[i] == 1) ligneIndemnisationPeriode.push(ligneSoldeDroits[i] * 0.45)
            else ligneIndemnisationPeriode.push(Math.min(ligneSoldeDroits[i], ligneARE[i] * capitalInitial / dureeIndemnitePE))
            ligneSoldeDroits.push(ligneSoldeDroits[i] - ligneIndemnisationPeriode[i])
        }
        if(selectInputs1[i].value == "SASUMod2"){
            disabledARCE_droitsPE[i].disabled = false

            salaireMoisTab.push(afficherDataMod2()[1])
            if(ligneARCE[i] == 1) ligneIndemnisationPeriode.push(ligneSoldeDroits[i] * 0.45)
            else ligneIndemnisationPeriode.push(0)
            ligneSoldeDroits.push(ligneSoldeDroits[i] - ligneIndemnisationPeriode[i])
        }
        if(selectInputs1[i].value == "EURL"){
            disabledARCE_droitsPE[i].disabled = false
            disabledARE_droitsPE[i].disabled = false

            salaireMoisTab.push(afficherDataEURL()[1])
            if(ligneARCE[i] == 1) ligneIndemnisationPeriode.push(ligneSoldeDroits[i] * 0.45)
            else ligneIndemnisationPeriode.push(Math.min(ligneSoldeDroits[i], ligneARE[i] * capitalInitial / dureeIndemnitePE))
            ligneSoldeDroits.push(ligneSoldeDroits[i] - ligneIndemnisationPeriode[i])
        }
        if(selectInputs1[i].value == "rien"){
            ligneIndemnisationPeriode.push(0)
            salaireMoisTab.push(0)
            ligneSoldeDroits.push(0)
            indemniteNetPeriodeTab.push(0)
            ligneImpotPeriode.push(0)
        }
    }

    for(let i = 0 ; i < 5 ; i++){
        if(ligneIndemnisationPeriode[i] > 0){
            if(selectInputs1[i].value == "ME") calculImpotPeriodeME(i)
            if(selectInputs1[i].value == "SASUMod1") calculImpotPeriodeSASUMod1()
            if(selectInputs1[i].value == "SASUMod2") calculImpotPeriodeSASUMod2()
            if(selectInputs1[i].value == "EURL") calculImpotPeriodeEURL()
        } else ligneImpotPeriode.push(0) // Les impôts valent automatiquement 0 dans le cas du Portage Salarial ou si l'indemnisation période pour le statut choisi est nul
        indemniteNetPeriodeTab.push(ligneIndemnisationPeriode[i] - ligneImpotPeriode[i])
        indemniteNetMoisTab.push(indemniteNetPeriodeTab[i] / nbMois[i])
        let cumulPeriode = salaireMoisTab[i] * nbMois[i]
        pouvoirAchatMoisTab.push((cumulPeriode + indemniteNetPeriodeTab[i]) / nbMois[i])
        salairesMois[i].innerText = `${salaireMoisTab[i].toFixed(1)} €`
        cumulsPeriode[i].innerText = `${cumulPeriode.toFixed(1)} €`
        indemnitesNetMensuel[i].innerText = `${(indemniteNetMoisTab[i]).toFixed(1)} €`
        indemnitesNetPeriode[i].innerText = `${indemniteNetPeriodeTab[i].toFixed(1)} €`
        pouvoirAchatMois[i].innerText = `${pouvoirAchatMoisTab[i].toFixed(1)} €`
        pouvoirAchatPeriode[i].innerText = `${(cumulPeriode + indemniteNetPeriodeTab[i]).toFixed(1)} €`
    }
    
    // Affichage des éléments de la colonne Moyenne
    document.getElementById("totalMoisScenario").innerText = `${nbMois.reduce((partialSum, a) => partialSum + a, 0)} mois`
    document.getElementById("salaireMoisMoyenne").innerText = `${calculateMoyenneTableau(salaireMoisTab).toFixed(1)} €`
    document.getElementById("indemniteMoisMoyenne").innerText = `${calculateMoyenneTableau(indemniteNetMoisTab).toFixed(1)} €`
    document.getElementById("PAMoisMoyenne").innerText = `${calculateMoyenneTableau(pouvoirAchatMoisTab).toFixed(1)} €`
}

// La fonction renvoie la moyenne des valeurs d'un tableau (utilisée pour les élements de la colonne Moyenne)
function calculateMoyenneTableau(tableau){
    let moy = 0
    tableau.forEach(value => moy += value)
    return moy / tableau.length
}

function calculImpotPeriodeME(i){
    const CAIndependantMois = CAFactureClientMois + honorairesDWMois
    let sumIndemnisationPeriodeME = 0
    for(let i = 0 ; i < ligneIndemnisationPeriode.length ; i++)
        if(selectInputs1[i].value == "ME") sumIndemnisationPeriodeME += ligneIndemnisationPeriode[i]
    const P23 = -calculBaremeProgressif("MEscenario", [CAIndependantMois, sumIndemnisationPeriodeME])[2] * 12
    if(ACREselects[i].value == "non"){
        const I23 = -calculBaremeProgressif("ME", CAIndependantMois)[2] * 12
        ligneImpotPeriode.push(P23 - I23) // ME!P29
    } 
    else {
        let revenusIndependantN5 = CAIndependantMois * 12 * 0.66 + sumIndemnisationPeriodeME
        let P26 = P23 / (revenusIndependantN5 + revenusConjoint)
        ligneImpotPeriode.push(J5 * P26) // J5 référence à Départ!J5, ME!P27
    }
}

function calculImpotPeriodeSASUMod1(){ // Calcul des impôts annuels SASU Mod 1
    const ISMois = RCAIMois > varISMois ? (-0.25 * (RCAIMois - varISMois) - 0.15 * varISMois) : (-0.15 * RCAIMois)
    const revenuNetAvantImpotMois = RCAIMois + ISMois
    const salaireNetAvantImpotMois = salaireNetAvantImpot_AssimileSalarie()
    let sumIndemnisationPeriodeSASUMod1 = 0
    for(let i = 0 ; i < ligneIndemnisationPeriode.length ; i++)
        if(selectInputs1[i].value == "SASUMod1") sumIndemnisationPeriodeSASUMod1 += ligneIndemnisationPeriode[i]
    let P19 = - calculBaremeProgressif("PFU", [salaireNetAvantImpotMois, revenuNetAvantImpotMois]) * 12
    let AD19 = - calculBaremeProgressif("PFUscenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, sumIndemnisationPeriodeSASUMod1]) * 12
    let AD23 = AD19 - P19
    let I21 = - calculBaremeProgressif("Mod1", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[2] * 12
    let W21 = - calculBaremeProgressif("Mod1scenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, sumIndemnisationPeriodeSASUMod1])[2] * 12
    let W23 = W21 - I21
    ligneImpotPeriode.push(Math.min(AD23, W23)) // SASU IS!Y27
}

function calculImpotPeriodeSASUMod2(){  // Calcul des impôts annuels SASU Mod 2
    const CSGMois = -0.097 * RCAIMois
    const revenuNetAvantImpotMois = RCAIMois + CSGMois
    const salaireNetAvantImpotMois = salaireNetAvantImpot_AssimileSalarie()
    let sumIndemnisationPeriodeSASUMod2 = 0
    for(let i = 0 ; i < ligneIndemnisationPeriode.length ; i++)
        if(selectInputs1[i].value == "SASUMod2") sumIndemnisationPeriodeSASUMod2 += ligneIndemnisationPeriode[i]
    let P20 = -calculBaremeProgressif("Mod2scenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, sumIndemnisationPeriodeSASUMod2])[2] * 12
    let I20 = -calculBaremeProgressif("Mod2", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[2] * 12
    ligneImpotPeriode.push(P20 - I20) // SASU IR!P22
}

function calculImpotPeriodeEURL(){  // Calcul des impôts annuels EURL
    const ISMois = RCAIMois > varISMois ? (-0.25 * (RCAIMois - varISMois) - 0.15 * varISMois) : (-0.15 * RCAIMois)
    const revenuNetAvantImpotMois = RCAIMois + ISMois
    const salaireNetAvantImpotMois = salaireNetAvantImpot_TNS()
    let sumIndemnisationPeriodeEURL = 0
    for(let i = 0 ; i < ligneIndemnisationPeriode.length ; i++)
        if(selectInputs1[i].value == "EURL") sumIndemnisationPeriodeEURL += ligneIndemnisationPeriode[i]
    let P21 = - calculBaremeProgressif("PFU", [salaireNetAvantImpotMois, revenuNetAvantImpotMois]) * 12
    let AD19 = - calculBaremeProgressif("PFUscenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, sumIndemnisationPeriodeEURL]) * 12
    let AD23 = AD19 - P21
    let I21 = - calculBaremeProgressif("EURL", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[2] * 12
    let W21 = - calculBaremeProgressif("EURLscenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, sumIndemnisationPeriodeEURL])[2] * 12
    let W23 = W21 - I21
    ligneImpotPeriode.push(Math.min(AD23, W23)) // EURL!Y27
}
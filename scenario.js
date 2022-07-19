const selectInputs1 = document.querySelectorAll(".selectInput1")
const nbMois = document.querySelectorAll(".nbMois")
const salairesMois = document.querySelectorAll(".salaireMois")
const cumulsPeriode = document.querySelectorAll(".cumulPeriode")
const selectInputs2 = document.querySelectorAll(".selectInput2")
const indemnitesNetMensuel = document.querySelectorAll(".indemniteNetMensuel")
const indemnitesNetPeriode = document.querySelectorAll(".indemniteNetPeriode")
const pouvoirAchatMois = document.querySelectorAll(".PAMois")
const pouvoirAchatPeriode = document.querySelectorAll(".PAPeriode")
const impotAnnuel = document.querySelectorAll(".impotAnnuelScenario")

const ACREselects = document.querySelectorAll(".ACREselect")
const fiscaliteSelects = document.querySelectorAll(".fiscaliteSelect")

const disabledARCE = document.querySelectorAll(".disabledARCE")
const disabledFiscalite = document.querySelectorAll(".disabledFiscalite")
const disabledARCE_droitsPE = document.querySelectorAll(".disabledARCE_droitsPE")
const disabledARE_droitsPE = document.querySelectorAll(".disabledARE_droitsPE")

let capitalInitial

document.getElementById("inputBrutPE").addEventListener("change", calculateShowData)
document.getElementById("inputIndemnitePE").addEventListener("change", calculateShowData)
selectInputs1.forEach(select => select.addEventListener("change", calculateShowData))
nbMois.forEach(select => select.addEventListener("change", calculateShowData))
selectInputs2.forEach(select => select.addEventListener("change", calculateShowData))
ACREselects.forEach(select => select.addEventListener("change", calculateShowData))
fiscaliteSelects.forEach(select => select.addEventListener("change", calculateShowData))


let ligneARCE
let ligneARE
let ligne5
let ligne6

function calculCapitalInitialEtJ5(){
    if(oldBrutPE < 54000) capitalInitial = oldBrutPE * 0.57 * dureeIndemnitePE / 12
    else capitalInitial = (dureeIndemnitePE <= 8) ? oldBrutPE * 0.57 * dureeIndemnitePE / 12 : (oldBrutPE * 0,57 * 8 / 12) + (oldBrutPE * 0,57 * 0,7 * (dureeIndemnitePE - 8) / 12)
    return capitalInitial * 12 / dureeIndemnitePE // Return Départ!J5
}

function calculLigneARCEetARE(){
    ligneARCE = [0, 0, 0, 0, 0]
    ligneARE = []
    for(let i = 0 ; i < 5 ; i++){
        if(selectInputs1[i].value != "ME") ACREselects[i].value = "non"
        if(selectInputs1[i].value != "ME") fiscaliteSelects[i].value = "non"
        if(ACREselects[i].value === "oui" && !ligneARCE.includes(1)) ligneARCE[i] = 1 // Si l'on sélectionne l'ARCE à la colonne i et qu'il n'a pas été sélecionné aux colonnes avant
        if(fiscaliteSelects[i].value == "oui") ligneARE.push(Math.min(nbMois[i].value, parseInt(dureeIndemnitePE - ligneARE.reduce((partialSum, a) => partialSum + a, 0))))
        else ligneARE.push(0)
    }
}

function calculateShowData(){
    let indemniteNetPeriodeTab = []
    let salaireMoisTab = []
    let impotAnnuelTab = []
    let pouvoirAchatMoisTab = []

    calculCapitalInitialEtJ5()
    calculLigneARCEetARE()

    ligne5 = []
    ligne6 = [] // Réinitialisation des valeurs pour chaque changement de valeur

    for(let i = 0 ; i < 5 ; i++){
        disabledARCE[i].disabled = true
        disabledFiscalite[i].disabled = true // On empêche la sélection de l'ARCE et de la fiscalité si l'on n'est pas dans ME
        disabledARCE_droitsPE[i].disabled = true
        disabledARE_droitsPE[i].disabled = true // On empêche la sélection de l'ARCE et de l'ARE pour les droits Pôle Emploi

        if(selectInputs1[i].value == "PS"){
            selectInputs2[i].value = "aucun"
            
            createFichePaie()
            salaireMoisTab.push(sendDataSimplifiee()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodePS(i))
            impotAnnuelTab.push(calculImpotAnnuelPS(i, indemniteNetPeriodeTab))
        }

        if(selectInputs1[i].value == "ME"){
            disabledARCE[i].disabled = false
            disabledFiscalite[i].disabled = false
            disabledARCE_droitsPE[i].disabled = false // On réactive la possibilité de sélectionner l'ARCE, la fiscalité et l'ARCE Pôle Emploi
            if(selectInputs2[i].value == "ARE") selectInputs2[i].value = "aucun"

            salaireMoisTab.push(afficherDataME("scenario", i)[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeME(i))
            impotAnnuelTab.push(calculImpotAnnuelME(i, indemniteNetPeriodeTab))
        }

        if(selectInputs1[i].value == "SASUMod1"){
            disabledARCE_droitsPE[i].disabled = false
            disabledARE_droitsPE[i].disabled = false
            
            salaireMoisTab.push(afficherDataMod1()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeSASUMod1(i))
            impotAnnuelTab.push(calculImpotAnnuelSASUMod1(i, indemniteNetPeriodeTab))
        }
        
        if(selectInputs1[i].value == "SASUMod2"){
            disabledARCE_droitsPE[i].disabled = false
            if(selectInputs2[i].value == "ARE") selectInputs2[i].value = "aucun"

            salaireMoisTab.push(afficherDataMod2()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeSASUMod2(i))
            impotAnnuelTab.push(calculImpotAnnuelSASUMod2(i, indemniteNetPeriodeTab))
        }

        if(selectInputs1[i].value == "EURL"){
            disabledARCE_droitsPE[i].disabled = false
            disabledARE_droitsPE[i].disabled = false

            salaireMoisTab.push(afficherDataEURL()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeEURL(i))
            impotAnnuelTab.push(calculImpotAnnuelEURL(i, indemniteNetPeriodeTab))
        }

        let cumulPeriode = salaireMoisTab[i] * parseInt(nbMois[i].value)
        let pouvoirAchatPeriodeValue = cumulPeriode + indemniteNetPeriodeTab[i] - (impotAnnuelTab[i] * parseInt(nbMois[i].value) / 12)
        pouvoirAchatMoisTab.push(pouvoirAchatPeriodeValue / parseInt(nbMois[i].value))

        salairesMois[i].innerText = `${salaireMoisTab[i].toFixed(1)} €`
        cumulsPeriode[i].innerText = `${cumulPeriode.toFixed(1)} €`
        indemnitesNetPeriode[i].innerText = `${indemniteNetPeriodeTab[i].toFixed(1)} €`
        indemnitesNetMensuel[i].innerText = `${(indemniteNetPeriodeTab[i] / parseInt(nbMois[i].value)).toFixed(1)} €`
        pouvoirAchatMois[i].innerText = `${pouvoirAchatMoisTab[i].toFixed(1)} €`
        impotAnnuel[i].innerText = `${impotAnnuelTab[i].toFixed(1)} €`
        pouvoirAchatPeriode[i].innerText = `${pouvoirAchatPeriodeValue.toFixed(1)} €`

        if(selectInputs1[i].value == "rien"){
            salairesMois[i].innerText = `0 €`
            cumulsPeriode[i].innerText = `0 €`
            indemnitesNetPeriode[i].innerText = `0 €`
        }
    }

    // Colonne Moyenne
    const totalMoisScenario = parseInt(nbMois[0].value) + parseInt(nbMois[1].value) + parseInt(nbMois[2].value) + parseInt(nbMois[3].value) + parseInt(nbMois[4].value)
    document.getElementById("totalMoisScenario").innerText = `${totalMoisScenario} mois`
    document.getElementById("salaireMoisMoyenne").innerText = `${calculateMoyenneTableau(salaireMoisTab).toFixed(1)} €`
    document.getElementById("indemniteMoisMoyenne").innerText = `${calculateMoyenneTableau(indemniteNetPeriodeTab).toFixed(1)} €`
    document.getElementById("PAMoisMoyenne").innerText = `${calculateMoyenneTableau(pouvoirAchatMoisTab).toFixed(1)} €`

    console.log("ligne5 : " + ligne5);
    console.log("ligne6 : " + ligne6);
    console.log("impotAnnuelTab : " + impotAnnuelTab)
}

// Renvoie la moyenne des valeurs d'un tableau pour la colonne Moyenne
function calculateMoyenneTableau(tableau){
    let moy = 0
    tableau.forEach(value => moy += value)
    return moy / tableau.length
}

function calculIndemniteNetPeriodePS(i){ // Calcul des indémnités Net Période Portage Salarial
    
}

function calculIndemniteNetPeriodeME(i){ // Calcul des indémnités Net Période Micro Entreprise
    
}

function calculIndemniteNetPeriodeSASUMod1(i){ // Calcul des indémnités Net Période SASU Mod 1
    
}

function calculIndemniteNetPeriodeSASUMod2(i){ // Calcul des indémnités Net Période SASU Mod 2
    
}

function calculIndemniteNetPeriodeEURL(i){ // Calcul des indémnités Net Période EURL
    
}


// A compléter
function calculImpotAnnuelPS(i, indemniteNetPeriodeTab){ // Calcul des impôts annuels Portage Salarial
    if(indemniteNetPeriodeTab[i] == 0) return 0
    let indemniteNetTotal = indemniteNetPeriodeTab.reduce((partialSum, a) => partialSum + a, 0) // Calcul de la somme des indémnités net

    let I71 = calculBaremeProgressif("PS")[2]
    let O71 = calculBaremeProgressif("PSscenario", indemniteNetTotal)[2]
    return O71 - I71 // BSsansGF_O73
}

function calculImpotAnnuelME(i, indemniteNetPeriodeTab){ // Calcul des impôts annuels Micro Entreprise
    if(indemniteNetPeriodeTab[i] == 0) return 0
    let indemniteNetTotal = indemniteNetPeriodeTab.reduce((partialSum, a) => partialSum + a, 0) // Calcul de la somme des indémnités net

    const CAClientMois = nbJoursTravailAn * TJM / 12 // ME!C28
    const honorairesMois = -CAClientMois * honoraires / 100  // ME!C29
    const CAIndependantMois = CAClientMois + honorairesMois
    let W24 = calculBaremeProgressif("MEScenario", [CAIndependantMois, indemniteNetTotal])[2]

    if(fiscaliteSelects[i].value == "oui"){ // Si l'on accepte la fiscalité dans la colonne
        let U6 = CAIndependantMois * 0.66 * 12 + indemniteNetTotal
        let W27 = W24 / (U6 + revenusConjoint)
        return calculCapitalInitialEtJ5() * W27 // ME!W28
    } else { // Si l'on n'accepte pas la fiscalité dans la colonne
        let P24 = calculBaremeProgressif("ME", CAIndependantMois)[2]
        return W24 - P24 //ME!W30
    }
}

function calculImpotAnnuelSASUMod1(i, indemniteNetPeriodeTab){ // Calcul des impôts annuels SASU Mod 1
    if(indemniteNetPeriodeTab[i] == 0) return 0
    let indemniteNetTotal = indemniteNetPeriodeTab.reduce((partialSum, a) => partialSum + a, 0) // Calcul de la somme des indémnités net

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

    let AJ19 = calculBaremeProgressif("PFUScenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, indemniteNetTotal])[0]
    let V19 = calculBaremeProgressif("PFU", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[0]
    let AJ23 = AJ19 - V19

    let AC21 = calculBaremeProgressif("Mod1Scenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, indemniteNetTotal])[2]
    let O21 = calculBaremeProgressif("Mod1", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[2] 
    let AC23 = AC21 - O21
    return Math.min(AJ23, AC23) // SASU IS!AD27
}

function calculImpotAnnuelSASUMod2(i, indemniteNetPeriodeTab){  // Calcul des impôts annuels SASU Mod 2
    if(indemniteNetPeriodeTab[i] == 0) return 0
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
    let W20 = calculBaremeProgressif("Mod2Scenario", [salaireNetAvantImpotMois, revenuNetAvantImpotMois, indemniteNetTotal])[2]
    let P20 = calculBaremeProgressif("Mod2", [salaireNetAvantImpotMois, revenuNetAvantImpotMois])[2]
    return W20 - P20 // SASU IR!W22
}

// A compléter
function calculImpotAnnuelEURL(i, indemniteNetPeriodeTab){  // Calcul des impôts annuels EURL
    if(indemniteNetPeriodeTab[i] == 0) return 0
    // return ??
    return 7051.08
}
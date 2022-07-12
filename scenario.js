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
const capitalJour = 23

// calculateShowData()

document.getElementById("inputBrutPE").addEventListener("change", calculateShowData)
document.getElementById("inputIndemnitePE").addEventListener("change", calculateShowData)
selectInputs1.forEach(select => select.addEventListener("change", calculateShowData))
nbMois.forEach(select => select.addEventListener("change", calculateShowData))
selectInputs2.forEach(select => select.addEventListener("change", calculateShowData))
ACREselects.forEach(select => select.addEventListener("change", calculateShowData))
fiscaliteSelects.forEach(select => select.addEventListener("change", calculateShowData))


let ligne3
let ligne4
let ligne5
let ligne6

function calculateShowData(){
    let indemniteNetPeriodeTab = []
    let salaireMoisTab = []
    let impotAnnuelTab = []
    if(oldBrutPE < 54000) capitalInitial = oldBrutPE * 0.57 * dureeIndemnitePE / 12
    else capitalInitial = (dureeIndemnitePE <= 8) ? oldBrutPE * 0.57 * dureeIndemnitePE / 12 : (oldBrutPE * 0,57 * 8 / 12) + (oldBrutPE * 0,57 * 0,7 * (dureeIndemnitePE - 8) / 12)

    ligne3 = []
    ligne4 = []
    ligne5 = []
    ligne6 = [] // Réinitialisation des valeurs pour chaque changement de valeur

    for(let i = 0 ; i < 5 ; i++){
        disabledARCE[i].disabled = true
        disabledFiscalite[i].disabled = true
        disabledARCE_droitsPE[i].disabled = true
        disabledARE_droitsPE[i].disabled = true // On désélectionne le ARCE et Fiscalité pour ME et on désélectionne ARCE et ARE pour les droits Pôle Emploi

        if(selectInputs1[i].value == "PS"){
            ACREselects[i].value = "non"
            fiscaliteSelects[i].value = "non"
            selectInputs2[i].value = "aucun"

            createFichePaie()
            salaireMoisTab.push(sendDataSimplifiee()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodePS(i))
            impotAnnuelTab.push(calculImpotAnnuelPS(indemniteNetPeriodeTab[i]))
        }

        if(selectInputs1[i].value == "ME"){
            disabledARCE[i].disabled = false
            disabledFiscalite[i].disabled = false
            disabledARCE_droitsPE[i].disabled = false
            if(selectInputs2[i].value == "ARE") selectInputs2[i].value = "aucun"
            
            salaireMoisTab.push(afficherDataME("scenario", i)[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeME(i))
            impotAnnuelTab.push(calculImpotAnnuelME(i, indemniteNetPeriodeTab[i]))
        }

        if(selectInputs1[i].value == "SASUMod1"){
            disabledARCE_droitsPE[i].disabled = false
            disabledARE_droitsPE[i].disabled = false
            ACREselects[i].value = "non"
            fiscaliteSelects[i].value = "non"
            
            salaireMoisTab.push(afficherDataMod1()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeSASUMod1(i))
            impotAnnuelTab.push(calculImpotAnnuelSASUMod1(indemniteNetPeriodeTab[i]))
        }
        
        if(selectInputs1[i].value == "SASUMod2"){
            disabledARCE_droitsPE[i].disabled = false
            ACREselects[i].value = "non"
            fiscaliteSelects[i].value = "non"
            if(selectInputs2[i].value == "ARE") selectInputs2[i].value = "aucun"

            salaireMoisTab.push(afficherDataMod2()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeSASUMod2(i))
            impotAnnuelTab.push(calculImpotAnnuelSASUMod2(indemniteNetPeriodeTab[i]))
        }

        if(selectInputs1[i].value == "EURL"){
            ACREselects[i].value = "non"
            fiscaliteSelects[i].value = "non"
            disabledARCE_droitsPE[i].disabled = false
            disabledARE_droitsPE[i].disabled = false
            salaireMoisTab.push(afficherDataEURL()[1])
            indemniteNetPeriodeTab.push(calculIndemniteNetPeriodeEURL(i))
            impotAnnuelTab.push(calculImpotAnnuelEURL(indemniteNetPeriodeTab[i]))
        }

        let cumulPeriode = salaireMoisTab[i] * parseInt(nbMois[i].value)
        let pouvoirAchatPeriodeValue = cumulPeriode + indemniteNetPeriodeTab[i] - (impotAnnuelTab[i] * parseInt(nbMois[i].value) / 12)
        
        salairesMois[i].innerText = `${salaireMoisTab[i].toFixed(1)} €`
        cumulsPeriode[i].innerText = `${cumulPeriode.toFixed(1)} €`
        indemnitesNetPeriode[i].innerText = `${indemniteNetPeriodeTab[i].toFixed(1)} €`
        indemnitesNetMensuel[i].innerText = `${(indemniteNetPeriodeTab[i] / parseInt(nbMois[i].value)).toFixed(1)} €`
        pouvoirAchatMois[i].innerText = `${(pouvoirAchatPeriodeValue / parseInt(nbMois[i].value)).toFixed(1)} €`
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

    console.log("ligne3 : " + ligne3);
    console.log("ligne4 : " + ligne4);
    console.log("ligne5 : " + ligne5);
    console.log("ligne6 : " + ligne6);
}

// Renvoie la moyenne des valeurs d'un tableau pour la colonne Moyenne
function calculateMoyenneTableau(tableau){
    let moy = 0
    tableau.forEach(value => moy += value)
    return moy / tableau.length
}

// Les cinq fonctions suivantes calculent les indémnités net Période
function calculIndemniteNetPeriodePS(i){
    if(i == 0){
        ligne3.push(0)
        ligne4.push(0)
        ligne5.push(capitalJour - parseInt(nbMois[i].value))
        ligne6.push(capitalJour - parseInt(nbMois[i].value))
        return 0
    }
    ligne3.push(0)
    ligne4.push(0)
    ligne5.push(Math.max(ligne5[i-1] - parseInt(nbMois[i].value), 0))
    ligne6.push(ligne6[i-1] == 0 ? 0 : ligne5[i-1])
    return 0
}

function calculIndemniteNetPeriodeME(i){
    if(i == 0){
        ligne3.push(capitalInitial * 0.45)
        ligne4.push(0)
        ligne5.push(selectInputs2[0].value == "ARCE" ? capitalJour * 0.55 : capitalJour - parseInt(nbMois[i].value))
        ligne6.push(selectInputs2[0].value == "ARCE" ? capitalJour * 0.55 : capitalJour - parseInt(nbMois[i].value))
        return ligne3[0]
    }
    ligne4.push(0)
    ligne5.push(Math.max(ligne5[i-1] - parseInt(nbMois[i].value), 0))
    ligne6.push(ligne6[i-1] == 0 ? 0 : ligne5[i-1])
    let ligne3Value = 0
    if(selectInputs2[i].value == "ARCE"){
        for(let j = 0 ; j < i ; j++) ligne3Value += ligne3[j] + ligne4[j]
        ligne3Value = (capitalInitial - ligne3Value) * 0.45
    }
    ligne3.push(ligne3Value)
    return ligne3[i]
}

function calculIndemniteNetPeriodeSASUMod1(i){
    if(i == 0){
        ligne3.push(0)
        ligne5.push(selectInputs2[0].value == "ARCE" ? capitalJour * 0.55 : capitalJour - parseInt(nbMois[i].value))
        ligne6.push(capitalJour - parseInt(nbMois[i].value))
        ligne4.push((selectInputs2[i].value == "ARE" && capitalJour - ligne6[0] > 0) ? (capitalJour - ligne6[0]) * capitalInitial / capitalJour : 0)
        return ligne4[0]
    }
    ligne3.push(0)
    ligne5.push(Math.max(ligne5[i-1] - parseInt(nbMois[i].value), 0))
    ligne6.push(ligne6[i-1] == 0 ? 0 : Math.max(ligne6[i-1] - parseInt(nbMois[i].value), 0))
    let ligne4Value = 0
    if(selectInputs2[i].value == "ARE" && ligne6[i-1] - ligne6[i] > 0){
        for(let j = 0 ; j < i ; j++) {
            ligne4Value += (ligne3[j] + ligne4[j])
        }
        console.log(ligne4Value, capitalInitial, ligne6[i-1]);
        ligne4Value = (capitalInitial - ligne4Value)/ligne6[i-1] * (ligne6[i-1] - ligne6[i])
    }
    ligne4.push(ligne4Value)
    return ligne4[i]
}

function calculIndemniteNetPeriodeSASUMod2(i){
    if(i == 0){
        ligne3.push(0)
        ligne4.push(0)
        ligne5.push(selectInputs2[0].value == "ARCE" ? capitalJour * 0.55 : capitalJour - parseInt(nbMois[i].value))
        ligne6.push(selectInputs2[0].value == "ARCE" ? capitalJour * 0.55 : capitalJour - parseInt(nbMois[i].value))
        return 0
    }
    ligne3.push(0)
    ligne4.push(0)
    ligne5.push(Math.max(ligne5[i-1] - parseInt(nbMois[i].value), 0))
    ligne6.push(ligne6[i-1] == 0 ? 0 : ligne5[i-1])
    return 0
}

function calculIndemniteNetPeriodeEURL(i){
    if(i == 0){
        ligne3.push(0)
        ligne4.push(0)
        ligne5.push(selectInputs2[0].value == "ARCE" ? capitalJour * 0.55 : capitalJour - parseInt(nbMois[i].value))
        ligne6.push(selectInputs2[0].value == "ARCE" ? capitalJour * 0.55 : capitalJour - parseInt(nbMois[i].value))
        return 0
    }
    ligne3.push(0)
    ligne4.push(0)
    ligne5.push(Math.max(ligne5[i-1] - parseInt(nbMois[i].value), 0))
    ligne6.push(ligne6[i-1] == 0 ? 0 : ligne5[i-1])
    return 0
}

// Les cinq fonctions suivantes calculent les impôts annuels
// A compléter
function calculImpotAnnuelPS(indemniteNetPeriodeValue){
    if(indemniteNetPeriodeValue == 0) return 0
    // return BSsansGF_O73
    return 7051.08
}

function calculImpotAnnuelME(i, indemniteNetPeriodeValue){
    if(indemniteNetPeriodeValue == 0) return 0
    // return (fiscaliteSelects[i].value == "oui") ? ME_W28 : ME_W30
    return 7051.08
}

function calculImpotAnnuelSASUMod1(indemniteNetPeriodeValue){
    if(indemniteNetPeriodeValue == 0) return 0
    // return SASUIS_AD27
    return 7051.08
}

function calculImpotAnnuelSASUMod2(indemniteNetPeriodeValue){
    if(indemniteNetPeriodeValue == 0) return 0
    // return SASUIR_W22
    return 7051.08
}

// A compléter
function calculImpotAnnuelEURL(indemniteNetPeriodeValue){
    if(indemniteNetPeriodeValue == 0) return 0
    // return ??
    return 7051.08
}
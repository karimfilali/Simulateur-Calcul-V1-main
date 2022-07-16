// Récupération des différentes tables
const tableBulletinSalaire = document.getElementById("tableBulletinSalaire")
const tableME = document.getElementById("tableME")
const tableMod1 = document.getElementById("tableMod1")
const tableMod2 = document.getElementById("tableMod2")
const tableEURL = document.getElementById("tableEURL")
const tableScenario = document.getElementById("tableScenario")
const calculTJMTable = document.getElementById("calculTJMTable")

const simulationSelect = document.getElementById("simulation-select") // Select qui permet de sélectionner Comparer, Afficher, Scénario, calculTJM

// Toutes les entrées
const inputTJM = document.getElementById("inputTJM")
const inputNbJoursTravailAn = document.getElementById("inputNbJoursTravailAn")
const inputPouvoirAchatSouhaite = document.getElementById("inputPAsouhaiteTJM")
const inputAchatSociete = document.getElementById("inputAchatSociete")
const inputFraisRepas = document.getElementById("inputFraisRepas")
const inputFraisDeplacements = document.getElementById("inputFraisDeplacements")
const inputRevenuConsultantBrut = document.getElementById("inputRevenuConsultantBrut")
const inputNbParts = document.getElementById("inputNbParts")
const inputRevenusConjoint = document.getElementById("inputRevenusConjoint")
const inputHonoraires = document.getElementById("inputHonoraires")
const inputBrutPE = document.getElementById("inputBrutPE")
const inputIndemnitePE = document.getElementById("inputIndemnitePE")

const ACREInput = document.getElementById("ACREinput")
const fiscaliteInput = document.getElementById("fiscaliteInput")

const submitBtnCalculate = document.getElementById("submitBtnCalculate") // Bouton de calcul du comparatif
const submitBtnCalculateTJM = document.getElementById("submitBtnCalculateTJM") // Bouton de calcul du TJM

const selectDetails = document.getElementById("selectDetails") // Select qui permet de sélectionner PS, ME, SASU ou EURL dans le cas de l'affichage du bulletin de paie simplifié

let valueACREinput
let valueFiscaliteInput

let valueACRE_affiche
let valuePrelevementLiberatoire_affiche

let TJM
let nbJoursTravailAn
let budget
let pouvoirAchatSouhaite
let achatSociete
let fraisRepas
let fraisDeplacements
let revenuConsultantBrut
let nbParts
let revenusConjoint
let honoraires
let oldBrutPE
let dureeIndemnitePE

let nbJoursTravailMois
let fraisProfessionnels
let salaireBrut
let garantieFinanciere

let garantieFinanciereChecked

const varISMois = 38120/12


function getInputData(){
    TJM = parseInt(inputTJM.value)
    nbJoursTravailAn = parseInt(inputNbJoursTravailAn.value)
    nbJoursTravailMois = nbJoursTravailAn / 12
    honoraires = parseInt(inputHonoraires.value)
    budget = TJM * nbJoursTravailMois * (1 - honoraires / 100)
    console.log("CA Prévisionnel : " + budget);
    pouvoirAchatSouhaite = parseInt(inputPouvoirAchatSouhaite.value)
    achatSociete = parseInt(inputAchatSociete.value)
    fraisRepas = parseInt(inputFraisRepas.value)
    fraisDeplacements = parseInt(inputFraisDeplacements.value)
    revenuConsultantBrut = parseInt(inputRevenuConsultantBrut.value)
    nbParts = parseInt(inputNbParts.value)
    revenusConjoint = parseInt(inputRevenusConjoint.value) * 0.71
    oldBrutPE = parseInt(inputBrutPE.value)
    dureeIndemnitePE = parseInt(inputIndemnitePE.value)
    fraisProfessionnels = achatSociete / 12 + fraisRepas

    garantieFinanciereChecked = document.getElementById("inputGarantieFinanciere").checked
    garantieFinanciere = garantieFinanciereChecked ? 10 : 0

    valueACREinput = (ACREInput.value === "oui")
    valueFiscaliteInput = (fiscaliteInput.value === "oui")

    valueACRE_affiche = (ACRE.value === "oui")
    valuePrelevementLiberatoire_affiche = (fiscalite.value === "oui")
}

document.querySelectorAll(".inputInput").forEach(input => input.addEventListener("change", () => {
    if(simulationSelect.value == "affiche"){
        showDetailedTables()
    }
}))

simulationSelect.addEventListener("change", () => {
    document.getElementById("tableBulletinSalaire").style.display = 'none'
    document.getElementById("tableME").style.display = 'none'
    document.getElementById("tableMod1").style.display = 'none'
    document.getElementById("tableMod2").style.display = 'none'
    document.getElementById("tableEURL").style.display = 'none'
    document.getElementById("tableScenario").style.display = 'none'
    document.getElementById("calculTJMTable").style.display = 'none'
    document.getElementById("checkInputBox").style.display = 'none'
    document.getElementById("tableSimplifiee").style.display = 'none'
    document.getElementById("inputsCompare").style.display = 'none'
    document.getElementById("garantieFinanciereInput").style.display = 'none' // Masquer le choix de la garantie financiere
    document.getElementById("submitBtnCalculate").style.display = 'none'
    submitBtnCalculateTJM.style.display = 'none'
    document.getElementById("inputsScenario").style.display = 'none'
    document.getElementById("PAsouhaiteTJM").style.display = 'none'
    document.getElementById("ACRE_TJM").style.display = 'none'
    document.getElementById("fiscaliteTJM").style.display = 'none'
    
    if(simulationSelect.value == "compare"){
        document.getElementById("inputsCompare").style.display = 'block'
        document.getElementById("facturationTJM").style.display = 'flex'
        document.getElementById("inputGarantieFinanciere").checked = false // Décocher la case si elle a été cochée dans l'affichage
        document.getElementById("ACRE_TJM").style.display = 'flex'
        document.getElementById("fiscaliteTJM").style.display = 'flex'
        document.getElementById("submitBtnCalculate").style.display = 'block'
    }
    if(simulationSelect.value == "affiche"){
        document.getElementById("inputsCompare").style.display = 'block'
        document.getElementById("facturationTJM").style.display = 'flex'
        document.getElementById("garantieFinanciereInput").style.display = 'flex'
        document.getElementById("checkInputBox").style.display = 'block'
        document.getElementById("selectDetails").value = 'choose'
    }
    if(simulationSelect.value == "scenario"){ // Si 'Afficher le scénario' est sélectionné
        document.getElementById("inputsCompare").style.display = 'block'
        document.getElementById("facturationTJM").style.display = 'flex'
        document.getElementById("tableScenario").style.display = 'block'
        document.getElementById("inputsScenario").style.display = 'block'
        
        getInputData()
        calculateShowData()
    }
    if(simulationSelect.value == "calculTJM"){ // Si 'Afficher le scénario' est sélectionné
        document.getElementById("inputsCompare").style.display = 'block'
        document.getElementById("garantieFinanciereInput").checked = false // Décocher la case si elle a été cochée dans l'affichage
        submitBtnCalculateTJM.style.display = 'block'
        document.getElementById("facturationTJM").style.display = 'none'
        document.getElementById("PAsouhaiteTJM").style.display = 'flex'
        document.getElementById("ACRE_TJM").style.display = 'flex'
        document.getElementById("fiscaliteTJM").style.display = 'flex'
        document.getElementById("budgetTJM").style.display = 'none'
    }
})

submitBtnCalculate.addEventListener("click", () => {
    getInputData()
    
    let PSOutputs = createFichePaie()
    let MEOutputs = afficherDataME("compare")
    let SASUMod1Outputs = afficherDataMod1()
    let SASUMod2Outputs = afficherDataMod2()
    let EURLOutputs = afficherDataEURL()

    let valuesToTri = [PSOutputs, MEOutputs, SASUMod1Outputs, SASUMod2Outputs, EURLOutputs]
    displayValuesTri(valuesToTri)

    document.querySelectorAll(".CA_S").forEach(CA => {
        CAFactureClientMois = nbJoursTravailAn * TJM / 12
        CA.innerText = `${CAFactureClientMois.toFixed(0)} €`
    })

    document.getElementById("tableSimplifiee").style.display = 'block'
})

submitBtnCalculateTJM.addEventListener("click", () => {
    getInputData()

    calculTJMFromBudget()
    calculTJMTable.style.display = 'block'

    
})

function displayValuesTri(values){
    values.sort((x, y) => y[2] - x[2])
    document.getElementById("A1").innerText = values[0][0]
    document.getElementById("pAchat1").innerText = `${values[0][1].toFixed(0)} €`
    document.getElementById("rendement1").innerText = `${values[0][2].toFixed(1)} %`

    document.getElementById("A2").innerText = values[1][0]
    document.getElementById("pAchat2").innerText = `${values[1][1].toFixed(0)} €`
    document.getElementById("rendement2").innerText = `${values[1][2].toFixed(1)} %`
    
    document.getElementById("A3").innerText = values[2][0]
    document.getElementById("pAchat3").innerText = `${values[2][1].toFixed(0)} €`
    document.getElementById("rendement3").innerText = `${values[2][2].toFixed(1)} %`
    
    document.getElementById("A4").innerText = values[3][0]
    document.getElementById("pAchat4").innerText = `${values[3][1].toFixed(0)} €`
    document.getElementById("rendement4").innerText = `${values[3][2].toFixed(1)} %`
    
    document.getElementById("A5").innerText = values[4][0]
    document.getElementById("pAchat5").innerText = `${values[4][1].toFixed(0)} €`
    document.getElementById("rendement5").innerText = `${values[4][2].toFixed(1)} %`
}

selectDetails.addEventListener("change", showDetailedTables)

function showDetailedTables(){
    getInputData()
    if(selectDetails.value == "PS"){
        createFichePaie()
        tableBulletinSalaire.style.display = 'block'
    } else tableBulletinSalaire.style.display = 'none'

    if(selectDetails.value == "ME"){
        tableME.style.display = 'block'
        afficherDataME("affiche")
    } else tableME.style.display = 'none'

    if(selectDetails.value == "SASUMod1"){
        tableMod1.style.display = 'block'
        afficherDataMod1()
    } else tableMod1.style.display = 'none'

    if(selectDetails.value == "SASUMod2"){
        tableMod2.style.display = 'block'
        afficherDataMod2()
    } else tableMod2.style.display = 'none'

    if(selectDetails.value == "EURL"){
        tableEURL.style.display = 'block'
        afficherDataEURL()
    } else tableEURL.style.display = 'none'
}
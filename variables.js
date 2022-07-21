// Récupération des différentes tables
const tableBulletinSalaire = document.getElementById("tableBulletinSalaire")
const tableME = document.getElementById("tableME")
const tableMod1 = document.getElementById("tableMod1")
const tableMod2 = document.getElementById("tableMod2")
const tableEURL = document.getElementById("tableEURL")
const tableScenario = document.getElementById("tableScenario")
const tableComparatifSimplifie = document.getElementById("tableComparatifSimplifie")
const calculTJMTable = document.getElementById("calculTJMTable")
const tableMeilleurRegime = document.getElementById("tableMeilleurRegime")

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
const submitBtnMeilleurRegime = document.getElementById("submitBtnMeilleurRegime") // Bouton de calcul du meilleur régime

const selectDetails = document.getElementById("selectDetails") // Select qui permet de sélectionner PS, ME, SASU ou EURL dans le cas de l'affichage du bulletin de paie simplifié
const meilleurRegimeChart = document.getElementById("meilleurRegimeChart")

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

const varISMois = 38120 / 12

function getInputData(situation = []){ // Permet de récupérer toutes les données d'entrée et de calculer le CA prévisionnel, la garantie Financière et les frais professionnels
    if(situation[0] != "calculMeilleurRegime") TJM = parseInt(inputTJM.value) // Dans tous les cas, on récupère le TJM en entrée
    else TJM = situation[1] // Dans le cas calculMeilleurRegime, on ne récupère pas le TJM en entrée. situation[1] correspond au TJM fictif
    nbJoursTravailAn = parseInt(inputNbJoursTravailAn.value)
    nbJoursTravailMois = nbJoursTravailAn / 12
    honoraires = parseInt(inputHonoraires.value)
    budget = TJM * nbJoursTravailMois * (1 - honoraires / 100)
    pouvoirAchatSouhaite = parseInt(inputPouvoirAchatSouhaite.value) // Pouvoir d'achat souhaité dans le cas calcul du TJM
    achatSociete = parseInt(inputAchatSociete.value)
    fraisRepas = parseInt(inputFraisRepas.value)
    fraisDeplacements = parseInt(inputFraisDeplacements.value)
    revenuConsultantBrut = parseInt(inputRevenuConsultantBrut.value)
    nbParts = parseInt(inputNbParts.value)
    revenusConjoint = parseInt(inputRevenusConjoint.value) * 0.71

    oldBrutPE = parseInt(inputBrutPE.value) // Partie Scénario
    dureeIndemnitePE = parseInt(inputIndemnitePE.value) // Partie Scénario
    
    fraisProfessionnels = achatSociete / 12 + fraisRepas // Utilisé dans le calcul de la fiche de paie Portage Salarial

    garantieFinanciere = document.getElementById("inputGarantieFinanciere").checked ? 10 : 0 // 10% si la case garantie financière a été cochée, 0% sinon.

    valueACREinput = (ACREInput.value === "oui")
    valueFiscaliteInput = (fiscaliteInput.value === "oui")

    valueACRE_affiche = (ACRE.value === "oui")
    valuePrelevementLiberatoire_affiche = (fiscalite.value === "oui")
}

simulationSelect.addEventListener("change", () => { // Lorsque l'on choisit une option dans la liste de départ
    tableBulletinSalaire.style.display = 'none'
    tableME.style.display = 'none'
    tableMod1.style.display = 'none'
    tableMod2.style.display = 'none'
    tableEURL.style.display = 'none'
    tableScenario.style.display = 'none'
    calculTJMTable.style.display = 'none'
    document.getElementById("checkInputBox").style.display = 'none'
    tableComparatifSimplifie.style.display = 'none'
    tableMeilleurRegime.style.display = 'none'
    document.getElementById("inputsCompare").style.display = 'none'
    document.getElementById("garantieFinanciereInput").style.display = 'none' // Masquer le choix de la garantie financiere
    submitBtnCalculate.style.display = 'none'
    submitBtnCalculateTJM.style.display = 'none'
    submitBtnMeilleurRegime.style.display = 'none'
    document.getElementById("inputsScenario").style.display = 'none'
    document.getElementById("PAsouhaiteTJM").style.display = 'none'
    document.getElementById("ACRE_TJM").style.display = 'none'
    document.getElementById("fiscaliteTJM").style.display = 'none'
    meilleurRegimeChart.style.display = 'none'
    
    if(simulationSelect.value == "compare"){ // Si 'Comparer les différents status juridiques' est sélectionné
        document.getElementById("inputsCompare").style.display = 'block'
        document.getElementById("facturationTJM").style.display = 'flex'
        document.getElementById("inputGarantieFinanciere").checked = false // Décocher la case si elle a été cochée dans l'affichage
        document.getElementById("ACRE_TJM").style.display = 'flex'
        document.getElementById("fiscaliteTJM").style.display = 'flex'
        submitBtnCalculate.style.display = 'block'
    }
    if(simulationSelect.value == "affiche"){ // Si 'Connaître les détails d'un bulletin de paie d'un statut juridique' est sélectionné
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
        calculateScenario()
    }
    if(simulationSelect.value == "calculTJM"){ // Si 'Calculer son TJM' est sélectionné
        document.getElementById("inputsCompare").style.display = 'block'
        document.getElementById("garantieFinanciereInput").checked = false // Décocher la case si elle a été cochée dans l'affichage
        submitBtnCalculateTJM.style.display = 'block'
        document.getElementById("facturationTJM").style.display = 'none'
        document.getElementById("PAsouhaiteTJM").style.display = 'flex'
        document.getElementById("ACRE_TJM").style.display = 'flex'
        document.getElementById("fiscaliteTJM").style.display = 'flex'
    }
    if(simulationSelect.value == "meilleurRegime"){ // Si 'Calculer le meilleur régime' est sélectionné
        document.getElementById("inputsCompare").style.display = 'block'
        document.getElementById("facturationTJM").style.display = 'none'
        document.getElementById("inputGarantieFinanciere").checked = false // Décocher la case si elle a été cochée dans l'affichage
        document.getElementById("ACRE_TJM").style.display = 'flex'
        document.getElementById("fiscaliteTJM").style.display = 'flex'
        submitBtnMeilleurRegime.style.display = 'block'
    }
})

submitBtnCalculate.addEventListener("click", () => {
    getInputData() // Récupération des données en entrées et calcul du CA prévisionnel
    
    let PSOutputs = createFichePaie()
    let MEOutputs = afficherDataME("compare")
    let SASUMod1Outputs = afficherDataMod1()
    let SASUMod2Outputs = afficherDataMod2()
    let EURLOutputs = afficherDataEURL() // Calcul des différents rendements et pouvoirs d'achats

    let valuesToTri = [PSOutputs, MEOutputs, SASUMod1Outputs, SASUMod2Outputs, EURLOutputs] // Liste contenant tous les rendements et pouvoirs d'achats
    displayValuesTri(valuesToTri) // Tri des éléments de la liste selon un rendement décroissant

    document.querySelectorAll(".CA_S").forEach(CA => {
        CAFactureClientMois = nbJoursTravailAn * TJM / 12
        CA.innerText = `${CAFactureClientMois.toFixed(0)} €` // Affichage du chiffre d'affaire dans chaque case de la ligne 'Chiffre d'affaires'
    })

    tableComparatifSimplifie.style.display = 'block' // Affichage de la table comparative des statuts rangés par colonne triés selon un rendement décroissant
})

function displayValuesTri(values){
    values.sort((x, y) => y[2] - x[2]) // Cette ligne permet de trier les rendements de chaque statut juridique
    document.getElementById("A1").innerText = values[0][0]
    document.getElementById("pAchat1").innerText = `${values[0][1].toFixed(0)} €`
    document.getElementById("rendement1").innerText = `${values[0][2].toFixed(1)} %` // On affiche le statut juridique, le pouvoir d'achat et le meilleur rendement dans la première colonne

    document.getElementById("A2").innerText = values[1][0]
    document.getElementById("pAchat2").innerText = `${values[1][1].toFixed(0)} €`
    document.getElementById("rendement2").innerText = `${values[1][2].toFixed(1)} %` // On affiche le statut juridique, le pouvoir d'achat et le rendement dans la deuxième colonne
    
    document.getElementById("A3").innerText = values[2][0]
    document.getElementById("pAchat3").innerText = `${values[2][1].toFixed(0)} €`
    document.getElementById("rendement3").innerText = `${values[2][2].toFixed(1)} %` // On affiche le statut juridique, le pouvoir d'achat et le rendement dans la troisième colonne
    
    document.getElementById("A4").innerText = values[3][0]
    document.getElementById("pAchat4").innerText = `${values[3][1].toFixed(0)} €`
    document.getElementById("rendement4").innerText = `${values[3][2].toFixed(1)} %` // On affiche le statut juridique, le pouvoir d'achat et le rendement dans la quatrième colonne
    
    document.getElementById("A5").innerText = values[4][0]
    document.getElementById("pAchat5").innerText = `${values[4][1].toFixed(0)} €`
    document.getElementById("rendement5").innerText = `${values[4][2].toFixed(1)} %` // On affiche le statut juridique, le pouvoir d'achat et le rendement dans la cinquième colonne
}

selectDetails.addEventListener("change", showDetailedTables) // Lorsque l'on souhaite afficher en détail un bulletin de paie
document.querySelectorAll(".inputDepart").forEach(input => input.addEventListener("change", () => {
    if(simulationSelect.value == "affiche") showDetailedTables() // Si l'on modifie un champ d'entrée, le bulletin de paie est recalculé automatiquement lorsque l'on affiche en détail un bulletin de paie
}))

function showDetailedTables(){
    getInputData() // On récupère les données en entrée et l'on calcule le CA prévisionnel (budget)
    if(selectDetails.value == "PS"){ // On calcule et affiche la fiche de paie pour le PS
        createFichePaie()
        tableBulletinSalaire.style.display = 'block'
    } else tableBulletinSalaire.style.display = 'none'

    if(selectDetails.value == "ME"){ // On calcule et affiche la fiche de paie pour la ME
        tableME.style.display = 'block'
        afficherDataME("affiche")
    } else tableME.style.display = 'none'

    if(selectDetails.value == "SASUMod1"){ // On calcule et affiche la fiche de paie pour le SASU Mod 1
        tableMod1.style.display = 'block'
        afficherDataMod1()
    } else tableMod1.style.display = 'none'

    if(selectDetails.value == "SASUMod2"){ // On calcule et affiche la fiche de paie pour le SASU Mod 2
        tableMod2.style.display = 'block'
        afficherDataMod2()
    } else tableMod2.style.display = 'none'

    if(selectDetails.value == "EURL"){ // On calcule et affiche la fiche de paie pour l'EURL
        tableEURL.style.display = 'block'
        afficherDataEURL()
    } else tableEURL.style.display = 'none'
    // Grâce aux différents display = "none", aucune table n'est affichée si la case --Choisir-- est sélectionnée
}
const sB = document.querySelectorAll(".salaireBrut") // Sélectionne toutes les cases qui doivent afficher le salaire brut
let budgetTotal

// Colonne C
const baseHeure = 151.67
let C5
let C6
let C7
let C8
let C14
let C18
let C19
let C22
let C23
let C24
let C25
let C26
let C27
let C28
let C29
let C34
let C35
const C36 = 20.395
let C49

// Colonne D
const D6 = 5
const D7 = 10
const D13 = 0.4
const D14 = 6.9
const D18 = 6.8
const D19 = 2.9
const D22 = 3.15
const D23 = 8.64
const D24 = 0.86
const D25 = 1.08
const D26 = 0.14
const D27 = 0.14
const D28 = 0.024
const D29 = 0.024
const D34 = 0.46
const D35 = 1.19
const D42 = 3.79

// Colonne E
let E4
let E6
let E7
let E8
let E13
let E14
let E18
let E19
let E22
let E23
let E24
let E25
let E26
let E27
let E28
let E29
let E34
let E35
let E36
let E42
let E46
let E49
let E50

// Colonne F
let F14
let F17
let F20
let F21
let F22
let F23
let F24
let F25
let F26
let F27
let F28
let F29
let F33
let F34
let F36
let F42

// Colonne G
const G11 = 7
const G12 = 0.3
const G13 = 1.9
const G14 = 8.55
const G15 = 3.45
const G16 = 0.77
const G17 = 0.1
const G20 = 4.05
const G21 = 0.15
const G22 = 4.72
const G23 = 12.95
const G24 = 1.29
const G25 = 1.62
let G26 
let G27
const G28 = 0.036
const G29 = 0.036
let G30
let G31
const G32 = 0.016
const G33 = 0.77
const G34 = 0.73
const G37 = 0.55
const G38 = 1.05
const G39 = 0.59
const G40 = 0.09
const G41 = 0.01
const G42 = 5.69

// Colonne H
let H11
let H12
let H13
let H14
let H15
let H16
let H17
let H20
let H21
let H22
let H23
let H24
let H25
let H26
let H27
let H28
let H29
let H30
let H31
let H32
let H33
let H34
let H36
let H37
let H38
let H39
let H40
let H41
let H42

// Colonne O
const O4 = 1603.12
const O5 = 10.57

// Colonne L
const L4 = 3428
let L5
const L6 = 3 * L4
const L7 = 4 * L4
const L8 = O4 * 2.5
const L9 = O4 * 3.5 
const L10 = 8 * L4

let cotisationsSalariales
let cotisationsPatronales

// Afficher tous les Salaires Bruts dans les cases correspondantes

function createFichePaie(){
    calculTauxHoraireFromBudget()
    sB.forEach(cell => cell.innerText = `${salaireBrut.toFixed(2)} €`)
    showTauxPatronaux()
    calculateBasePatronale()
    showBasePatronale()
    calculPatronal()
    showPatronal()

    showTauxSalariaux()
    calculateBaseSalariale()
    showBaseSalariale()
    calculSalarial()
    showSalarial()

    calculateCotisations()
    apresCotisations()

    let outputs = sendDataSimplifiee()
    return outputs
}


function showTauxSalariaux(){
    document.getElementById("D4").innerText = `${tauxHoraire.toFixed(2)} €`
    console.log("Taux Horaire : " + tauxHoraire);
    document.getElementById("D6").innerText = `${D6.toFixed(2)} %`
    document.getElementById("D7").innerText = `${D7.toFixed(2)} %`
    document.getElementById("D13").innerText = `${D13.toFixed(2)} %`
    document.getElementById("D14").innerText = `${D14.toFixed(2)} %`
    document.getElementById("D18").innerText = `${D18.toFixed(2)} %`
    document.getElementById("D19").innerText = `${D19.toFixed(2)} %`
    document.getElementById("D22").innerText = `${D22.toFixed(2)} %`
    document.getElementById("D23").innerText = `${D23.toFixed(2)} %`
    document.getElementById("D24").innerText = `${D24.toFixed(2)} %`
    document.getElementById("D25").innerText = `${D25.toFixed(2)} %`
    document.getElementById("D26").innerText = `${D26.toFixed(2)} %`
    document.getElementById("D27").innerText = `${D27.toFixed(2)} %`
    document.getElementById("D28").innerText = `${D28.toFixed(2)} %`
    document.getElementById("D29").innerText = `${D29.toFixed(2)} %`
    document.getElementById("D34").innerText = `${D34.toFixed(2)} %`
    document.getElementById("D35").innerText = `${D35.toFixed(2)} %`
    document.getElementById("D42").innerText = `${D42.toFixed(2)} %`
}

function calculateBaseSalariale(){
    C14 = C22 = C24 = C26 = C28 = L5
    C26 = salaireBrut > L4 ? L5 : 0
    C18 = C19 = salaireBrut > L7 ? (L7 * 0.9825 + salaireBrut - L7 - H33 - H34 - H36) : (salaireBrut * 0.9825 - H33 - H34 - H36)
    C23 = C25 = C27 = C29 = Math.max(salaireBrut - L4, 0)
    C34 = (salaireBrut > L4 && (salaireBrut - L4) < L6) ? salaireBrut - L4 : L6
    C35 = (salaireBrut > L6 && salaireBrut - L6 < L7) ? salaireBrut - L6 : ((salaireBrut > L6 && salaireBrut - L6 > L7) ? L7 : 0)
    C23 = C25 = C27 = Math.max(salaireBrut - L4, 0)
    C29 = salaireBrut < L4 ? 0 : (salaireBrut <= 9 * L4 ? salaireBrut - L4 : 0)
}

function showBaseSalariale(){
    document.getElementById("C4").innerText = `${baseHeure.toFixed(2)} €`
    document.getElementById("C5").innerText = `${nbJoursTravailMois.toFixed(2)} €`
    document.getElementById("C6").innerText = `${C6.toFixed(2)} €`
    document.getElementById("C7").innerText = `${C7.toFixed(2)} €`
    document.getElementById("C8").innerText = `${C8.toFixed(2)} €`
    document.getElementById("C14").innerText = `${C14.toFixed(2)} €`
    document.getElementById("C18").innerText = `${C18.toFixed(2)} €`
    document.getElementById("C19").innerText = `${C19.toFixed(2)} €`
    document.getElementById("C22").innerText = `${C22.toFixed(2)} €`
    document.getElementById("C23").innerText = `${C23.toFixed(2)} €`
    document.getElementById("C24").innerText = `${C24.toFixed(2)} €`
    document.getElementById("C25").innerText = `${C25.toFixed(2)} €`
    document.getElementById("C26").innerText = `${C26.toFixed(2)} €`
    document.getElementById("C27").innerText = `${C27.toFixed(2)} €`
    document.getElementById("C28").innerText = `${-C28.toFixed(2)} €`
    document.getElementById("C29").innerText = `${-C29.toFixed(2)} €`
    document.getElementById("C34").innerText = `${C34.toFixed(2)} €`
    document.getElementById("C35").innerText = `${C35.toFixed(2)} €`
    document.getElementById("C36").innerText = `${C36.toFixed(2)} €`
    document.getElementById("C42").innerText = nbJoursTravailMois
}

function calculSalarial(){
    E13 = - salaireBrut * D13 / 100
    E14 = - C14 * D14 / 100
    E18 = - C18 * D18 / 100
    E19 = - C19 * D19 / 100
    E22 = - C22 * D22 / 100
    E23 = - C23 * D23 / 100
    E24 = - C24 * D24 / 100
    E25 = - C25 * D25 / 100
    E26 = - C26 * D26 / 100
    E27 = - C27 * D27 / 100
    E28 = - C28 * D28 / 100
    E29 = - C29 * D29 / 100
    E34 = - C34 * D34 / 100
    E35 = - C35 * D35 / 100
    E36 = - C36
    E42 = - nbJoursTravailMois * D42
}

function showSalarial(){
    document.getElementById("E4").innerText = `${E4.toFixed(2)} €`
    document.getElementById("E6").innerText = `${E6.toFixed(2)} €`
    document.getElementById("E7").innerText = `${E7.toFixed(2)} €`
    document.getElementById("E8").innerText = `${E8.toFixed(2)} €`
    document.getElementById("E13").innerText = `${E13.toFixed(2)} €`
    document.getElementById("E14").innerText = `${E14.toFixed(2)} €`
    document.getElementById("E18").innerText = `${E18.toFixed(2)} €`
    document.getElementById("E19").innerText = `${E19.toFixed(2)} €`
    document.getElementById("E22").innerText = `${E22.toFixed(2)} €`
    document.getElementById("E23").innerText = `${E23.toFixed(2)} €`
    document.getElementById("E24").innerText = `${E24.toFixed(2)} €`
    document.getElementById("E25").innerText = `${E25.toFixed(2)} €`
    document.getElementById("E26").innerText = `${E26.toFixed(2)} €`
    document.getElementById("E27").innerText = `${E27.toFixed(2)} €`
    document.getElementById("E28").innerText = `${E28.toFixed(2)} €`
    document.getElementById("E29").innerText = `${E29.toFixed(2)} €`
    document.getElementById("E34").innerText = `${E34.toFixed(2)} €`
    document.getElementById("E35").innerText = `${E35.toFixed(2)} €`
    document.getElementById("E36").innerText = `${E36.toFixed(2)} €`
    document.getElementById("E42").innerText = `${E42.toFixed(2)} €`
    document.getElementById("E44").innerText = `${fraisDeplacements.toFixed(2)} €`
    document.getElementById("E45").innerText = `${fraisProfessionnels.toFixed(2)} €`
}

function showTauxPatronaux(){
    document.getElementById("G11").innerText = `${G11.toFixed(2)} %`
    document.getElementById("G12").innerText = `${G12.toFixed(2)} %`
    document.getElementById("G13").innerText = `${G13.toFixed(2)} %`
    document.getElementById("G14").innerText = `${G14.toFixed(2)} %`
    document.getElementById("G15").innerText = `${G15.toFixed(2)} %`
    document.getElementById("G16").innerText = `${G16.toFixed(2)} %`
    document.getElementById("G20").innerText = `${G20.toFixed(2)} %`
    document.getElementById("G21").innerText = `${G21.toFixed(2)} %`
    document.getElementById("G22").innerText = `${G22.toFixed(2)} %`
    document.getElementById("G23").innerText = `${G23.toFixed(2)} %`
    document.getElementById("G24").innerText = `${G24.toFixed(2)} %`
    document.getElementById("G25").innerText = `${G25.toFixed(2)} %`
    document.getElementById("G26").innerText = `${G26.toFixed(2)} %`
    document.getElementById("G27").innerText = `${G27.toFixed(2)} %`
    document.getElementById("G28").innerText = `${G28.toFixed(2)} %`
    document.getElementById("G29").innerText = `${G29.toFixed(2)} %`
    document.getElementById("G30").innerText = `${G30.toFixed(2)} %`
    document.getElementById("G31").innerText = `${G31.toFixed(2)} %`
    document.getElementById("G32").innerText = `${G32.toFixed(2)} %`
    document.getElementById("G33").innerText = `${G33.toFixed(2)} %`
    document.getElementById("G34").innerText = `${G34.toFixed(2)} %`
    document.getElementById("G37").innerText = `${G37.toFixed(2)} %`
    document.getElementById("G38").innerText = `${G38.toFixed(2)} %`
    document.getElementById("G39").innerText = `${G39.toFixed(2)} %`
    document.getElementById("G40").innerText = `${G40.toFixed(2)} %`
    document.getElementById("G41").innerText = `${G41.toFixed(2)} %`
    document.getElementById("G42").innerText = `${G42.toFixed(2)} %`
}

function calculateBasePatronale(){
    F14 = F22 = F24 = F26 = L5
    F17 = Math.min(salaireBrut, L4)
    F20 = F21 = Math.min(4 * L5, salaireBrut)
    F28 = -L5
    F33 = Math.min(salaireBrut, L4)
    F34 = (salaireBrut > L4 && salaireBrut - L4 < L6) ? salaireBrut - L4 : L6
    F36 = C36
    F42 = nbJoursTravailMois
    F23 = F25 = F27 = Math.max(salaireBrut - L4, 0)
    F29 = salaireBrut < L4 ? 0 : (salaireBrut - L4 <= 8 * L4 ? salaireBrut - L4 : 0)
}

function showBasePatronale(){
    document.getElementById("F14").innerText = `${F14.toFixed(2)} €`
    document.getElementById("F17").innerText = `${F17.toFixed(2)} €`
    document.getElementById("F20").innerText = `${F20.toFixed(2)} €`
    document.getElementById("F21").innerText = `${F21.toFixed(2)} €`
    document.getElementById("F22").innerText = `${F22.toFixed(2)} €`
    document.getElementById("F23").innerText = `${F23.toFixed(2)} €`
    document.getElementById("F24").innerText = `${F24.toFixed(2)} €`
    document.getElementById("F25").innerText = `${F25.toFixed(2)} €`
    document.getElementById("F26").innerText = `${F26.toFixed(2)} €`
    document.getElementById("F27").innerText = `${F27.toFixed(2)} €`
    document.getElementById("F28").innerText = `${F28.toFixed(2)} €`
    document.getElementById("F29").innerText = `${F29.toFixed(2)} €`
    document.getElementById("F33").innerText = `${F33.toFixed(2)} €`
    document.getElementById("F34").innerText = `${F34.toFixed(2)} €`
    document.getElementById("F36").innerText = `${F36.toFixed(2)} €`
    document.getElementById("F42").innerText = F42
}

function calculPatronal(){
    H11 = - salaireBrut * G11 / 100
    H12 = - salaireBrut * G12 / 100
    H13 = - salaireBrut * G13 / 100
    H14 = - F14 * G14 / 100
    H15 = - salaireBrut * G15 / 100
    H16 = - salaireBrut * G16 / 100
    H17 = - F17 * G17 / 100
    H20 = - F20 * G20 / 100
    H21 = - F21 * G21 / 100
    H22 = - F22 * G22 / 100
    H23 = - F23 * G23 / 100
    H24 = - F24 * G24 / 100
    H25 = - F25 * G25 / 100
    H26 = - F26 * G26 / 100
    H27 = - F27 * G27 / 100
    H28 = F28 * G28 / 100
    H29 = - F29 * G29 / 100
    H30 = - salaireBrut * G30 / 100
    H31 = - salaireBrut * G31 / 100
    H32 = - salaireBrut * G32 / 100
    H33 = - F33 * G33 / 100
    H34 = - F34 * G34 / 100
    H36 = - F36
    H37 = - salaireBrut * G37 / 100
    H38 = - salaireBrut * G38 / 100
    H39 = - salaireBrut * G39 / 100
    H40 = - salaireBrut * G40 / 100
    H41 = - salaireBrut * G41 / 100
    H42 = - F42 * G42
}

function showPatronal(){
    document.getElementById("H11").innerText = `${H11.toFixed(2)} €`
    document.getElementById("H12").innerText = `${H12.toFixed(2)} €`
    document.getElementById("H13").innerText = `${H13.toFixed(2)} €`
    document.getElementById("H14").innerText = `${H14.toFixed(2)} €`
    document.getElementById("H15").innerText = `${H15.toFixed(2)} €`
    document.getElementById("H16").innerText = `${H16.toFixed(2)} €`
    document.getElementById("H17").innerText = `${H17.toFixed(2)} €`
    document.getElementById("H20").innerText = `${H20.toFixed(2)} €`
    document.getElementById("H21").innerText = `${H21.toFixed(2)} €`
    document.getElementById("H22").innerText = `${H22.toFixed(2)} €`
    document.getElementById("H23").innerText = `${H23.toFixed(2)} €`
    document.getElementById("H24").innerText = `${H24.toFixed(2)} €`
    document.getElementById("H25").innerText = `${H25.toFixed(2)} €`
    document.getElementById("H26").innerText = `${H26.toFixed(2)} €`
    document.getElementById("H27").innerText = `${H27.toFixed(2)} €`
    document.getElementById("H28").innerText = `${H28.toFixed(2)} €`
    document.getElementById("H29").innerText = `${H29.toFixed(2)} €`
    document.getElementById("H30").innerText = `${H30.toFixed(2)} €`
    document.getElementById("H31").innerText = `${H31.toFixed(2)} €`
    document.getElementById("H32").innerText = `${H32.toFixed(2)} €`
    document.getElementById("H33").innerText = `${H33.toFixed(2)} €`
    document.getElementById("H34").innerText = `${H34.toFixed(2)} €`
    document.getElementById("H36").innerText = `${H36.toFixed(2)} €`
    document.getElementById("H37").innerText = `${H37.toFixed(2)} €`
    document.getElementById("H38").innerText = `${H38.toFixed(2)} €`
    document.getElementById("H39").innerText = `${H39.toFixed(2)} €`
    document.getElementById("H40").innerText = `${H40.toFixed(2)} €`
    document.getElementById("H41").innerText = `${H41.toFixed(2)} €`
    document.getElementById("H42").innerText = `${H42.toFixed(2)} €`
}

function calculateCotisations(){
    cotisationsSalariales = E13 + E14 + E18 + E19 + E22 + E23 + E24 + E25 + E26 + E27 + E28 + E29 + E34 + E35 + E36 + E42 
    cotisationsPatronales = H11 + H12 + H13 + H14 + H15 + H16 + H17 + H20 + H21 + H22 + H23 + H24 + H25 + H26 + H27 + H28 + H29 + H30 + H31 + H32 + H33 + H34 + H36 + H37 + H38 + H39 + H40 + H41 + H42 
    document.getElementById("netSalarial").innerText = `${cotisationsSalariales.toFixed(2)} €`
    document.getElementById("netPatronal").innerText = `${cotisationsPatronales.toFixed(2)} €`
}

function apresCotisations(){
    E46 = salaireBrut + fraisDeplacements + fraisProfessionnels + cotisationsSalariales
    C47 = -E19
    C48 = -H36
    C49 = C48 + C47 + salaireBrut + cotisationsSalariales
    E49 = calculBaremeProgressif("PS")[0]
    document.getElementById("E49").innerText = `${E49.toFixed(2)} €`
    E50 = E46 + E49
    document.getElementById("E46").innerText = `${E46.toFixed(2)} €`
    document.getElementById("C47").innerText = `${C47.toFixed(2)} €`
    document.getElementById("C48").innerText = `${C48.toFixed(2)} €`
    document.getElementById("C49").innerText = `${C49.toFixed(2)} €`
    document.getElementById("E49").innerText = `${E49.toFixed(2)} €`
    document.getElementById("E50").innerText = `${E50.toFixed(2)} €`
    document.getElementById("budgetTotal").innerText = `${budgetTotal.toFixed(2)} €`
}

function calculTauxHoraireFromBudget(){
    recherche_dichotomie_TauxHoraire(budget, 0, budget, 100)
}

function recherche_dichotomie_TauxHoraire(budget, a, b, n){
    if(n == 0) return;
    salaireBrut = (a + b) / 2
    L5 = Math.min(salaireBrut, L4)
    G26 = G27 = salaireBrut < L4 ? 0 : 0.21
    G30 = salaireBrut > L9 ? 1.8 : 0
    G31 = salaireBrut > L8 ? 6 : 0

    calculateBasePatronale()
    calculPatronal()
    
    calculateBaseSalariale()
    calculSalarial()
    calculateCotisations()

    if(garantieFinanciereChecked) tauxHoraire = salaireBrut / (baseHeure * (1 + 0.05 + 0.095 - 0.1))
    else tauxHoraire = salaireBrut / (baseHeure * (1 + 0.05 + 0.095)) // La différence est que l'on soustrait 10% (d'où le -0.1)
    calculateBeforeSalaireBrut()
    budgetTotal = salaireBrut - cotisationsPatronales + fraisDeplacements + fraisProfessionnels - E8
    if(budgetTotal < budget) recherche_dichotomie_TauxHoraire(budget, salaireBrut, b, n-1)
    else recherche_dichotomie_TauxHoraire(budget, a, salaireBrut, n-1)
}

function calculateBeforeSalaireBrut(){
    C6 = E4 = baseHeure * tauxHoraire
    C7 = 0.95 * E4
    C6 = E4
    C8 = -E4
    E6 = C6 * D6 / 100
    E7 = C7 * D7 / 100
    E8 = C8 * garantieFinanciere / 100
}

function sendDataSimplifiee(){
    const hypotheseFacturation = nbJoursTravailMois * TJM
    const honorairesGestion = hypotheseFacturation * (parseInt(inputHonoraires.value) - 2.2) / 100
    const avanceFacturation = hypotheseFacturation / 100
    const CVAE = hypotheseFacturation * 0.012
    const fraisInrefacturables = parseInt(inputFraisRepas.value) + parseInt(inputAchatSociete.value) / 12 + parseInt(inputFraisDeplacements.value)
    const CAIndependantMois = hypotheseFacturation - honorairesGestion - avanceFacturation - CVAE - fraisInrefacturables 

    const baremeProgressif = E49
    const TitreRestauMois = E42 + H42
    const salaireBrutMois = CAIndependantMois + cotisationsPatronales + fraisInrefacturables
    const revenuNetAvantImpotMois = salaireBrutMois + cotisationsSalariales
    const salaireNetAvantImpotMois = revenuNetAvantImpotMois - TitreRestauMois

    const pouvoirAchatMois = baremeProgressif + salaireNetAvantImpotMois
    const rendementMois = pouvoirAchatMois / hypotheseFacturation * 100
    return ["Portage Salarial", pouvoirAchatMois, rendementMois]
}
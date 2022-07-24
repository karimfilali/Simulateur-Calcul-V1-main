
// Config correspond à si la fonction est appelée par PS, ME, EURL, Mod1 ou Mod 2. C'est une String
// inputValues correspond aux entrées nécessaires pour chaque config.
// PS requiert C49 mais est une variable globale
// ME requiert CAIndependantMois
// EURL requiert salaireNetAvantImpotMois et revenuNetAvantImpotMois
// Mod1 requiert salaireNetAvantImpotMois et revenuNetAvantImpotMois
// Mod2 requiert salaireBrutMois et revenuNetAvantImpotMois
// PFUMois dans Mod1 requiert salaireNetAvantImpotMois et revenuNetAvantImpotMois

function calculBaremeProgressif(config, inputValues){
    const seuil1 = 10225
    const seuil2 = 26070
    const seuil3 = 74545
    const seuil4 = 160336
    const taux1 = 0
    const taux2 = 0.11
    const taux3 = 0.30
    const taux4 = 0.41
    let revenusIndependant = calculRevenusIndependant(config, inputValues)
    let PIAA = (revenusIndependant + revenusConjoint) / nbParts
    let surplus1 = Math.max(PIAA - seuil1, 0)
    let surplus2 = Math.max(PIAA - seuil2, 0)
    let surplus3 = Math.max(PIAA - seuil3, 0)
    let surplus4 = Math.max(PIAA - seuil4, 0)
    let tranche1 = PIAA - surplus1
    let tranche2 = PIAA - surplus2 - tranche1
    let tranche3 = PIAA - surplus3 - tranche1 - tranche2
    let tranche4 = PIAA - surplus4 - tranche1 - tranche2 - tranche3

    let impositionTranche1 = tranche1 * taux1
    let impositionTranche2 = tranche2 * taux2
    let impositionTranche3 = tranche3 * taux3
    let impositionTranche4 = tranche4 * taux4
    let totalParParts = impositionTranche1 + impositionTranche2 + impositionTranche3 + impositionTranche4
    let totalImposable = totalParParts * nbParts

    let pourcentageBFI = revenusIndependant / (revenusIndependant + revenusConjoint)
    let pourcentageBFC = revenusConjoint / (revenusIndependant + revenusConjoint)
    if(config == "PFU" || config == "PFUscenario"){
        let PFU = 0.3 * inputValues[1] * 12 + totalImposable * pourcentageBFI // inputValues[1] = revenuNetAvantImpotMois
        return -PFU / 12
    }
    let bareme = totalImposable * pourcentageBFI
    let baremeConjoint = totalImposable * pourcentageBFC
    return [-bareme / 12, -baremeConjoint / 12, -(bareme + baremeConjoint) / 12]
}

function calculRevenusIndependant(config, inputValues){
    if(config == "PS") return C49 * 12 * 0.9 // C49
    if(config == "ME") return inputValues * 12 * 0.66 // CAIndependantMois
    if(config == "EURL") return (inputValues[0] + inputValues[1]) * 12 // salaireNetAvantImpotMois + revenuNetAvantImpotMois
    if(config == "Mod1") return (inputValues[0] + inputValues[1]) * 12 // salaireNetAvantImpotMois + revenuNetAvantImpotMois
    if(config == "Mod2") return (inputValues[0] * 0.95 + inputValues[1]) * 12 // salaireBrutMois + revenuNetAvantImpotMois
    if(config == "PFU") return inputValues[0] * 12 // salaireNetAvantImpotMois

    // Les lignes si dessous font référence au calcul de la partie Scénario calcul Impot Période
    if(config == "PSscenario") return C49 * 12 * 0.9 + inputValues
    if(config == "MEscenario") return inputValues[0] * 12 * 0.66 + inputValues[1]
    if(config == "Mod1scenario") return (inputValues[0] + inputValues[1]) * 12 + inputValues[2]
    if(config == "Mod2scenario") return (inputValues[0] + inputValues[1]) * 12 + inputValues[2]
    if(config == "EURLscenario") return (inputValues[0] + inputValues[1]) * 12 + inputValues[2]
    if(config == "PFUscenario") return inputValues[0] * 12 + inputValues[2]
}
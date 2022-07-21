submitBtnMeilleurRegime.addEventListener("click", calculMeilleurRegime)

function calculMeilleurRegime(){
    let nomStatutJuridique = []
    let TJMs = []
    let rendement = []
    for(let TJMfictif = 200 ; TJMfictif <= 1200 ; TJMfictif += 20){
        getInputData(["calculMeilleurRegime", TJMfictif]) // On récupère les données en entrée et l'on calcule le CA prévisionnel (budget) en fonction du TJM
        let PSOutputs = createFichePaie()
        let MEOutputs = afficherDataME("compare")
        let SASUMod1Outputs = afficherDataMod1()
        let SASUMod2Outputs = afficherDataMod2()
        let EURLOutputs = afficherDataEURL()

        let valuesToTri = [PSOutputs, MEOutputs, SASUMod1Outputs, SASUMod2Outputs, EURLOutputs]
        valuesToTri.sort((x, y) => y[2] - x[2]) // Cette ligne permet de trier les rendements de chaque statut juridique
        nomStatutJuridique.push(valuesToTri[0][0]) // On ajoute le statut juridique ayant le meilleur rendement pour le TJM donné
        TJMs.push(TJM)
        rendement.push(valuesToTri[0][2])
    }
    
    let nomStatutJuridiqueSimplifiee = [nomStatutJuridique[0]]
    let TJMsSimplifiee = [TJMs[0]]
    let rendementSimplifiee = []
    let rendementSum = rendement[0] // Calcul de la moyenne de rendement
    let lenBeforeChange = 1 // Nombre d'itérations avant changement

    for(let i = 1 ; i < nomStatutJuridique.length ; i++){
        if(nomStatutJuridique[i] != nomStatutJuridique[i - 1]) {
            rendementSimplifiee.push(rendementSum / lenBeforeChange)
            rendementSum = rendement[i]
            lenBeforeChange = 1
            nomStatutJuridiqueSimplifiee.push(nomStatutJuridique[i])
            TJMsSimplifiee.push(TJMs[i])
        } else {
            rendementSum += rendement[i]
            lenBeforeChange++
        }    
    }
    TJMsSimplifiee.push(TJMs[TJMs.length - 1])
    rendementSimplifiee.push(rendementSum / lenBeforeChange)
    // console.log(nomStatutJuridique, TJMs, rendement);

    let tableToDisplay = "<caption>Comparatif des meilleurs régimes</caption>"
    tableToDisplay += "<tr><td>Meilleur statut juridique</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${nomStatutJuridiqueSimplifiee[i]}</td>` }
    tableToDisplay += "</tr>"
    tableToDisplay += "<tr><td>TJM</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>De ${TJMsSimplifiee[i]} € à ${TJMsSimplifiee[i+1]} €</td>` }
    tableToDisplay += "</tr>"
    tableToDisplay += "<tr><td>Rendement moyen</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${rendementSimplifiee[i].toFixed(1)} %</td>` }
    tableToDisplay += "</tr>"
    tableMeilleurRegime.innerHTML = tableToDisplay
    tableMeilleurRegime.style.display = 'block'
}
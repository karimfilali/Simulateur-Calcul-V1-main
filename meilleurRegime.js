let rendementPSvalues = [] // Valeurs des différents rendements pour le PS pour l'affichage de la courbe
let rendementMEvalues = [] // Valeurs des différents rendements pour la ME pour l'affichage de la courbe
let rendementMod1values = [] // Valeurs des différents rendements pour le Mod 1 pour l'affichage de la courbe
let rendementMod2values = [] // Valeurs des différents rendements pour le Mod 2 pour l'affichage de la courbe
let rendementEURLvalues = [] // Valeurs des différents rendements pour l'EURL pour l'affichage de la courbe
let TJMs = [] // Tableau qui va contenir toutes les valeurs différents de TJM prises dans la boucle for
let submitBtnMeilleurRegimeAlreadyClicked = false
let myChart

submitBtnMeilleurRegime.addEventListener("click", () => {
    resetValues()
    values = calculMeilleurRegime()
    tableMeilleurRegime.style.display = 'block'
    displayChart(values)
    submitBtnMeilleurRegimeAlreadyClicked = true
})

function resetValues(){
    rendementPSvalues = []
    rendementMEvalues = []
    rendementMod1values = []
    rendementMod2values = []
    rendementEURLvalues = []
    TJMs = []
}

function calculMeilleurRegime(){
    let nomStatutJuridique = []
    let rendement = []
    for(let TJMfictif = 200 ; TJMfictif <= 1200 ; TJMfictif += 10){
        getInputData(["calculMeilleurRegime", TJMfictif]) // On récupère les données en entrée et l'on calcule le CA prévisionnel (budget) en fonction du TJM
        let PSOutputs = createFichePaie()
        let MEOutputs = afficherDataME("compare")
        let SASUMod1Outputs = afficherDataMod1()
        let SASUMod2Outputs = afficherDataMod2()
        let EURLOutputs = afficherDataEURL()

        rendementPSvalues.push(PSOutputs[2])
        rendementMEvalues.push(MEOutputs[2])
        rendementMod1values.push(SASUMod1Outputs[2])
        rendementMod2values.push(SASUMod2Outputs[2])
        rendementEURLvalues.push(EURLOutputs[2])

        let valuesToTri = [PSOutputs, MEOutputs, SASUMod1Outputs, SASUMod2Outputs, EURLOutputs]
        valuesToTri.sort((x, y) => y[2] - x[2]) // Cette ligne permet de trier les rendements de chaque statut juridique afin d'obtenir les deux meilleurs rendements 
        nomStatutJuridique.push([valuesToTri[0][0], valuesToTri[1][0]]) // On ajoute les statuts juridiques ayant les deux meilleurs rendements pour le TJM donné
        TJMs.push(TJM)
        rendement.push([valuesToTri[0][2], valuesToTri[1][2]])
    }
    let nomStatutJuridiqueSimplifiee = [nomStatutJuridique[0]]
    let TJMsSimplifiee = [TJMs[0]]
    let rendementSimplifiee = []
    let rendementSum = rendement[0] // Calcul de la moyenne de rendement
    let lenBeforeChange = 1 // Nombre d'itérations avant changement
    
    for(let i = 1 ; i < nomStatutJuridique.length ; i++){
        if(nomStatutJuridique[i][0] != nomStatutJuridique[i - 1][0] || nomStatutJuridique[i][1] != nomStatutJuridique[i - 1][1]) {
            rendementSimplifiee.push([rendementSum[0] / lenBeforeChange, rendementSum[1] / lenBeforeChange])
            rendementSum = rendement[i]
            lenBeforeChange = 1
            nomStatutJuridiqueSimplifiee.push(nomStatutJuridique[i])
            TJMsSimplifiee.push(TJMs[i])
        } else {
            rendementSum[0] += rendement[i][0]
            rendementSum[1] += rendement[i][1]
            lenBeforeChange++
        }
    }
    TJMsSimplifiee.push(TJMs[TJMs.length - 1])
    rendementSimplifiee.push([rendementSum[0] / lenBeforeChange, rendementSum[1] / lenBeforeChange])
    let tableToDisplay = "<caption>Comparatif des meilleurs régimes</caption>"
    tableToDisplay += "<tr><td>TJM</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>De ${TJMsSimplifiee[i]} € à ${TJMsSimplifiee[i+1]} €</td>` }
    tableToDisplay += "</tr>"
    tableToDisplay += "<tr><th>Meilleur statut juridique</th>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${nomStatutJuridiqueSimplifiee[i][0]}</td>` }
    tableToDisplay += "</tr><tr><td>Rendement moyen</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${rendementSimplifiee[i][0].toFixed(1)} %</td>` }
    tableToDisplay += "</tr><tr><th>Deuxième meilleur statut juridique</th>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${nomStatutJuridiqueSimplifiee[i][1]}</td>` }
    tableToDisplay += "<tr><td>Rendement moyen</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${rendementSimplifiee[i][1].toFixed(1)} %</td>` }
    tableToDisplay += "</tr>"
    tableMeilleurRegime.innerHTML = tableToDisplay
    
    return TJMs
}

function displayChart(values){
    const data = {
        labels: values, // values[0] correspond aux différentes valeurs du TJM
        datasets: [{
            label: 'Portage Salarial',
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: rendementPSvalues,
        },{
            label: 'Micro Entreprise',
            backgroundColor: 'rgb(55, 9, 12)',
            borderColor: 'rgb(55, 9, 12)',
            data: rendementMEvalues,
        },{
            label: 'SASU Mod 1',
            backgroundColor: 'rgb(255, 165, 0)',
            borderColor: 'rgb(255, 165, 0)',
            data: rendementMod1values,
        },{
            label: 'SASU Mod 2',
            backgroundColor: 'rgb(0,128,0)',
            borderColor: 'rgb(0,128,0)',
            data: rendementMod2values,
        },{
            label: 'EURL IS',
            backgroundColor: 'rgb(0, 0, 255)',
            borderColor: 'rgb(0, 0, 255)',
            data: rendementEURLvalues,
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: { scales: { 
            x: { title: { text: 'TJM (en €)', display: true } },
            y: { title: { text: 'Rendement (en %)', display: true} }
        } }
    };
    if(submitBtnMeilleurRegimeAlreadyClicked) myChart.destroy() // Détruire l'ancien graphique s'il est déjà en train d'afficher des courbes
    myChart = new Chart( document.getElementById('chart'), config );
    meilleurRegimeChart.style.display = 'block'
}
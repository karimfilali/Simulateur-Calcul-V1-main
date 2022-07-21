let submitBtnMeilleurRegimeAlreadyClicked = false
let myChart
submitBtnMeilleurRegime.addEventListener("click", () => {
    values = calculMeilleurRegime()
    tableMeilleurRegime.style.display = 'block'
    displayChart(values)
    submitBtnMeilleurRegimeAlreadyClicked = true
})

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
        nomStatutJuridique.push([valuesToTri[0][0], valuesToTri[1][0]]) // On ajoute le statut juridique ayant le meilleur rendement pour le TJM donné
        TJMs.push(TJM)
        rendement.push([valuesToTri[0][2], valuesToTri[1][2]])
    }
    let nomStatutJuridiqueSimplifiee = [nomStatutJuridique[0]]
    let TJMsSimplifiee = [TJMs[0]]
    let rendementSimplifiee = []
    let rendementSum = rendement[0] // Calcul de la moyenne de rendement
    let lenBeforeChange = 1 // Nombre d'itérations avant changement
    
    let curve1 = [rendement[0][0]]
    let curve2 = [rendement[1][0]]
    
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
        if(nomStatutJuridique[i][0] == nomStatutJuridique[0][0]) curve1.push(rendement[i][0])
        if(nomStatutJuridique[i][1] == nomStatutJuridique[0][0]) curve1.push(rendement[i][1])
        if(nomStatutJuridique[i][0] == nomStatutJuridique[0][0]) curve2.push(rendement[i][1])
        if(nomStatutJuridique[i][1] == nomStatutJuridique[0][0]) curve2.push(rendement[i][0])
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
    
    return [TJMs, curve1, curve2, nomStatutJuridique[0]]
}

function displayChart(values){
    const data = {
        labels: values[0], // values[0] correspond aux différentes valeurs du TJM
        datasets: [{
            label: values[3][0],
            backgroundColor: 'rgb(255, 99, 132)',
            borderColor: 'rgb(255, 99, 132)',
            data: values[1],
        },{
            label: values[3][1],
            backgroundColor: 'rgb(55, 9, 12)',
            borderColor: 'rgb(55, 9, 12)',
            data: values[2],
        }]
    };
    
    const config = {
        type: 'line',
        data: data,
        options: { scales: { 
            x: { title: { text: 'TJM', display: true } },
            y: { title: { text: 'Rendement', display: true } }
        } }
    };
    if(submitBtnMeilleurRegimeAlreadyClicked) myChart.destroy() // Détruire l'ancien graphique s'il est déjà en train d'afficher des courbes
    myChart = new Chart( document.getElementById('chart'), config );
    meilleurRegimeChart.style.display = 'block'
}
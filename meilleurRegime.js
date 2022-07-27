let rendementPSvalues = [] // Valeurs des différents rendements pour le PS pour l'affichage de la courbe
let rendementMEvalues = [] // Valeurs des différents rendements pour la ME pour l'affichage de la courbe
let rendementMod1values = [] // Valeurs des différents rendements pour le Mod 1 pour l'affichage de la courbe
let rendementMod2values = [] // Valeurs des différents rendements pour le Mod 2 pour l'affichage de la courbe
let rendementEURLvalues = [] // Valeurs des différents rendements pour l'EURL pour l'affichage de la courbe
let TJMs = [] // Tableau qui va contenir toutes les valeurs différents de TJM prises dans la boucle for
let submitBtnMeilleurRegimeAlreadyClicked = false
let myChart

submitBtnMeilleurRegime.addEventListener("click", () => {
    calculMeilleurRegime() // Récupération du tableau contenant tous les TJMs
    tableMeilleurRegime.style.display = 'block'
    displayChart(TJMs)
    submitBtnMeilleurRegimeAlreadyClicked = true
})

function calculMeilleurRegime(){
    rendementPSvalues = []  // Remise à zéro des valeurs des tableaux dans le cas d'un nouveau calcul des rendements
    rendementMEvalues = []
    rendementMod1values = []
    rendementMod2values = []
    rendementEURLvalues = []
    TJMs = []

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
        rendementEURLvalues.push(EURLOutputs[2]) // Enregistrement des rendements pour l'EURL dans le tableau

        let valuesToTri = [PSOutputs, MEOutputs, SASUMod1Outputs, SASUMod2Outputs, EURLOutputs]
        valuesToTri.sort((x, y) => y[2] - x[2]) // Cette ligne permet de trier les rendements de chaque statut juridique afin d'obtenir les deux meilleurs rendements 
        nomStatutJuridique.push([valuesToTri[0][0], valuesToTri[1][0]]) // On ajoute les statuts juridiques ayant les deux meilleurs rendements pour le TJM donné
        TJMs.push(TJM) // Ajout du TJM dans le tableau
        rendement.push([valuesToTri[0][2], valuesToTri[1][2]]) // Ajout des rendements pour les deux meilleurs régimes
    }
    let nomStatutJuridiqueSimplifiee = [nomStatutJuridique[0]]
    let TJMsSimplifiee = [TJMs[0]]
    let rendementSimplifiee = []
    let rendementSum = rendement[0] // Calcul de la moyenne de rendement
    let lenBeforeChange = 1 // Nombre d'itérations avant un changement dans l'un des deux meilleurs régimes
    
    for(let i = 1 ; i < nomStatutJuridique.length ; i++){
        if(nomStatutJuridique[i][0] != nomStatutJuridique[i - 1][0] || nomStatutJuridique[i][1] != nomStatutJuridique[i - 1][1]) { // S'il y a un changement dans les deux meilleurs régimes
            rendementSimplifiee.push([rendementSum[0] / lenBeforeChange, rendementSum[1] / lenBeforeChange]) // On enregistre le rendement moyen pour les deux meilleurs régimes
            rendementSum = rendement[i] // Réinitialisation de la somme pour le calcul du rendement moyen
            lenBeforeChange = 1 // Réinitialisation du nombre d'itération avant changement
            nomStatutJuridiqueSimplifiee.push(nomStatutJuridique[i])
            TJMsSimplifiee.push(TJMs[i])
        } else { // Si les deux meilleurs régimes restent inchangés pour le nouveau TJM
            rendementSum[0] += rendement[i][0]
            rendementSum[1] += rendement[i][1]
            lenBeforeChange++
        }
    }
    TJMsSimplifiee.push(TJMs[TJMs.length - 1])
    rendementSimplifiee.push([rendementSum[0] / lenBeforeChange, rendementSum[1] / lenBeforeChange])
    let tableToDisplay = "<caption>Comparatif des meilleurs régimes</caption>"
    tableToDisplay += "<tr><td>TJM</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>De ${TJMsSimplifiee[i]} € à ${TJMsSimplifiee[i+1]} €</td>` } // Affichage des TJMs
    tableToDisplay += "</tr>"
    tableToDisplay += "<tr><th>Meilleur statut juridique</th>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${nomStatutJuridiqueSimplifiee[i][0]}</td>` } // Affichage du meilleur régime
    tableToDisplay += "</tr><tr><td>Rendement moyen</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${rendementSimplifiee[i][0].toFixed(1)} %</td>` } // Affichage du meilleur rendement
    tableToDisplay += "</tr><tr><th>Deuxième meilleur statut juridique</th>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${nomStatutJuridiqueSimplifiee[i][1]}</td>` } // Affichage du deuxième meilleur régime
    tableToDisplay += "<tr><td>Rendement moyen</td>"
    for(let i = 0 ; i < nomStatutJuridiqueSimplifiee.length ; i++) { tableToDisplay += `<td>${rendementSimplifiee[i][1].toFixed(1)} %</td>` } // Affichage du deuxième meilleur rendement
    tableToDisplay += "</tr>"
    tableMeilleurRegime.innerHTML = tableToDisplay
}

function displayChart(){ // Affichage des différentes courbes
    const data = {
        labels: TJMs,
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
    
    const config = { // Titre pour chaque axe
        type: 'line',
        data: data,
        options: { scales: { 
            x: { title: { text: 'TJM (en €)', display: true } },
            y: { title: { text: 'Rendement (en %)', display: true} }
        } }
    };

    if(submitBtnMeilleurRegimeAlreadyClicked) myChart.destroy() // Détruire l'ancien graphique s'il est déjà en train d'afficher les courbes
    myChart = new Chart( document.getElementById('chart'), config );
    meilleurRegimeChart.style.display = 'block' // Affichage des nouvelles courbes sur l'écran
}
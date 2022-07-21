submitBtnCalculateTJM.addEventListener("click", () => {
    getInputData() // On récupère les données en entrée
    calculTJMFromPA() // On calcule les différents rendements, TJM, pouvoirs d'achat
    calculTJMTable.style.display = 'block' // On affiche la table avec les résultats
})

function calculTJMFromPA(){ // Calcul dichotomique du TJM pour le PS, ME, EURL, SASU
    recherche_dichotomie_TJM_PS(0, 1000, 70) // Calcul du TJM pour le Portage Salarial
    valuesPS = [TJM].concat(createFichePaie())

    recherche_dichotomie_TJM_ME(0, 1000, 70) // Calcul du TJM pour la Micro Entreprise
    valuesME = [TJM].concat(afficherDataME("calculTJM"))

    recherche_dichotomie_TJM_EURL(0, 1000, 70) // Calcul du TJM pour l'EURL
    valuesEURL = [TJM].concat(afficherDataEURL())

    recherche_dichotomie_TJM_Mod1(0, 1000, 70) // Calcul du TJM pour le SASU Mod 1
    valuesMod1 = [TJM].concat(afficherDataMod1())

    recherche_dichotomie_TJM_Mod2(0, 1000, 70) // Calcul du TJM pour le SASU Mod 2
    valuesMod2 = [TJM].concat(afficherDataMod2())

    displayTJMTri([valuesPS, valuesME, valuesEURL, valuesMod1, valuesMod2]) // Affichage des données dans le tableau
}

function recherche_dichotomie_TJM_PS(a, b, n){ // Micro Entreprise
    if(n == 0) return;
    TJM = (a + b) / 2
    budget = TJM * nbJoursTravailMois * (1 - honoraires / 100) // Calcul du nouveau budget en fonction du TJM calculé avant
    let PAobtenu = createFichePaie()[1] // Calcul du pouvoir d'achat en fonction du budget calculé avant
    if(PAobtenu < pouvoirAchatSouhaite) recherche_dichotomie_TJM_PS(TJM, b, n-1)
    else recherche_dichotomie_TJM_PS(a, TJM, n-1)
}

function recherche_dichotomie_TJM_ME(a, b, n){ // Micro Entreprise
    if(n == 0) return;
    TJM = (a + b) / 2

    let PAobtenu = afficherDataME("calculTJM")[1] // Calcul du pouvoir d'achat en fonction du TJM
    if(PAobtenu < pouvoirAchatSouhaite) recherche_dichotomie_TJM_ME(TJM, b, n-1)
    else recherche_dichotomie_TJM_ME(a, TJM, n-1)
}

function recherche_dichotomie_TJM_EURL(a, b, n){ // EURL
    if(n == 0) return;
    TJM = (a + b) / 2
    let PAobtenu = afficherDataEURL()[1] // Calcul du pouvoir d'achat en fonction du TJM
    if(PAobtenu < pouvoirAchatSouhaite) recherche_dichotomie_TJM_EURL(TJM, b, n-1)
    else recherche_dichotomie_TJM_EURL(a, TJM, n-1)
}

function recherche_dichotomie_TJM_Mod1(a, b, n){ // SASU Mod 1
    if(n == 0) return;
    TJM = (a + b) / 2

    let PAobtenu = afficherDataMod1()[1] // Calcul du pouvoir d'achat en fonction du TJM
    if(PAobtenu < pouvoirAchatSouhaite) recherche_dichotomie_TJM_Mod1(TJM, b, n-1)
    else recherche_dichotomie_TJM_Mod1(a, TJM, n-1)
}

function recherche_dichotomie_TJM_Mod2(a, b, n){ // SASU Mod 2
    if(n == 0) return;
    TJM = (a + b) / 2

    let PAobtenu = afficherDataMod2()[1] // Calcul du pouvoir d'achat en fonction du TJM
    if(PAobtenu < pouvoirAchatSouhaite) recherche_dichotomie_TJM_Mod2(TJM, b, n-1)
    else recherche_dichotomie_TJM_Mod2(a, TJM, n-1)
}

// Values est un tableau de tableaux. Pour chaque sous tableau, il y a [TJM, Nom du service ("PS", "ME", "EURL", "SASU"), Pouvoir d'achat, Rendement]
function displayTJMTri(values){
    values.sort((x, y) => y[3] - x[3]) // Tri par ordre décroissement en fonction du rendement obtenu
    document.getElementById("nameCalcTJM_1").innerText = values[0][1]
    document.getElementById("TJM_A1").innerText = `${values[0][0].toFixed(1)} €`
    document.getElementById("rendementCalcTJM_B1").innerText = `${values[0][3].toFixed(1)} %`
    document.getElementById("PACalcTJM_C1").innerText = `${values[0][2].toFixed(0)} €`
    document.getElementById("CACalcTJM_D1").innerText = `${(values[0][0] * nbJoursTravailAn).toFixed(0)} €`
    
    document.getElementById("nameCalcTJM_2").innerText = values[1][1]
    document.getElementById("TJM_A2").innerText = `${values[1][0].toFixed(1)} €`
    document.getElementById("rendementCalcTJM_B2").innerText = `${values[1][3].toFixed(1)} %`
    document.getElementById("PACalcTJM_C2").innerText = `${values[1][2].toFixed(0)} €`
    document.getElementById("CACalcTJM_D2").innerText = `${(values[1][0] * nbJoursTravailAn).toFixed(0)} €`
    
    document.getElementById("nameCalcTJM_3").innerText = values[2][1]
    document.getElementById("TJM_A3").innerText = `${values[2][0].toFixed(1)} €`
    document.getElementById("rendementCalcTJM_B3").innerText = `${values[2][3].toFixed(1)} %`
    document.getElementById("PACalcTJM_C3").innerText = `${values[2][2].toFixed(0)} €`
    document.getElementById("CACalcTJM_D3").innerText = `${(values[2][0] * nbJoursTravailAn).toFixed(0)} €`
    
    document.getElementById("nameCalcTJM_4").innerText = values[3][1]
    document.getElementById("TJM_A4").innerText = `${values[3][0].toFixed(1)} €`
    document.getElementById("rendementCalcTJM_B4").innerText = `${values[3][3].toFixed(1)} %`
    document.getElementById("PACalcTJM_C4").innerText = `${values[3][2].toFixed(0)} €`
    document.getElementById("CACalcTJM_D4").innerText = `${(values[3][0] * nbJoursTravailAn).toFixed(0)} €`
    
    document.getElementById("nameCalcTJM_5").innerText = values[4][1]
    document.getElementById("TJM_A5").innerText = `${values[4][0].toFixed(1)} €`
    document.getElementById("rendementCalcTJM_B5").innerText = `${values[4][3].toFixed(1)} %`
    document.getElementById("PACalcTJM_C5").innerText = `${values[4][2].toFixed(0)} €`
    document.getElementById("CACalcTJM_D5").innerText = `${(values[4][0] * nbJoursTravailAn).toFixed(0)} €`
}
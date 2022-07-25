// La fonction salaireNetAvantImpot_AssimileSalarie() fait référence au calcul du net à payer du fichier portageSalarial.js dans la configuration Assimilé Salarié.
// La fonction salaireNetAvantImpot_TNS() fait référence au calcul du net à payer à partir de la feuille Excel simplifiée BS TNS qui sera mise à jour plus tard. Il faudra mettre la fonction à jour en conséquence
// Ces fonctions ont été codées dans la version 11.03 du fichier Excel.

function salaireNetAvantImpot_AssimileSalarie(){
    budget = revenuConsultantBrut / 12
    calculTauxHoraireFromBudget("Assimile Salarie") // Calcul du taux horaire en fonction du budget
    apresCotisations() // Calcul du Net à payer avant impôt 
    return E46 // Renvoi du Net à payer avant impôt
}

function salaireNetAvantImpot_TNS(){ // A modifier dans le cas de la mise à jour du fichier Excel
    return revenuConsultantBrut / (12 * 1.43)
}
## Première version du simulateur de calcul pour la société Work4You

Le principal fichier JavaScript du repository est le fichier variables.js (qui est appelé en premier dans le fichier index.html). 

Ce fichier récupère toutes les données requises en entrée et s'occupe de l'affichage des différentes options et sous-options. Il fait appel ainsi aux autres fichiers JavaScript (PortageSalarial, ME, SASUMod1, SASUMod2, EURL, Scénario, meilleurRegime, calculTJM) en fonction de l'option ou de la sous-option choisie.

## Attention !
# Les nombreuses variables du fichier PortageSalarial.js (type C5, C6, D6, D7, etc.) font référence au nom des cases de la feuille 'BS avec BF 10%' de la feuille Excel version 11.05

Dans le fichier PortageSalarial.js, le salaire brut est calculé par dichotomie en fonction du CA prévisionnel et le taux horaire est directement calculé à partir d'une formule mathématique à partir du salaire brut (en ligne 498).
En cas d'ajout, de suppression ou de modification de ligne dans le bulletin de paie Portage Salarial, il faudra être vigilant à mettre correctement à jour la table HTML et le fichier PortageSalarial.js. Ce n'est pas difficile mais une erreur d'inattention peut rapidement arriver sur ce gros fichier.

Le fichier calculBareme.js permet le calcul du barème Progressif utilisé dans le calcul des impôts et le calcul du PFU.

Le fichier TJMtoHonoraires.json permet la conversion du TJM donné en un taux honoraires correspondant. Le fichier est appelé dans la fonction getHonoraires() du fichier variables.js

Le fichier BS_AssimileSalarie_TNS.js contient les fonctions salaireNetAvantImpot_AssimileSalarie() pour la SASU Mod 1 et SASU Mod 2 et salaireNetAvantImpot_TNS() pour l'EURL. Cette dernière fonction a pour vocation d'être modifiée à l'avenir lorsque la feuille BS TNS du fichier Excel sera modifée.

# Pour des raisons de sécurité
Il peut être conseillé de masquer le code JavaScript du client. En effet, tout le JS s'exécute sur la machine de l'utilisateur et ce dernier peut donc avoir accès au contenu de tous les fichiers JS, donc aux calculs effectués. Pour masquer le code JS, il est conseillé de supprimer les commentaires puis de brouiller le code. Supprimer les commentaires n'est pas le plus nécessaire mais peut guider l'utilisateur. Pour cela, j'utilise une extension Visual Studio Code qui me permet de retirer en une commande tous les commentaires (https://www.youtube.com/watch?v=DxNkUvwdtJo&ab_channel=WebStylePress). Pour brouiller le code, un outil très populaire et efficace est Obfuscator (https://obfuscator.io/). Il rend le code illisible, ajoute du code mort (du code inutile, qui sert à brouille les pistes) et renomme les variables. Il faut donc garder les fichiers JS "propres" sur la machine locale et mettre en ligne les fichiers brouillés. Le petit inconvéniant est que à chaque mise à jour d'un fichier, il faille brouiller à nouveau le code.

En cas de questionnement sur le fonctionnement d'une fonction ou d'une option, merci de me contacter à l'adresse mail suivante : karim.filali@etu.u-paris.fr

Merci
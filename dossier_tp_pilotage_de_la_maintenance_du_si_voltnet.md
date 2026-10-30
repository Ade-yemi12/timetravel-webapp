# TP — Pilotage de la maintenance du SI : Une semaine chez VoltNet

## Partie A — Reprendre le cours

### Chapitre 1 — Pourquoi piloter la maintenance

**1. MCO et MCS : définitions et exemples chez VoltNet** Le MCO représente le Maintien en Condition Opérationnelle (faire en sorte que le SI fonctionne et reste disponible) et le MCS représente le Maintien en Condition de Sécurité (faire en sorte que le SI reste protégé contre les menaces dans le temps).

* **MCO :** S'assurer que les bornes sont fonctionnelles, que l'API répond rapidement et que la base de données ne sature pas.

* **MCS :** S'assurer que le système de paiement est sécurisé, renouveler les certificats HTTPS et appliquer les correctifs de sécurité sur le firmware des bornes.

**2. Calcul de disponibilité à** $99,95\text{ \%}$
Une année compte $365 \times 24 = 8\,760\text{ heures}$. Un taux de disponibilité de $99,95\text{ \%}$ autorise $100\text{ \%} - 99,95\text{ \%} = 0,05\text{ \%}$ de temps de panne :

* **Par an :**
  

  $$
  8\,760 \times \frac{0,05}{100} = 4,38\text{ h} = 4\text{ h } 23\text{ min}
  $$

* **Par mois :**
  

  $$
  \frac{4,38\text{ h}}{12} = 0,365\text{ h} \quad (0,365 \times 60 = 21,9\text{ min}) \implies \text{environ } 22\text{ minutes par mois}
  $$

### Chapitre 2 — Les types de maintenance

**3. Systématique, conditionnelle, prédictive : exemples**

* **Maintenance systématique (selon un calendrier fixe) :** Planifier un redémarrage préventif ou le changement d'une pièce d'usure sur les bornes à intervalle régulier après un temps d'utilisation défini, ainsi qu'un test mensuel de restauration des sauvegardes.

* **Maintenance conditionnelle (selon un seuil d'alerte) :** Mettre en place une alerte automatique pour déclencher une intervention ou purger les logs dès que le disque de la base de données ou la mémoire d'une borne dépasse $80\text{ \%}$ d'utilisation.

* **Maintenance prédictive (selon l'évolution d'une tendance) :** Surveiller la courbe d'augmentation des micro-coupures réseau 4G des bornes semaine après semaine afin de remplacer le modem d'une borne avant qu'elle ne perde totalement son isolation réseau.

**4. Maintenance évolutive ou adaptative**

* **Maintenance évolutive :** *Ajouter un cache pour accélérer le site*, parce que c'est un choix interne volontaire pour améliorer les performances du service.

* **Maintenance adaptative :** *Passer à IPv6 parce que le fournisseur abandonne IPv4* et *migrer une base vers une version supportée*, parce que dans ces deux cas on subit un changement externe imposé par un tiers (le fournisseur réseau ou la fin de support de l'éditeur) auquel on est obligé de s'adapter.

### Chapitre 3 — Incidents, problèmes, changements

**5. Incident, problème, changement : définitions et analogie**

* **Incident :** Le paiement ne passe plus sur la borne ; le service est coupé ou dégradé et le seul but est de le rétablir le plus vite possible.

* **Problème :** La mise à jour défaillante du système de paiement qui est la cause racine à l'origine de l'incident.

* **Changement :** Rétrograder à l'ancienne version le temps de s'assurer des tests sur la nouvelle version en préproduction, puis la relancer en production de manière encadrée sans rien casser.

* **Analogie (le tableau électrique de la maison) :** Les plombs sautent dans le salon, on remonte le disjoncteur dans le noir pour ravoir de la lumière tout de suite (**incident**). On cherche pourquoi ça a sauté et on découvre que c'est le grille-pain qui fait un court-circuit dès qu'on l'allume (**problème**). On remplace le grille-pain défectueux par un neuf après avoir vérifié la prise (**changement**).

**6. SLA, SLO, SLI, OLA**

* **SLA (Service Level Agreement) :** S'adresse aux clients (engagement contractuel de disponibilité et de délai, avec pénalités financières).

* **SLO (Service Level Objective) :** KPI cible interne qui s'adresse à la boîte (aux équipes techniques).

* **SLI (Service Level Indicator) :** S'adresse aussi à la boîte, c'est la mesure réelle constatée sur la période.

* **OLA (Operational Level Agreement) :** S'adresse aux équipes internes entre elles et aux prestataires techniques (ex : délai d'intervention terrain).

* **Pourquoi le SLO est plus strict que le SLA :** Parce qu'il garantit que le SLA sera respecté avec une marge de sécurité ; cela permet à l'équipe interne d'être alertée et d'agir avant de franchir la limite contractuelle du client.

### Chapitre 4 — Stratégie et planification

**7. Les cinq étapes de la démarche**
L'ordre est : **1. Cartographier** $\rightarrow$ **2. Criticité** $\rightarrow$ **3. Stratégie** $\rightarrow$ **4. Plan** $\rightarrow$ **5. RACI**.
Si on saute la première étape (la cartographie), toute la planification faite derrière sera erronée car elle n'aura pas de bases réelles : on ne peut ni protéger ni maintenir des serveurs, des logiciels ou des dépendances dont on ignore l'existence.

**8. Pourquoi un seul « A » par ligne dans un RACI**
On met un seul **A** (Approbateur) par activité parce que ça permet de centraliser les décisions, d'éviter les conflits et d'optimiser le temps. Lorsqu'il y en a deux sur la même ligne, soit ils ne sont pas d'accord et la décision est bloquée, soit chacun pense que c'est l'autre qui va valider et plus personne n'assume la responsabilité finale en cas de problème.

### Chapitre 5 — Supervision et indicateurs

**9. MTTR, MTBF et formule de disponibilité**

* **MTTR (Mean Time To Repair) :** Temps moyen pour rétablir le service après une panne :
  

  $$
  \text{MTTR} = \frac{\text{Temps total d'arrêt}}{\text{Nombre de pannes}}
  $$

* **MTBF (Mean Time Between Failures) :** Temps moyen de bon fonctionnement entre deux pannes (avec $\text{Temps de marche} = \text{Temps total} - \text{Temps d'arrêt}$) :
  

  $$
  \text{MTBF} = \frac{\text{Temps de marche}}{\text{Nombre de pannes}}
  $$

* **Formule reliant MTBF, MTTR et Disponibilité :**
  

  $$
  \text{Disponibilité} = \frac{\text{MTBF}}{\text{MTBF} + \text{MTTR}}
  $$

* **Action du préventif et de l'astreinte :** La maintenance **préventive** agit sur le **MTBF** (elle l'augmente en évitant que les pannes ne surviennent), tandis que l'**astreinte** agit sur le **MTTR** (elle le diminue en permettant de réparer beaucoup plus vite la nuit et le week-end).

**10. Pourquoi surveiller un indicateur métier en plus des indicateurs techniques**
Parce qu'il permet d'orienter les missions techniques pour optimiser les performances, mais surtout de détecter des pannes fonctionnelles invisibles côté serveurs (tous les voyants CPU, RAM et disque peuvent être au vert alors que plus aucun client ne parvient à lancer une session). Chez VoltNet, un bon indicateur métier consiste à surveiller le **nombre de recharges démarrées par heure** comparé à la même heure la semaine précédente.

### Chapitre 6 — Déployer des correctifs

**11. CVE, CVSS, CERT-FR et exemple de CVE critique**

* **CVE :** Identifiant public unique attribué à une faille de sécurité connue.

* **CVSS :** Score chiffré qui mesure la gravité d'une faille sur une échelle de $0$ à $10$.

* **CERT-FR :** Le centre gouvernemental français de veille, d'alerte et de réponse aux attaques informatiques.

* **Exemple de CVE critique publiée cette année :** La **CVE-2025-15467** (publiée début 2026, score CVSS de $9,8$, bulletin d'alerte du CERT-FR) touchant l'environnement **Node.js** utilisé sur les serveurs d'API de VoltNet, ou la vulnérabilité critique (CVSS $9,8$) identifiée sur le firmware **ChargeOne v3.0 à v3.3**.

**12. Préproduction, déploiement par vagues, rollback**

* **Préproduction :** Sert à tester un correctif sur une copie fidèle de la production afin de vérifier qu'il ne casse rien avant de toucher aux vrais utilisateurs.

* **Déploiement par vagues (canary) :** Sert à déployer la mise à jour progressivement (par exemple sur $5\text{ \%}$ du parc d'abord, puis $25\text{ \%}$, puis $100\text{ \%}$) pour contenir l'impact en cas d'anomalie non détectée en test.

* **Rollback :** Sert à revenir immédiatement à la version précédente fonctionnelle si le déploiement provoque un incident en production.

* **Cas CrowdStrike (juillet 2024) :** C'est le **déploiement par vagues** (associé à de vrais tests en préproduction) qui aurait évité la panne mondiale. En envoyant la mise à jour défectueuse à tous ses clients d'un seul coup, CrowdStrike a fait planter $8,5\text{ millions}$ de PC simultanément ; avec un déploiement par vagues, le plantage aurait été repéré dès le premier échantillon de machines et stoppé aussitôt.

## Partie B — Une semaine chez VoltNet

## Mission 1 — Lundi 10 h : Comprendre ce que vous avez entre les mains

### Livrable 1.1 : Schéma de cartographie du SI de VoltNet et légende

L'analyse de l'inventaire technique **\[D2\]** et des échanges **\[D5\]** permet de représenter l'architecture réelle et les liens de dépendance de VoltNet :

```
====================================================================================
                        CARTOGRAPHIE DU SI DE VOLTNET [D2]
====================================================================================

 [ TERRAIN : 60 PARKINGS ]                        [ UTILISATEURS & PARTENAIRES ]
 +-----------------------------------+            +----------------------------+
 | 400 Bornes de recharge :          |            | Conducteurs (Appli mobile) |
 | - 220 ChargeOne A (Firmware v3.2) |            +-------------+--------------+
 | - 120 ChargeOne B (Firmware v3.2) |                          |
 | - 60 VoltBox Mini (Firmware v2.8) |                          | (HTTPS)
 +-----------------+-----------------+                          v
                   |                              +----------------------------+
                   | (HTTPS / Let's Encrypt       | ZONE CLOUD A (Unique) [!]  |
                   |  renouvelé à la main [!])    |                            |
                   |                              |  +----------------------+  |
                   +----------------------------->|  | API Bornes (2 VM)    |  |
                                                  |  | Ubuntu 18.04/Node 16 |  |
 +-----------------------------------+            |  +----------+-----------+  |
 | Prestataire Paiement CB (Externe) |<-----------+             |              |
 | API Bancaire (SLA 99,9 %)         |<-----------+             v              |
 +-----------------------------------+            |  +----------------------+  |
                                                  |  | API Appli (1 VM) [!] |  |
 +-----------------------------------+            |  | Ubuntu 22.04/Node 20 |  |
 | Équipe interne & Parkings         |            |  +----------+-----------+  |
 +-----------------+-----------------+            |             |              |
                   |                              |             v              |
                   |                              |  +----------------------+  |
                   +----------------------------->|  | Back-office (1 VM)   |  |
                                                  |  | Debian 12 / PHP 8.1  |  |
 +-----------------------------------+            |  +----------+-----------+  |
 | AU BUREAU (Hors Cloud)            |            |             |              |
 | +-------------------------------+ |            |             v              |
 | | Serveur Facturation [!]       | | (Lecture)  |  +----------------------+  |
 | | Serveur physique unique       +-+----------->|  | Base de données [!]  |  |
 | | Win. Server 2016 / SQL 2016   | |            |  | 1 VM PostgreSQL 12   |  |
 | +-------------------------------+ |            |  | Disque 500 Go        |  |
 +-----------------------------------+            |  +----------+-----------+  |
                                                  |             |              |
 +-----------------------------------+            |             v              |
 | SUPERVISION [!]                   |            |  +----------------------+  |
 | Script mail si l'API ne répond pas|            |  | Sauvegardes [!]      |  |
 | -> kevin.m@voltnet.fr (parti 2024)|            |  | Dump 3h sur même VM  |  |
 +-----------------------------------+            |  | + copie même région  |  |
                                                  +----------------------------+

 LÉGENDE :
   ---> : Flèche de dépendance fonctionnelle ("A ---> B" signifie "A dépend de B")
   [!]  : Point unique de défaillance (SPOF) ou défaillance critique de conception
====================================================================================

```

### Livrable 1.2 : Liste des points uniques de défaillance (SPOF)

En croisant **\[D2\]**, **\[D3\]** et **\[D5\]**, nous identifions **6 points uniques de défaillance** :

1. **La Zone Cloud A unique \[D2\] :** Toute l'infrastructure cloud (API, BDD, Back-office) est hébergée dans une seule zone de disponibilité. Lorsqu'elle tombe (comme le 09/02 pendant $3\text{ h}$ **\[D3\]**), $100\text{ \%}$ du réseau VoltNet s'arrête.

2. **La VM Base de données PostgreSQL 12 \[D2\] :** Une seule machine virtuelle sans réplication ni bascule automatique, dont dépendent les deux API, le Back-office et la Facturation. Si son disque de $500\text{ Go}$ est plein (14/01 et 11/03 **\[D3\]**) ou si elle sature (26/03 **\[D3\]**), plus rien ne fonctionne.

3. **Le dispositif de sauvegardes \[D2, D5\] :** Le dump nocturne de $3\text{ h}$ est stocké sur la **même VM** que la base de données et copié dans la **même région cloud**, sans jamais avoir fait l'objet d'un test de restauration **\[D2\]**.

4. **Le renouvellement manuel des certificats HTTPS Let's Encrypt \[D2, D3\] :** S'il est oublié, l'API bornes rejette les connexions de toutes les bornes (panne totale du 03/03 **\[D3\]**).

5. **Le serveur physique de Facturation au bureau \[D2\] :** Une machine physique unique dans les locaux de l'entreprise, exposée aux coupures électriques, pannes matérielles ou sinistres locaux.

6. **La VM unique de l'API appli mobile et la Supervision fantôme \[D2, D5\] :** L'API mobile ne tourne que sur une seule VM, et le script de supervision envoie ses alertes à `kevin.m@voltnet.fr`, qui a quitté l'entreprise en 2024 **\[D5\]**.

* **Lequel nous inquiète le plus ?** C'est le couple **Base de données PostgreSQL unique + Sauvegardes non testées dans la même région \[D2, D5\]**. Une simple panne de serveur se redémarre en quelques heures, mais si la VM de base de données subit une corruption critique ou qu'un incident détruit nos ressources dans la région Cloud A, VoltNet risque la perte définitive de ses données de sessions et de facturation, sans même savoir si les sauvegardes sont restaurables ni en combien de temps (comme le reconnaît Julien dans **\[D5\]**).

### Livrable 1.3 : Calcul du coût d'une heure de panne et de la pénalité SLA

* **Coût direct d'une heure de panne selon la tranche horaire \[D4\] :**

  * À $3\text{ h}$ **du matin** (tranche $2\text{ h} - 5\text{ h}$) : $40\text{ € / h}$.

  * À $11\text{ h}$ (tranche $7\text{ h} - 17\text{ h}$) : $500\text{ € / h}$.

  * À $18\text{ h}$ (tranche de pointe $17\text{ h} - 20\text{ h}$) : $1\,000\text{ € / h}$.

* **Coût financier lorsque la panne fait rater le SLA mensuel de** $99,5\text{ \%}$ **\[D4, Art. 4 et 7\] :**

  * Chiffre d'affaires moyen journalier **\[D4\]** : $\approx 10\,000\text{ € / jour}$ (vérification par la somme des tranches horaires de **\[D4\]** : $(2 \times 250) + (3 \times 40) + (2 \times 200) + (10 \times 500) + (3 \times 1\,000) + (4 \times 250) = 500 + 120 + 400 + 5\,000 + 3\,000 + 1\,000 = 10\,020\text{ € / jour}$).

  * Chiffre d'affaires mensuel moyen (base 30 jours) :
    

    $$
    \text{CA}_{\text{mensuel}} = 30 \times 10\,000\text{ €} = 300\,000\text{ €} \quad (\text{ou } 310\,000\text{ € sur un mois de } 31\text{ jours})
    $$

  * Redevance mensuelle normale versée aux parkings (**\[D4\]**, Art. 4 : $15\text{ \%}$ du CA) :
    

    $$
    \text{Redevance} = 300\,000\text{ €} \times 0,15 = 45\,000\text{ €}
    $$

  * Pénalité contractuelle en cas de SLA $< 99,5\text{ \%}$ (**\[D4\]**, Art. 7 : $5\text{ \%}$ de la redevance totale) :
    

    $$
    \text{Pénalité}_{\text{SLA}} = 45\,000\text{ €} \times 0,05 = \mathbf{2\,250\text{ € par mois raté}} \quad (\text{ou } \mathbf{2\,325\text{ €}}\text{ sur } 31\text{ jours})
    $$

  * *Vérification croisée avec **\[D5\]** :* Sophie (DAF) indique que VoltNet a payé $4\,500\text{ €}$ **de pénalités en 2025**, ce qui correspond exactement aux **2 mois ratés** en 2025 (octobre et décembre mentionnés dans **\[D4\]** : $2 \times 2\,250\text{ €} = 4\,500\text{ €}$).

### Livrable 1.4 : Tableau de criticité des composants

| Composant \[D2\] | Criticité | Conséquence métier (« Si ça tombe, alors… ») et impact chiffré \[D3, D4\] | 
| ----- | ----- | ----- | 
| **Base de données PostgreSQL** | **Critique** | **Si ça tombe, alors** tout le SI s'arrête (bornes, appli, facturation) : perte de $40\text{ €}$ à $1\,000\text{ € / h}$ + pénalité SLA de $2\,250\text{ €}$ si l'arrêt mensuel dépasse $3,6\text{ h}$. | 
| **API bornes & Certificat HTTPS** | **Critique** | **Si ça tombe, alors** les $400\text{ bornes}$ ne peuvent plus lancer de recharge : perte immédiate de $40\text{ €}$ à $1\,000\text{ € / h}$ + risque de résiliation des parkings (Art. 9). | 
| **Sauvegardes** | **Critique** | **Si ça tombe** en même temps que la VM de la base, **alors** VoltNet perd son historique de transactions et sa capacité à facturer ses clients. | 
| **API appli mobile** | **Haute** | **Si ça tombe, alors** les clients ne peuvent plus utiliser l'appli (comptes, réservations, lancement mobile), seul le paiement CB sur borne reste actif. | 
| **Paiement CB (API bancaire)** | **Haute** | **Si ça tombe, alors** aucun conducteur sans compte/appli ne peut payer par carte bancaire sur les $400\text{ bornes}$. | 
| **Supervision** | **Haute** | **Si ça tombe** (cas actuel avec l'adresse de Kevin), **alors** le MTTD explose et ce sont les clients mécontents qui nous apprennent nos pannes. | 
| **Bornes (Parc matériel)** | **Moyenne** | **Si une borne isolée tombe, alors** la perte moyenne n'est que de $10\,000\text{ €} \div 400 = 25\text{ € / jour}$, mais si tout un parking tombe (ex : 24 bornes du Grand Large), on perd $6\text{ \%}$ du CA ($600\text{ € / jour}$). | 
| **Serveur de Facturation** | **Moyenne** | **Si ça tombe, alors** les voitures rechargent toujours, mais l'émission des factures et le calcul des redevances prennent du retard (rattrapable après réparation). | 
| **Back-office** | **Basse** | **Si ça tombe, alors** aucune perte directe de recharge, mais l'équipe support et les gérants de parkings n'ont plus accès à leurs tableaux de gestion. | 

### Hypothèses, refus et usage de l'IA (Mission 1)

* **Hypothèse :** L'inventaire **\[D2\]** ayant 14 mois, nous posons l'hypothèse qu'aucun composant caché n'a été ajouté en production depuis le départ de notre prédécesseur, mais un audit des comptes cloud sera fait dès la semaine 1. Pour les pénalités, nous retenons le calcul lissé de la DAF ($300\,000\text{ €}$ de CA mensuel moyen, soit $2\,250\text{ €}$ de pénalité par mois raté) tout en présentant aussi la valeur exacte sur 31 jours ($2\,325\text{ €}$).

* **Ce que nous refusons :** Nous refusons d'appliquer l'annotation *« Ne pas toucher, ça marche »* de **\[D2\]** sur l'API bornes : un composant critique non maintenu est une bombe de sécurité.

* **Usage de l'IA :** Utilisée pour mettre en forme le schéma ASCII de la cartographie à partir de mon analyse de **\[D2\]**.

## Mission 2 — Lundi 14 h : Le diagnostic : que disent les chiffres ?

### Livrable 2.1 : Disponibilité mensuelle au T1 et respect du SLA ($99,5\text{ \%}$)

* **Janvier 2026 (**$31\text{ jours} = 31 \times 24 = 744\text{ h}$**) \[D3\] :**

  * Pannes : 14/01 ($09\text{h}00 - 11\text{h}00 = 2\text{ h}$) + 30/01 ($18\text{h}00 - 19\text{h}30 = 1,5\text{ h}$) = $3,5\text{ h}$ **d'arrêt**.

  * Disponibilité : $\frac{744 - 3,5}{744} = \frac{740,5}{744} = \mathbf{99,53\text{ \%}}$ (quota max à $99,5\text{ \%}$ : $3,72\text{ h}$).

* **Février 2026 (**$28\text{ jours} = 28 \times 24 = 672\text{ h}$**) \[D3\] :**

  * Panne : 09/02 ($14\text{h}00 - 17\text{h}00 = 3\text{ h}$) = $3,0\text{ h}$ **d'arrêt**.

  * Disponibilité : $\frac{672 - 3}{672} = \frac{669}{672} = \mathbf{99,55\text{ \%}}$ (quota max à $99,5\text{ \%}$ : $3,36\text{ h}$).

* **Mars 2026 (**$31\text{ jours} = 744\text{ h}$**) \[D3\] :**

  * Pannes : 03/03 ($1\text{ h}$) + 11/03 ($2\text{ h}$) + 20/03 ($1,5\text{ h}$) + 26/03 ($1,5\text{ h}$) = $6,0\text{ h}$ **d'arrêt**.

  * Disponibilité : $\frac{744 - 6}{744} = \frac{738}{744} = \mathbf{99,19\text{ \%}}$ (ou $99,17\text{ \%}$ sur un mois standard de $720\text{ h}$).

| Mois (2026) | Heures totales | Heures de panne \[D3\] | Disponibilité réelle (SLI) | SLA ($99,5\text{ \%}$) tenu ? | 
| ----- | ----- | ----- | ----- | ----- | 
| **Janvier** | $744\text{ h}$ | $3,5\text{ h}$ ($3\text{ h } 30\text{ min}$) | $99,53\text{ \%}$ | **OUI** (marge restante : $13\text{ min}$) | 
| **Février** | $672\text{ h}$ | $3,0\text{ h}$ ($3\text{ h } 00\text{ min}$) | $99,55\text{ \%}$ | **OUI** (marge restante : $21\text{ min}$) | 
| **Mars** | $744\text{ h}$ | $6,0\text{ h}$ ($6\text{ h } 00\text{ min}$) | $99,19\text{ \%}$ | **NON — SLA RATÉ** (dépassé de $2\text{ h } 17\text{ min}$) | 

### Livrable 2.2 : Calcul du MTTR et du MTBF du trimestre et analyse de la détection

* **Calculs sur l'ensemble du 1er trimestre (**$90\text{ jours} = 744 + 672 + 744 = 2\,160\text{ h}$**) \[D3\] :**

  * Nombre total de pannes : $7\text{ pannes}$.

  * Durée totale d'arrêt : $3,5 + 3,0 + 6,0 = \mathbf{12,5\text{ heures}}$.

  * Temps total de marche : $2\,160\text{ h} - 12,5\text{ h} = \mathbf{2\,147,5\text{ heures}}$.

  * $\text{MTTR}$ **(Temps moyen pour rétablir) :**
    

    $$
    \text{MTTR} = \frac{12,5\text{ h}}{7\text{ pannes}} \approx \mathbf{1,79\text{ h}} \quad (\text{soit } \mathbf{1\text{ h } 47\text{ min}}\text{ par panne})
    $$

  * $\text{MTBF}$ **(Temps moyen entre deux pannes) :**
    

    $$
    \text{MTBF} = \frac{2\,147,5\text{ h}}{7\text{ pannes}} \approx \mathbf{306,79\text{ h}} \quad (\text{soit une panne majeure tous les } \mathbf{12,8\text{ jours}})
    $$

* **Qui a détecté les 7 pannes \[D3\] ?**

  * **3 fois les clients finaux** (appels le 14/01 et le 20/03, plainte sur les réseaux sociaux le 03/03).

  * **2 fois les parkings partenaires** (un parking le 30/01, l'hôtel Le Grand Large le 26/03).

  * **1 fois le fournisseur cloud** (le 09/02).

  * **1 seule fois le support interne** (le 11/03).

* **Conclusion :** Notre supervision automatique a détecté $0\text{ panne sur } 7$ parce que les alertes partent sur l'adresse mail de Kevin, parti en 2024 **\[D2, D5\]**. Ce sont nos clients et nos partenaires mécontents qui font office de système d'alerte, ce qui rallonge considérablement notre temps de détection (MTTD) et donc nos coupures.

### Livrable 2.3 : Coût financier du mois de mars (panne par panne + pénalité)

En croisant les horaires exacts de **\[D3\]** avec la grille horaire de **\[D4\]** :

1. **Panne du 03/03 (**$06\text{h}00 - 07\text{h}00$**, durée** $1\text{ h}$**) :** Tranche $5\text{ h} - 7\text{ h}$ à $200\text{ € / h} \implies 1 \times 200\text{ €} = \mathbf{200\text{ €}}$.

2. **Panne du 11/03 (**$18\text{h}10 - 20\text{h}10$**, durée** $2\text{ h}$**) :**

   * De $18\text{h}10$ à $20\text{h}00$ ($1\text{ h } 50\text{ min} = \frac{110}{60}\text{ h}$) en tranche de pointe $17\text{ h} - 20\text{ h}$ ($1\,000\text{ € / h}$) : $\frac{110}{60} \times 1\,000\text{ €} = 1\,833,33\text{ €}$.

   * De $20\text{h}00$ à $20\text{h}10$ ($10\text{ min} = \frac{10}{60}\text{ h}$) en tranche $20\text{ h} - 24\text{ h}$ ($250\text{ € / h}$) : $\frac{10}{60} \times 250\text{ €} = 41,67\text{ €}$.

   * Sous-total panne du 11/03 : $1\,833,33 + 41,67 = \mathbf{1\,875\text{ €}}$ *(ou* $2\,000\text{ €}$ *en arrondissant à* $2\text{ h}$ *de pointe)*.

3. **Panne du 20/03 (**$18\text{h}30 - 20\text{h}00$**, durée** $1,5\text{ h}$**) :** Tranche $17\text{ h} - 20\text{ h}$ à $1\,000\text{ € / h} \implies 1,5 \times 1\,000\text{ €} = \mathbf{1\,500\text{ €}}$.

4. **Panne du 26/03 (**$17\text{h}45 - 19\text{h}15$**, durée** $1,5\text{ h}$**) :** Tranche $17\text{ h} - 20\text{ h}$ à $1\,000\text{ € / h} \implies 1,5 \times 1\,000\text{ €} = \mathbf{1\,500\text{ €}}$.

* **Total du chiffre d'affaires perdu en mars :**
  

  $$
  200 + 1\,875 + 1\,500 + 1\,500 = \mathbf{5\,075\text{ €}} \quad (\text{ou } 5\,200\text{ € sans prorata des } 10\text{ minutes})
  $$

* **Pénalité SLA du mois de mars \[D4, Art. 7\] :** $2\,250\text{ €}$ (base mensuelle moyenne de $300\text{ k€}$) ou $2\,325\text{ €}$ (base $31\text{ jours}$ à $310\text{ k€}$).

* **Coût total du mois de mars :**
  

  $$
  5\,075\text{ €} + 2\,250\text{ €} = \mathbf{7\,325\text{ €}} \quad (\text{jusqu'à } \mathbf{7\,525\text{ €}}\text{ selon l'arrondi})
  $$

* **Comparaison avec les options de \[D7\] :** En un seul mois, nos pannes nous ont coûté $7\,325\text{ €}$, soit plus cher que le coût annuel cumulé de la supervision Prometheus (**O2 :** $1\,500\text{ € / an}$), de l'environnement de préproduction (**O6 :** $3\,600\text{ € / an}$) et de l'automatisation des certificats (**O7 :** $0\text{ €}$), qui totalisent seulement $5\,100\text{ € / an}$ et auraient évité la quasi-totalité de ces pannes !

### Livrable 2.4 : Risque de résiliation de l'hôtel Le Grand Large et chiffrage sur un an

* **Peut-il résilier dès aujourd'hui ? OUI, immédiatement et sans préavis.**

  * L'article 9 du contrat **\[D4\]** stipule que si le SLA de $99,5\text{ \%}$ n'est pas respecté **trois mois sur douze mois glissants**, le partenaire peut résilier sans préavis.

  * Or, sur les 12 derniers mois glissants (avril 2025 à mars 2026), VoltNet a raté **octobre 2025**, **décembre 2025** **\[D4\]** et **mars 2026** **\[D3, D6\]**. Le seuil fatidique des 3 mois est donc déjà atteint (contrairement à ce qu'espère Karim dans **\[D5\]**, nous n'avons plus aucun droit à l'erreur : Claire Morvan le confirme dans **\[D6\]** en écrivant *« Notre contrat (article 9) nous permet de résilier. Je ne l'ai pas encore fait »*).

* **Que se passe-t-il si avril est raté ?** Claire Morvan mettra sa menace à exécution en signant chez un concurrent et en alertera les autres hôtels de son groupe **\[D5, D6\]**.

* **Chiffrage de la perte financière sur un an \[D4\] :**

  * Chiffre d'affaires annuel de VoltNet : $365\text{ jours} \times 10\,000\text{ €} = 3\,650\,000\text{ € / an}$.

  * Part du Grand Large ($6\text{ \%}$ du CA **\[D4, D5\]**) :
    

    $$
    \text{Perte CA brut annuel} = 3\,650\,000\text{ €} \times 0,06 = \mathbf{219\,000\text{ € / an}}
    $$

  * Même en déduisant les $15\text{ \%}$ de redevance qu'on lui reverse (**\[D4\]**, Art. 4), la perte sèche de marge nette pour VoltNet est de $219\,000\text{ €} \times 0,85 = \mathbf{186\,150\text{ € / an}}$, sans compter l'effet domino sur les autres hôtels du groupe.

### Livrable 2.5 : Regroupement des incidents en problèmes, causes racines et maintenance préventive

| Problème identifié | Incidents reliés \[D3\] | Cause racine probable (« 5 Pourquoi ») \[D2, D5, D8\] | Maintenance qui l'aurait évité | 
| ----- | ----- | ----- | ----- | 
| **P1. Saturation du disque de la BDD** | 14/01 ($2\text{ h}$) et 11/03 ($2\text{ h}$) | Logs non purgés sur le disque de $500\text{ Go}$ car aucune rotation automatique n'est configurée et les alertes vont sur la boîte mail de Kevin **\[D2, D5\]**. | **Préventive systématique** (purge/rotation auto des logs) + **Préventive conditionnelle** (alerte disque à $80\text{ \%}$). | 
| **P2. Mises en prod défectueuses le vendredi soir** | 30/01 ($1,5\text{ h}$, v4.7) et 20/03 ($1,5\text{ h}$, v4.9) | Thomas déploie le vendredi à $18\text{ h}$ (pleine heure de pointe à $1\,000\text{ € / h}$) en testant uniquement sur son PC faute de préprod et de règles de changement **\[D5\]**. | **Gestion des changements** (fenêtre mardi $2\text{ h} - 5\text{ h}$) + **Préproduction** (O6) pour tester avant la prod. | 
| **P3. Expiration du certificat HTTPS** | 03/03 ($1\text{ h}$) | Le certificat Let's Encrypt (valable 90 jours) est renouvelé à la main sans aucun suivi ni alerte d'échéance **\[D2\]**. | **Préventive systématique** (script Certbot auto, O7) + **Conditionnelle** (alerte à $\text{J}-15$). | 
| **P4. Saturation BDD par requête lente** | 26/03 ($1,5\text{ h}$) | Absence de tests de charge en préproduction et aucune supervision du temps d'exécution des requêtes SQL ou du CPU de la base **\[D2, D3\]**. | **Préventive conditionnelle** (alerte sur latence SQL / CPU) + optimisation d'index en préproduction. | 
| **P5. Défaillance de la Zone Cloud A** | 09/02 ($3\text{ h}$) | Architecture hébergée dans une seule zone cloud sans redondance ni bascule automatique **\[D2\]**. | **Maintenance évolutive** (architecture haute disponibilité sur 2 zones cloud, O1). | 
| **P6. Fuite mémoire sur bornes ChargeOne v3.2** | $148\text{ redémarrages}$ au T1 (sur $162$) | Le support ne fait que du **palliatif** (redémarrer les bornes qui plantent au bout de 9 jours). La cause racine est une **fuite mémoire du firmware v3.2**, corrigée en février par la v3.3 mais non déployée par peur d'écraser la config de $340\text{ bornes}$ **\[D3, D5, D8\]**. | **Corrective curative** (déployer le firmware correctif par vagues avec sauvegarde de config) + **Préventive systématique** (reboot auto hebdomadaire à $3\text{ h}$ du matin en attendant). | 

### Hypothèses, refus et usage de l'IA (Mission 2)

* **Hypothèse :** Dans le calcul du MTTR et du MTBF, nous intégrons les 7 pannes majeures de la plateforme **\[D3\]**. Le délai moyen de $58\text{ h}$ du prestataire Eurotech le week-end **\[D3\]** s'explique par l'absence de clause week-end dans son OLA actuel **\[D5\]**.

* **Ce que nous refusons :** Nous refusons que le support (Inès) continue de faire $148\text{ redémarrages}$ palliatifs par trimestre sans traiter la cause racine du firmware **\[D5, D8\]**.

* **Usage de l'IA :** Vérification de la cohérence des calculs de prorata horaire sur la panne du 11 mars.

## Mission 3 — Mardi 15 h : La bombe à retardement : l'obsolescence

### Livrables 3.1 et 3.2 : Tableau d'obsolescence, sources, urgence et versions cibles

Nous sommes en **avril 2026**. Voici l'état réel du support de sécurité (MCS) de chaque composant de **\[D2\]** :

| Composant \[D2\] | Version actuelle | Date de fin de support (EOL) | Statut d'urgence (en avril 2026) | Version cible recommandée | Source officielle (consultée en avril 2026) | 
| ----- | ----- | ----- | ----- | ----- | ----- | 
| **API bornes (OS)** | Ubuntu 18.04 LTS | 31 mai 2023 (Standard) | **Déjà sans correctifs** (depuis 3 ans) | **Ubuntu 24.04 LTS** (support 2029) | `ubuntu.com/about/release-cycle` | 
| **API bornes (Runtime)** | Node.js 16 | 11 sept. 2023 | **Déjà sans correctifs** (depuis 2,5 ans) | **Node.js 22 LTS** (support 2027) | `nodejs.org/en/about/previous-releases` | 
| **Base de données** | PostgreSQL 12 | 14 nov. 2024 | **Déjà sans correctifs** (depuis 17 mois) | **PostgreSQL 16 ou 17** (support 2028/2029) | `postgresql.org/support/versioning` | 
| **Back-office (PHP)** | PHP 8.1 | 31 déc. 2025 | **Déjà sans correctifs** (depuis 3 mois) | **PHP 8.3 ou 8.4** (support 2027/2028) | `php.net/supported-versions.php` | 
| **API appli (Runtime)** | Node.js 20 | 30 avril 2026 | **Moins de 12 mois** (échéance ce mois-ci !) | **Node.js 22 LTS** (support 2027) | `nodejs.org/en/about/previous-releases` | 
| **Facturation (BDD)** | SQL Server 2016 | 14 juillet 2026 | **Moins de 12 mois** (dans 3 mois) | **SQL Server 2022** (ou migration PostgreSQL) | `learn.microsoft.com/lifecycle` | 
| **Facturation (OS)** | Windows Server 2016 | 12 janvier 2027 | **Moins de 12 mois** (dans 9 mois) | **Windows Server 2022 / 2025** | `learn.microsoft.com/lifecycle` | 
| **API appli (OS)** | Ubuntu 22.04 LTS | Avril 2027 | **Plus tard** (dans 12 mois) | **Ubuntu 24.04 LTS** | `ubuntu.com/about/release-cycle` | 
| **Bornes VoltBox Mini** | Firmware v2.8 | Juin 2027 **\[D2\]** | **Plus tard** (dans 14 mois) | **Remplacement matériel (ChargeOne)** | Courrier constructeur **\[D2\]** | 
| **Back-office (OS)** | Debian 12 | Juin 2028 (LTS) | **Plus tard** (dans 2 ans) | **Debian 13** (dès besoin) | `wiki.debian.org/LTS` | 

* **Combien de composants critiques sont déjà sans correctifs ?** Les **2 composants les plus critiques** de toute l'entreprise — l'**API bornes** (Ubuntu 18.04 + Node.js 16) et la **Base de données PostgreSQL 12** — sont **déjà totalement privés de correctifs de sécurité** depuis 2023 et 2024 ! La consigne *« Ne pas toucher, ça marche »* de **\[D2\]** confond le MCO (ça tourne encore) et le MCS (la porte est grande ouverte aux failles publiques).

### Livrable 3.3 : Analyse du serveur de Facturation (Windows Server 2016 et SQL Server 2016)

* **Sera-t-il encore maintenu dans un an (en avril 2027) ?** **Non.** SQL Server 2016 sort du support étendu Microsoft le **14 juillet 2026** (dans 3 mois) et Windows Server 2016 sort du support étendu le **12 janvier 2027** (dans 9 mois).

* **Ce que ça change pour la facturation :** Au-delà du risque de sécurité majeur sur des données financières et comptables (aucun correctif en cas de faille exploitée par un ransomware), ce serveur est une **machine physique isolée dans les bureaux \[D2\]** achetée il y a plusieurs années. S'il tombe en panne matérielle ou subit un sinistre au bureau, l'entreprise ne peut plus facturer ni calculer les redevances des parkings. Il faut donc planifier à la fois sa mise à niveau logicielle et sa virtualisation dans le cloud.

### Livrable 3.4 : Les 60 bornes VoltBox Mini et calendrier de remplacement chiffré

* **Que se passe-t-il après juin 2027 ?** Une borne de recharge n'est pas un simple appareil électrique : c'est un **ordinateur connecté à Internet (4G/Wi-Fi) et relié à un terminal de paiement par carte bancaire \[D2\]**. Après juin 2027, la moindre vulnérabilité découverte dans le firmware v2.8 ne sera jamais corrigée. Conserver ces bornes exposerait VoltNet à un piratage à distance, au détournement de paiements CB (non-conformité bancaire et RGPD) ou à une intrusion sur notre réseau central via les bornes (défaillance grave du MCS).

* **Coût total du remplacement \[D7, O14\] :**
  

  $$
  60\text{ bornes} \times 1\,800\text{ €} = \mathbf{108\,000\text{ €}} \quad (\text{pose effectuée par le prestataire})
  $$

* **Calendrier de remplacement sur deux budgets annuels :**
  Il est impossible de financer $108\,000\text{ €}$ sur l'enveloppe de maintenance de $45\,000\text{ €}$ de cette année **\[D1, D7\]**, d'autant que les bornes sont encore supportées jusqu'en juin 2027 **\[D2\]**. Nous proposons un lissage en investissement matériel (CAPEX) sur deux exercices :

  * **Phase 1 — Budget 2026 (T4 2026) :** Remplacement des **20 premières bornes** situées sur les parkings les plus fréquentés ($20 \times 1\,800\text{ €} = \mathbf{36\,000\text{ €}}$ financés sur le budget d'investissement matériel de fin d'année, ou $0\text{ €}$ sur l'enveloppe OPEX de $45\,000\text{ €}$ de Marc). Les 20 bornes démontées en bon état servent de stock de pièces détachées gratuites pour maintenir les 40 restantes jusqu'en juin 2027.

  * **Phase 2 — Budget 2027 (T1 et T2 2027, avant le 30 juin 2027) :** Remplacement des **40 bornes restantes** ($40 \times 1\,800\text{ €} = \mathbf{72\,000\text{ €}}$ inscrits au budget 2027 dès l'automne) avant la date butoir de fin de support logiciel de juin 2027 *(ou découpage* $50/50$ *:* $30\text{ bornes} = 54\,000\text{ €}$ *sur le budget 2026 et* $30\text{ bornes} = 54\,000\text{ €}$ *au S1 2027)*.

### Hypothèses, refus et usage de l'IA (Mission 3)

* **Hypothèse :** On suppose que VoltNet n'a pas souscrit aux extensions payantes *Ubuntu Pro (ESM)* ou *Microsoft ESU*, puisque l'inventaire **\[D2\]** a été laissé à l'abandon depuis 14 mois.

* **Ce que nous refusons :** Nous refusons de ponctionner les $45\,000\text{ €}$ d'urgence de cette année pour remplacer dès aujourd'hui des bornes VoltBox Mini qui sont encore supportées pendant 14 mois, au détriment de nos serveurs centraux déjà obsolètes.

* **Usage de l'IA :** Vérification rapide des dates exactes de fin de support (EOL) des versions logicielles citées dans **\[D2\]**.

## Mission 4 — Mercredi 9 h : 45 000 € et 60 jours : l'arbitrage

### Livrable 4.1 : Tableau d'analyse complète des 14 options \[D7\]

| \# | Option \[D7\] | Problème (M2) / Risque (M3) réglé | Gain annuel estimé (calculé sur D3/D4) | Coût / an | Charge | Choix | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **O1** | 2e zone cloud + réplication BDD | Panne Cloud A (09/02) + SPOF BDD **\[D2, D3\]** | Évite $\approx 6\,000\text{ €/an}$ de coupures + sécurise le SLA et Le Grand Large ($219\text{ k€/an}$) | $10\,000\text{ €}$ | $8\text{ j/h}$ | **RETENUE** | 
| **O2** | Supervision Prometheus + Grafana | $0\text{ panne}$ détectée, disques pleins (14/01, 11/03) et base lente (26/03) | Évite $> 15\,000\text{ €/an}$ de pannes et pénalités SLA ($5\,825\text{ €}$ rien qu'en mars) | $1\,500\text{ €}$ | $6\text{ j/h}$ | **RETENUE** | 
| **O3** | Supervision SaaS clés en main | Même besoin que O2 | Même gain que O2, mais coûte $7\,500\text{ €/an}$ de plus que O2 chaque année | $9\,000\text{ €}$ | $2\text{ j/h}$ | **Refusée** | 
| **O4** | Astreinte tournante (2 admins) | Pannes soir/nuit/WE sans réaction **\[D5\]**, divise le MTTR par 3 | Réduit la durée des pannes de pointe ($1\,000\text{ €/h}$), gain estimé $\approx 10\,000\text{ €/an}$ | $8\,000\text{ €}$ | $1\text{ j/h}$ | **RETENUE** | 
| **O5** | Sauvegarde immuable autre région + test mensuel | Risque fatal de perte de la BDD et des backups sur la même VM **\[D2, D5\]** | Assurance vitale contre la perte totale de facturation ($3,65\text{ M€/an}$ de CA) | $2\,400\text{ €}$ | $3\text{ j/h}$ | **RETENUE** | 
| **O6** | Préproduction | Bugs de mise en prod v4.7 (30/01) et v4.9 (20/03) **\[D3, D5\]** | $3\,000\text{ €}$ de CA perdu au T1 $\implies \approx 12\,000\text{ €/an}$ évités + protège le SLA | $3\,600\text{ €}$ | $5\text{ j/h}$ | **RETENUE** | 
| **O7** | Certificats HTTPS automatiques | Panne certificat expiré du 03/03 **\[D2, D3\]** | Évite $200\text{ €}$ à $3\,000\text{ €}$ par oubli trimestriel pour $0\text{ €}$ de coût | $0\text{ €}$ | $1\text{ j/h}$ | **RETENUE** | 
| **O8** | Migration API bornes (OS + Node) | Obsolescence critique Ubuntu 18.04 + Node 16 sans patchs depuis 2023 | Supprime le risque d'exploitation de CVE critiques sur les $400\text{ bornes}$ | $0\text{ €}$ | $15\text{ j/h}$ | **RETENUE** | 
| **O9** | Migration PostgreSQL | Obsolescence critique PostgreSQL 12 sans patchs depuis fin 2024 | Sécurise le cœur du SI et améliore les performances (panne du 26/03) | $0\text{ €}$ | $8\text{ j/h}$ | **RETENUE** | 
| **O10** | Migration Facturation | Fin de support SQL/Windows 2016 (juil. 2026 / janv. 2027) | Composant de criticité moyenne (ne coupe pas les bornes), isolé au bureau | $6\,000\text{ €}$ | $20\text{ j/h}$ | **Reportée** | 
| **O11** | Contrat support ChargeOne (48 h) | $148\text{ redémarrages}$ en v3.2 + sécurise la MAJ des $340\text{ bornes}$ **\[D3, D8\]** | Économise des dizaines d'heures de support à Inès + garantit les patchs sous 48 h | $6\,000\text{ €}$ | $0\text{ j/h}$ | **RETENUE** | 
| **O12** | Avenant Eurotech ($24\text{ h}$ le WE) | $9\text{ pannes}$ de bornes le WE au T1 (délai $58\text{ h}$ au lieu de $24\text{ h}$) **\[D3, D5\]** | Gain financier faible : gagner $34\text{ h}$ sur $36\text{ bornes/an}$ ne sauve que $\approx 1\,275\text{ €/an}$ | $10\,800\text{ €}$ | $0\text{ j/h}$ | **Refusée** | 
| **O13** | Passer sur Kubernetes | Aucun problème de **\[D3\]** résolu directly **\[D5\]** | Trop coûteux en temps ($67\text{ \%}$ de l'année) et ne règle ni les disques pleins ni le code | $12\,000\text{ €}$ | $40\text{ j/h}$ | **Refusée** | 
| **O14** | Remplacer les 60 VoltBox Mini | Fin de support en juin 2027 **\[D2\]** | Hors budget cette année ($108\text{ k€} > 45\text{ k€}$) et supporté jusqu'en juin 2027 | $108\,000\text{ €}$ | Prest. | **Reportée** | 

### Livrable 4.2 : Justification détaillée du gain financier sur 4 options (démonstration ROI pour Sophie)

1. **Couple Supervision (O2 :** $1\,500\text{ € / an}$**) + Certificats auto (O7 :** $0\text{ €}$**) :**

   * En appliquant O2 et O7 au 1er trimestre **\[D3\]**, nous aurions **totalement évité** les deux pannes de disque plein (14/01 : $2\text{ h}$ à $500\text{ €/h} = 1\,000\text{ €}$ ; 11/03 : $1\,875\text{ €}$) ainsi que la panne de certificat expiré (03/03 : $200\text{ €}$), et nous aurions détecté la requête lente du 26/03 ($1\,500\text{ €}$) avant la saturation totale.

   * Rien que sur le mois de mars, le temps de panne tombait de $6\text{ h}$ à $1,5\text{ h}$ (le SLA de $99,5\text{ \%}$ était donc respecté !). **Gain direct dès le premier trimestre :** $1\,000 + 1\,875 + 200 + 1\,500 + 2\,250\text{ € (pénalité SLA évitée)} = \mathbf{6\,825\text{ € économisés en 3 mois}}$ (soit plus de $20\,000\text{ € / an}$) pour un coût annuel de seulement $1\,500\text{ €}$ !

2. **Préproduction (O6 :** $3\,600\text{ € / an}$**) associée à la politique de changement :**

   * Les deux bugs de mise en production du vendredi soir (30/01 et 20/03) ont coupé la plateforme pendant $3\text{ h}$ en pleine tranche de pointe à $1\,000\text{ € / h}$, coûtant $3\,000\text{ €}$ **au T1** **\[D3, D4\]**. Sur une année complète (4 trimestres au même rythme), la préproduction évite $12\,000\text{ € / an}$ de pertes directes pour un coût de $3\,600\text{ € / an}$ (rentabilisée en moins de 4 mois).

3. **Pourquoi nous refusons l'avenant week-end Eurotech (O12 :** $+30\text{ \%}$ **du forfait) par le calcul :**

   * Le forfait actuel d'Eurotech est de $3\,000\text{ € / mois}$, soit $36\,000\text{ € / an}$ **\[D5\]**. L'option O12 ($+30\text{ \%}$) coûte donc $36\,000 \times 0,30 = \mathbf{10\,800\text{ € / an}}$.

   * Or, d'après **\[D3\]**, il n'y a eu que $9\text{ interventions}$ **le week-end sur tout le T1** (soit $36\text{ par an}$), avec un délai moyen de $58\text{ h}$ au lieu de $24\text{ h}$ (écart de $34\text{ h}$). Comme une borne isolée rapporte en moyenne $10\,000\text{ €} \div 400 = 25\text{ € / jour}$ (soit $\approx 1,04\text{ € / h}$), gagner $34\text{ h}$ sur $36\text{ bornes}$ par an ne rapporte que :
     

     $$
     36 \times 34\text{ h} \times 1,04\text{ €/h} \approx \mathbf{1\,275\text{ € / an}}
     $$

   * Payer $10\,800\text{ € / an}$ pour sauver $1\,275\text{ € / an}$ (et alors que le SLA de $99,5\text{ \%}$ ne porte que sur la plateforme **\[D4\]**, et que le correctif firmware v3.4 va déjà supprimer $90\text{ \%}$ des blocages de bornes) serait une perte financière sèche. Sophie appréciera cette rigueur budgétaire !

### Livrable 4.3 : Sélection finale et vérification des deux plafonds

* **Options retenues (9 options) :** **O1, O2, O4, O5, O6, O7, O8, O9, O11**.

* **Total financier annuel :**
  

  $$
  10\,000\text{ (O1)} + 1\,500\text{ (O2)} + 8\,000\text{ (O4)} + 2\,400\text{ (O5)} + 3\,600\text{ (O6)} + 0\text{ (O7)} + 0\text{ (O8)} + 0\text{ (O9)} + 6\,000\text{ (O11)} = \mathbf{31\,500\text{ € / an}}
  $$

  
  $\implies$ **Respecte largement la limite de** $45\,000\text{ €}$ (nous laissons $13\,500\text{ €}$ **de marge de sécurité** à la DAF).

* **Total en jours/homme :**
  

  $$
  8\text{ (O1)} + 6\text{ (O2)} + 1\text{ (O4)} + 3\text{ (O5)} + 5\text{ (O6)} + 1\text{ (O7)} + 15\text{ (O8)} + 8\text{ (O9)} + 0\text{ (O11)} = \mathbf{47\text{ jours/homme}}
  $$

  
  $\implies$ **Respecte la limite de** $60\text{ j/h}$ (les $13\text{ j/h}$ **restants** permettent d'absorber le déploiement des firmwares ChargeOne, la mise en place de la purge des logs, la montée de version Node.js de l'API appli mobile et la préparation du dossier de migration de la facturation).

### Livrable 4.4 : Réponse à Thomas sur Kubernetes (5 lignes max) et liste des reports

* **Réponse à Thomas (5 lignes) :**

  > « Thomas, passer la plateforme sur Kubernetes est une excellente vision cible pour industrialiser nos déploiements à moyen terme, mais nous ne pouvons pas le lancer cette année. Ce projet absorberait à lui seul $40\text{ jours/homme}$ sur les $60$ disponibles pour toute l'équipe, ce qui nous empêcherait de migrer en urgence l'API bornes (Ubuntu 18.04 / Node 16) et PostgreSQL 12 qui ne reçoivent plus aucun correctif de sécurité. En revanche, pour te faciliter la vie dès maintenant, je débloque le budget pour te créer un vrai environnement de préproduction (O6) et doubler notre zone cloud (O1). Une fois nos versions remises au carré et nos pannes stoppées, on réétudiera la conteneurisation pour la feuille de route de l'an prochain. »

* **Ce que nous reportons à l'année prochaine (et pourquoi) :**

  1. **O10 — Migration du serveur de Facturation (**$6\,000\text{ €}$**,** $20\text{ j/h}$**) :** Sa criticité est moyenne (une panne du serveur au bureau n'empêche aucune borne de recharger ni d'encaisser) et Windows Server 2016 est supporté jusqu'en janvier 2027. L'ajouter cette année ferait passer la charge à $47 + 20 = 67\text{ j/h}$ ($> 60\text{ j/h}$). Nous préparons la maquette en fin d'année avec le reliquat de jours/homme et basculons début janvier 2027.

  2. **O14 — Remplacement des 60 VoltBox Mini (**$108\,000\text{ €}$**) :** Le support logiciel est assuré jusqu'en juin 2027 **\[D2\]** ; le remplacement est planifié sur le budget CAPEX 2026/2027 avant l'échéance.

## Mission 5 — Mercredi 15 h : Les règles du jeu : priorités et engagements

### Livrable 5.1 : Matrice de priorité VoltNet (Impact $\times$ Urgence)

| Impact \\ Urgence | **Urgence Haute** (Heures de pointe $7\text{ h} - 20\text{ h}$ ou panne totale immédiate) | **Urgence Moyenne** (Heures intermédiaires ou contournement possible) | **Urgence Basse** (Nuit $2\text{ h} - 5\text{ h}$ ou impact différé) | 
| ----- | ----- | ----- | ----- | 
| **Impact Fort** (Toute la plateforme, toutes les bornes ou sécurité critique) | **P1 — Critique**   Prise en charge : $< 15\text{ min}$   *Ex : Base PostgreSQL ou API bornes HS, faille critique CVSS* $9,8$*.* | **P2 — Haute**   Prise en charge : $< 1\text{ h}$   *Ex : API Paiement CB en panne (mais le paiement via l'appli fonctionne).* | **P3 — Moyenne**   Prise en charge : $< 4\text{ h}$   *Ex : Perte de redondance d'une VM API bornes sur les 2 à* $3\text{ h}$ *du matin.* | 
| **Impact Moyen** (Un parking partenaire complet HS ou un service interne) | **P2 — Haute**   Prise en charge : $< 1\text{ h}$   *Ex : Les 24 bornes de l'hôtel Le Grand Large hors ligne à* $18\text{ h}$*.* | **P3 — Moyenne**   Prise en charge : $< 4\text{ h}$   *Ex : Serveur de facturation arrêté au bureau en journée.* | **P4 — Basse**   Prise en charge : $< 24\text{ h}$   *Ex : Back-office lent ou indisponible le dimanche soir.* | 
| **Impact Faible** (Une borne isolée ou bug cosmétique) | **P3 — Moyenne**   Prise en charge : $< 4\text{ h}$ (heures ouvrées)   *Ex : Borne isolée bloquée le dimanche à* $18\text{ h}$ *avec un client au téléphone.* | **P4 — Basse**   Prise en charge : $< 24\text{ h}$ ouvrées   *Ex : Borne isolée signalée hors ligne en pleine journée sans appel client.* | **P4 — Basse**   Prise en charge : $< 48\text{ h}$ ouvrées   *Ex : Borne isolée qui tombe le mardi à* $3\text{ h}$ *du matin ou bug d'affichage.* | 

* **Comparaison entre une borne isolée le dimanche à** $18\text{ h}$ **et le mardi à** $3\text{ h}$ **:**
  Non, elles n'ont pas la même priorité opérationnelle ! Bien que leur **impact** soit identique (Faible : $1\text{ borne sur } 400$), leur **urgence** est très différente :

  * Le **dimanche à** $18\text{ h}$ se situe en pleine tranche de pointe ($1\,000\text{ € / h}$ **\[D4\]**) avec une forte probabilité qu'un conducteur soit bloqué devant la borne (**P3** si un client appelle l'assistance pour un reboot rapide à distance, sinon **P4**).

  * Le **mardi à** $3\text{ h}$ **du matin** se situe en tranche creuse ($40\text{ € / h}$ **\[D4\]**) où quasiment personne ne recharge : l'urgence est basse (**P4**), aucune alerte ne doit réveiller l'astreinte de nuit et le ticket sera traité à l'ouverture du support par Inès à $8\text{ h}$.

### Livrable 5.2 : Fixation du SLO interne de la plateforme

* **Choix du SLO :** Le contrat partenaires (SLA **\[D4\]**) exige $99,5\text{ \%}$ de disponibilité mensuelle (soit $3\text{ h } 36\text{ min} = 216\text{ minutes}$ d'arrêt max sur un mois de $30\text{ jours}$). Pour être alertés bien avant de payer des pénalités, nous fixons notre **SLO interne à** $99,8\text{ \%}$ (comme recommandé dans le cours).

* **Traduction en minutes de panne autorisées par mois :**

  * Sur un mois de $30\text{ jours}$ ($720\text{ h} = 43\,200\text{ minutes}$) :
    

    $$
    43\,200 \times (1 - 0,998) = 43\,200 \times 0,002 = \mathbf{86,4\text{ minutes}} \quad (\text{soit } \mathbf{1\text{ h } 26\text{ min}}\text{ max par mois})
    $$

  * Sur un mois de $31\text{ jours}$ ($744\text{ h} = 44\,640\text{ minutes}$) :
    

    $$
    44\,640 \times 0,002 = \mathbf{89,3\text{ minutes}} \quad (\text{soit } \mathbf{1\text{ h } 29\text{ min}}\text{ max par mois})
    $$

  * Cela nous laisse une **marge de sécurité de plus de** $2\text{ heures}$ ($130\text{ minutes}$) entre le dépassement de notre objectif interne (SLO) et la violation du contrat client (SLA).

### Livrable 5.3 : Règle de gestion des changements (5 lignes maximum)

Les mises en production d'API du vendredi soir sont des **changements normaux** qui ne doivent plus jamais être poussés sans filet en pleine heure de pointe à $1\,000\text{ € / h}$ **\[D3, D4, D5\]**. Désormais, toute mise en production applicative ou infrastructure hors urgence de sécurité est **strictement interdite le vendredi, le week-end et en journée entre** $6\text{ h}$ **et** $24\text{ h}$. Tout changement normal doit obligatoirement avoir été testé avec succès sur le nouvel environnement de **préproduction (O6)** et disposer d'une procédure de **rollback** vérifiée permettant un retour arrière en moins de $10\text{ minutes}$. Les déploiements s'effectuent exclusivement pendant la **fenêtre de maintenance du mardi entre** $2\text{ h}$ **et** $5\text{ h}$ **du matin** (tranche creuse à $40\text{ € / h}$). Enfin, chaque changement est soumis à la validation écrite préalable du **Responsable de la maintenance** (seul approbateur **A** du CAB).

### Hypothèses et refus (Mission 5)

* **Hypothèse :** On considère que les coupures programmées en fenêtre de maintenance ($2\text{ h} - 5\text{ h}$) seront réduites à quasi zéro dès le mois 6 grâce au déploiement sans coupure sur les 2 zones cloud (O1).

* **Ce que nous refusons :** Nous refusons toute mise en production « rapide » demandée un vendredi après-midi, même pour une fonctionnalité commerciale attendue, tant qu'il ne s'agit pas d'une faille de sécurité critique (changement urgent).

## Mission 6 — Jeudi 9 h : Le plan des six prochains mois

### Livrable 6.1 : Choix et justification de la fenêtre de maintenance

* **Créneau retenu :** **Le mardi matin de** $02\text{h}00$ **à** $05\text{h}00$.

* **Justification à partir de \[D4\] :** D'après le tableau du chiffre d'affaires horaire **\[D4\]**, la tranche $2\text{ h} - 5\text{ h}$ est de très loin la moins active de la journée avec seulement $40\text{ € / h}$ (soit $25\text{ fois}$ moins que le créneau $17\text{ h} - 20\text{ h}$ à $1\,000\text{ € / h}$ où Thomas déployait ses mises à jour). Le mardi dans la nuit est choisi car toute l'équipe technique est présente le mardi matin au bureau en cas d'effet de bord résiduel, contrairement au week-end.

* **Coût d'une fenêtre de** $3\text{ heures}$ **si tout est coupé :**
  

  $$
  \text{Coût de coupure} = 3\text{ h} \times 40\text{ € / h} = \mathbf{120\text{ €}}
  $$

### Livrable 6.2 : Plan de maintenance et projets sur 6 mois (Avril à Septembre 2026)

L'ordonnancement respecte strictement les **dépendances techniques** : on installe d'abord les filets de sécurité (supervision O2, certificats O7, sauvegardes O5 et préproduction O6 aux mois 1 et 2) avant de lancer les migrations lourdes (PostgreSQL O9 et API bornes O8 aux mois 3 à 5), puis la réplication multi-zones (O1 au mois 6) sur des systèmes propres et à jour.

| Mois / Échéance | Action ou Projet (Quoi) | Type de maintenance | Qui réalise | Charge (j/h) | 
| ----- | ----- | ----- | ----- | ----- | 
| **Mois 1 (Avril — Sem. 1)** | Déploiement d'urgence du firmware v3.4 sur les 340 bornes ChargeOne (suite alerte M8) + souscription support O11 | Corrective / Sécurité (MCS) | Thomas + Julien + Léa | $2\text{ j/h}$ *(pris sur marge)* | 
| **Mois 1 (Avril — Sem. 1)** | **O7 :** Automatisation des certificats Let's Encrypt (Certbot) + script de purge/rotation auto des logs PostgreSQL | Préventive systématique | Léa | $1\text{ j/h}$ (O7) + $1\text{ j/h}$ *(marge)* | 
| **Mois 1 (Avril — Sem. 2-4)** | **O2 + O4 :** Déploiement de la supervision Prometheus/Grafana (correction mail Kevin) et lancement de l'astreinte tournante | Projet / Préventive conditionnelle | Julien + Léa | $6\text{ j/h}$ (O2) + $1\text{ j/h}$ (O4) | 
| **Mois 2 (Mai — Sem. 1-2)** | **O5 :** Mise en place des sauvegardes immuables dans une autre région cloud + 1er test complet de restauration | Projet / Préventive | Julien | $3\text{ j/h}$ (O5) | 
| **Mois 2 (Mai — Sem. 3-4)** | **O6 :** Création de l'environnement de préproduction (copie réduite de la prod) pour valider les futurs changements | Projet | Julien + Thomas | $5\text{ j/h}$ (O6) | 
| **Mois 3 (Juin)** | **O9 :** Migration de la base PostgreSQL 12 vers PostgreSQL 16 (testée en préprod O6, sauvegardée par O5, bascule mardi $2\text{ h}$) | Adaptative (MCS) | Julien + Thomas | $8\text{ j/h}$ (O9) | 
| **Mois 4 et 5 (Juil. - Août)** | **O8 :** Migration des 2 VM API bornes (Ubuntu 18.04 $\rightarrow$ 24.04 LTS et Node.js 16 $\rightarrow$ 22 LTS) + montée Node 20 $\rightarrow$ 22 sur API appli | Adaptative (MCS) | Thomas + Julien | $15\text{ j/h}$ (O8) + $2\text{ j/h}$ *(marge)* | 
| **Mois 6 (Septembre)** | **O1 :** Ouverture de la 2e zone cloud, réplication des API et de la base PostgreSQL 16, tests de bascule automatique | Évolutive (MCO) | Julien + Léa | $8\text{ j/h}$ (O1) | 
| **Récurrent (Mois 1 à 6)** | Test mensuel de restauration des sauvegardes ($0,5\text{ j/mois}$) + application des patchs de sécurité OS mensuels ($0,5\text{ j/mois}$) | Préventive systématique | Léa + Julien | $6\text{ j/h}$ *(pris sur marge)* | 
| **TOTAL SUR 6 MOIS** | **Tous les projets retenus (O1, O2, O4, O5, O6, O7, O8, O9, O11) + actions préventives et correctives** | — | **Équipe VoltNet** | $47\text{ j/h}$ **(options) +** $11\text{ j/h}$ **=** $58\text{ j/h}$ | 

* **Vérification de la charge :** Le total de $58\text{ jours/homme}$ ($47\text{ j/h}$ des options de **\[D7\]** + $11\text{ j/h}$ de tâches complémentaires et récurrentes) respecte le plafond de $60\text{ jours/homme}$ disponible pour l'équipe **\[D7\]**.

### Livrable 6.3 : Matrice RACI (6 salariés + 1 prestataire, un seul « A » par ligne)

* **R** = Réalise | **A** = Approuve (un seul par ligne) | **C** = Consulté avant | **I** = Informé après.

| Activité clé | Resp. Maintenance (Vous) | Julien (Admin senior) | Léa (Admin junior) | Thomas (Développeur) | Inès (Support) | Karim (Partenariats) | Patrick (Eurotech) | 
| ----- | ----- | ----- | ----- | ----- | ----- | ----- | ----- | 
| **1. Mise en production API / Base de données** | **A** | **R** | C | **R** | I | I | — | 
| **2. Déploiement d'un firmware sur les bornes** | **A** | C | **R** | **R** | I | I | C | 
| **3. Gestion d'un incident critique (P1 / P2)** | **A** | **R** | **R** | C | C | I | I | 
| **4. Sauvegardes et test mensuel de restauration** | **A** | **R** | **R** | C | I | — | — | 
| **5. Intervention physique sur borne en panne** | **A** | — | C | — | C | I | **R** | 

### Hypothèses et refus (Mission 6)

* **Hypothèse :** On considère que les $60\text{ j/h}$ disponibles dans **\[D7\]** couvrent les projets de transformation et que le run quotidien (support d'Inès, petits correctifs) est déjà déduit comme indiqué dans l'encadré de **\[D7\]** ; nous avons néanmoins intégré $11\text{ j/h}$ de marge dans les $60\text{ j/h}$ pour absorber les tests mensuels de restauration et le déploiement du firmware.

* **Ce que nous refusons :** Nous refusons de lancer la migration PostgreSQL (O9) ou API bornes (O8) dès le mois d'avril avant d'avoir terminé et testé les sauvegardes externalisées (O5) et la préproduction (O6).

## Mission 7 — Jeudi 14 h : Ne plus l'apprendre par les clients

### Livrable 7.1 : Tableau des 7 pannes du T1 $\rightarrow$ Indicateur, seuil et gain

| Date et Panne \[D3\] | Indicateur qui l'aurait vue / évitée | Seuil d'alerte | Gain obtenu avec la supervision | 
| ----- | ----- | ----- | ----- | 
| **14/01 — Disque plein BDD (**$2\text{ h}$**)** | Taux d'occupation du disque de la VM PostgreSQL (`node_filesystem_avail_bytes`) | Avertissement : $75\text{ \%}$   Critique : $85\text{ \%}$ | **Panne** $100\text{ \%}$ **évitée** ($2\text{ h}$ et $1\,000\text{ €}$ sauvés : purge des logs déclenchée plusieurs jours avant). | 
| **30/01 — Bug API bornes v4.7 (**$1,5\text{ h}$**)** | Taux d'erreurs HTTP `5xx` et sonde de santé `/health` de l'API bornes | Critique : $> 2\text{ \%}$ d'erreurs `5xx` pendant $2\text{ min}$ | **MTTD réduit à** $2\text{ min}$ (au  |  |  |  |  |  |  |  |  |  |      |  |  |  |  |      |  |  |  |  |   |  |  |  |  |  |   |   ###   |  |  |  |  |  |  |  | ----- | ----- | ----- | ----- | ----- | ----- |  |  |  |  |  |  |   |  |  |  |  |  |  |  |  |  |  |  |  |  |   |  |  |  |  |  |  |   |  |  |  |  |  |  |   |   ###   *   *     1.     2.   ###   *   *   ##   ###   *   *   *   *     *   ###   *     *     *      *   *     *     *      *      *    *   |  |  |  |  |  |  | ----- | ----- | ----- | ----- | ----- |  |  |  |  |  |  |  |  |  |   |   |  |  |  |  |  |  |  |  |  |  |  |  |  |   *     1.     2.      3.   ###   >  > > ####  > > 1.  > > 2.  `]` > > ####  > > *   > > *   > > *   > > ####  > > 1.  > >    *  > > 2.  > >    *  > >    *  > > 3.  > >    *  > > 4.  > >    *  > > ####  > > *  > >   *  > >   *  > > *  > >   *  > > ####  > > *   > > *   > > ####  > > 1.  > > 2.  > > 3.   ##   ###   >  > > *  > > *  > > *  > >    > > 1.  > > 2.  > > 3.  > > 4.  > > 5.  > > *  > > *   ###   >  > > 1.  > > 2.  > > 3.  > > 4.   ##   *     *     *     *     *     *   *     *     *     *   *     *     *     *   | 

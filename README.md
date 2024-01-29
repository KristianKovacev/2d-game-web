# README Gioco 2D

l mio progetto è un **gioco 2D**. 

L’obiettivo principale del gioco è raccogliere tutte le monete posizionate nelle varie parti della mappa, ovviamente non sarà così semplice!

Ci saranno degli ostacoli come la lava, delle bombe o delle puntine che renderanno il percorso molto più difficile. Il gioco è composto da un livello, dato che è abbastanza complicato, per colpa di vari bug presenti, si avrà vita infinita. 

![img1-doc](/img/img1-doc.png)

Questo progetto gira tutto intorno a un tag di HTML ovvero <**canvas**>.

![img2-doc](/img/img2-doc.png)

![img3-doc](/img/img3-doc.png)

Come si vede dalle immagini precedenti ho usato **due** **canvas**. Su un canvas ho disegnato la **mappa**, quindi non avevo necessità di aggiornare ogni x millisecondi la posizione di qualche oggetto. Sull’altro canvas ho disegnato gli **oggetti dinamici** (come l’omino e gli ostacoli). Per **aggiornare** la **posizione** di un oggetto si doveva **cancellare** quella precedente, cancellare e caricare la mappa ogni x millisecondi avrebbe solo rallentato il sito.

Ho iniziato il progetto con il capire come funzionano i **movimenti** dell’oggetto disegnato: la velocità, la gravità, la frizione. Ci sono dei bug quando l’omino deve saltare in diagonale.

![img4-doc](/img/img4-doc.png)

Il passo successivo era quello di gestire tutte le **collisioni**. Inizialmente ho gestito quelle con il canvas, per evitare che il mio omino uscisse da esso. E poi ho aggiunto un oggetto ed ho capito come rilevare gli scontri tra il mio omino e questo oggetto.

![img5-doc](/img/img5-doc.png)

Una volta imparato come gestire i movimenti dell’omino, sapevo riconoscere delle semplici collisioni è arrivato il momento di caricare la mappa. Per caricare la mappa si deve conoscere la larghezza del canvas (720px), l’altezza (540) e la dimensione di ogni blocco (30px).

![img6-doc](/img/img6-doc.png)

Ogni numero rappresenta un blocco da 30 px.

Per disegnarla ho usato due cicli for:

![img7-doc](/img/img7-doc.png)

La parte più complicata è stata gestire le **collisioni con la mappa**, alla fine ci sono riuscito, ma ci sono un po' di bug: l’omino a volte si attacca ai lati del blocco.

![img8-doc](/img/img8-doc.png)

Per vedere se l’omino andava contro un blocco su cui poteva camminare o morire ho dovuto innanzitutto convertire i pixel in coordinate e verificare se l’omino era sopra quelle coordinate o no.

![img9-doc](/img/img9-doc.png)

Ho **caricato le immagini** e infine ho disegnato la mappa con un senso logico aggiungendo gli ostacoli, i blocchi, le monete da raccogliere. 

# README Gioco 2D

l mio progetto è un **gioco 2D**. 

L’obiettivo principale del gioco è raccogliere tutte le monete posizionate nelle varie parti della mappa, ovviamente non sarà così semplice!

Ci saranno degli ostacoli come la lava, delle bombe o delle puntine che renderanno il percorso molto più difficile. Il gioco è composto da un livello, dato che è abbastanza complicato, per colpa di vari bug presenti, si avrà vita infinita. 

![img1-doc](/img/img1-doc.png)

Questo progetto gira tutto intorno a un tag di HTML ovvero <**canvas**>.

![img3-doc](/img/img3-doc.png)

Come si vede dalle immagini precedenti ho usato **due** **canvas**. Su un canvas ho disegnato la **mappa**, quindi non avevo necessità di aggiornare ogni x millisecondi la posizione di qualche oggetto. Sull’altro canvas ho disegnato gli **oggetti dinamici** (come l’omino e gli ostacoli). Per **aggiornare** la **posizione** di un oggetto si doveva **cancellare** quella precedente, cancellare e caricare la mappa ogni x millisecondi avrebbe solo rallentato il sito.

Ho iniziato il progetto con il capire come funzionano i **movimenti** dell’oggetto disegnato: la velocità, la gravità, la frizione. Ci sono dei bug quando l’omino deve saltare in diagonale.

![img4-doc](/img/img4-doc.png)

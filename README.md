# README Gioco 2D

l mio progetto è un **gioco 2D**. 

L’obiettivo principale del gioco è raccogliere tutte le monete posizionate nelle varie parti della mappa, ovviamente non sarà così semplice!

Ci saranno degli ostacoli come la lava, delle bombe o delle puntine che renderanno il percorso molto più difficile. Il gioco è composto da un livello, dato che è abbastanza complicato, per colpa di vari bug presenti, si avrà vita infinita. 

![img1-doc](/img/img1-doc.png)

Questo progetto gira tutto intorno a un tag di HTML ovvero <**canvas**>.

```html
<!-- Nel secondo layer ci sarà l'omino e gli ostacoli-->
<canvas id="layer2" class="canvas" width="720" height="540"></canvas>
<!-- Nel primo layer ci sarà la mappa -->
<canvas id="layer1" class="canvas" width="720" height="540"></canvas>
```

```javascript
ctx = canvas.getContext('2d');
ctxMap = canvasMap.getContext("2d");
```

Come si vede dalle immagini precedenti ho usato **due** **canvas**. Su un canvas ho disegnato la **mappa**, quindi non avevo necessità di aggiornare ogni x millisecondi la posizione di qualche oggetto. Sull’altro canvas ho disegnato gli **oggetti dinamici** (come l’omino e gli ostacoli). Per **aggiornare** la **posizione** di un oggetto si doveva **cancellare** quella precedente, cancellare e caricare la mappa ogni x millisecondi avrebbe solo rallentato il sito.

Ho iniziato il progetto con il capire come funzionano i **movimenti** dell’oggetto disegnato: la velocità, la gravità, la frizione. Ci sono dei bug quando l’omino deve saltare in diagonale.

```javascript
speed() {
    // Cambio la posizione dell'oggetto
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    // Frizione
    this.speedX *= 0.9;
    this.speedY *= 0.9;
}
```

Il passo successivo era quello di gestire tutte le **collisioni**. Inizialmente ho gestito quelle con il canvas, per evitare che il mio omino uscisse da esso. E poi ho aggiunto un oggetto ed ho capito come rilevare gli scontri tra il mio omino e questo oggetto.

```javascript
crashWith(other) {
    if (this.top > other.bottom || this.right < other.left ||
        this.bottom < other.top || this.left > other.right) {
        // console.log("nessuno scontro!");
        return false;
    } else {
        return true;
    }
}
```

Una volta imparato come gestire i movimenti dell’omino, sapevo riconoscere delle semplici collisioni è arrivato il momento di caricare la mappa. Per caricare la mappa si deve conoscere la larghezza del canvas (720px), l’altezza (540) e la dimensione di ogni blocco (30px).

```javascript
// Mappa, ogni numero rappresenta un blocco (0 spazio vuoto)
var map = [
    [2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5, 2, 3, 4, 5],
    [2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 12, 12, 0, 0, 0, 0, 0, 0, 2, 3, 4, 21, 2],
    [2, 3, 4, 1, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 3, 11, 5, 4, 3, 2],
    [2, 19, 1, 1, 0, 2, 0, 0, 7, 1, 0, 0, 0, 0, 2, 3, 4, 1, 1, 2, 9, 1, 3, 2],
    [2, 3, 0, 0, 0, 0, 0, 2, 3, 9, 0, 0, 0, 2, 1, 0, 0, 0, 0, 0, 0, 1, 3, 2],
    [2, 3, 0, 0, 2, 0, 0, 0, 0, 0, 2, 3, 4, 1, 0, 0, 0, 0, 0, 0, 0, 0, 3, 2],
    [2, 18, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 2],
    [2, 3, 4, 0, 10, 2, 6, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 2, 1, 2, 20, 2],
    [2, 4, 1, 0, 0, 1, 3, 4, 5, 0, 0, 0, 2, 0, 2, 20, 20, 2, 8, 8, 8, 8, 3, 2],
    [2, 3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 5, 2, 3, 4],
    [2, 18, 0, 0, 0, 0, 0, 0, 0, 0, 2, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 12],
    [4, 18, 0, 2, 1, 2, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 7, 0, 0, 0, 0, 0],
    [2, 18, 0, 0, 0, 0, 0, 2, 3, 4, 5, 0, 0, 2, 0, 0, 0, 2, 2, 2, 1, 2, 0, 0],
    [2, 3, 0, 0, 0, 0, 0, 1, 12, 1, 0, 0, 0, 10, 2, 3, 1, 0, 0, 0, 0, 0, 0, 2],
    [2, 3, 7, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 6, 4],
    [2, 3, 4, 5, 0, 0, 0, 0, 2, 3, 0, 0, 0, 0, 0, 0, 0, 2, 3, 4, 20, 2, 3, 4],
    [13, 1, 0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
    [2, 3, 4, 5, 2, 3, 4, 8, 8, 8, 8, 2, 3, 4, 5, 2, 8, 8, 8, 8, 8, 2, 3, 4]
];
```

Ogni numero rappresenta un blocco da 30 px.

Per disegnarla ho usato due cicli for:

```javascript
let posX = 0;
let posY = 0;
for (let i = 0; i < map.length; i++) {
    for (let j = 0; j < map[i].length; j++) {
        // map[i][j] contiene l'id del blocco
        context.drawImage(images[map[i][j]], posX, posY,
            TILE_DIMENSION, TILE_DIMENSION);

        posX += TILE_DIMENSION;
    }
    posX = 0;
    posY += TILE_DIMENSION;
}
```

La parte più complicata è stata gestire le **collisioni con la mappa**, alla fine ci sono riuscito, ma ci sono un po' di bug: l’omino a volte si attacca ai lati del blocco.

![img8-doc](/img/img8-doc.png)

Per vedere se l’omino andava contro un blocco su cui poteva camminare o morire ho dovuto innanzitutto convertire i pixel in coordinate e verificare se l’omino era sopra quelle coordinate o no.

```javascript
// Per la distanza tra l'omino e il blocco
let DISTANCE = TILE_DIMENSION - 5;
// Converto i pixel nelle coordinate
let x1 = Math.floor((x + DISTANCE) / TILE_DIMENSION);
let x2 = Math.floor((x + 1) / TILE_DIMENSION);
let y1 = Math.floor((y + DISTANCE) / TILE_DIMENSION);
let y2 = Math.floor((y + 1) / TILE_DIMENSION);
let check = false;

// Gli oggetti su cui l'omino può camminare
let bricks = [2, 3, 4, 5, 6, 7, 20];

// Controllo per vedere se l'omino è sopra ai blocchi
if (bricks.includes(map[y1][x1]) || bricks.includes(map[y1][x2])) {
    let topTile = y1 * TILE_DIMENSION;
    // Controllo che l'omino non stia saltando
    if (gameObj.bottom > topTile) {
        // Se sta saltando lo faccio ritornare a terra (sul top del blocco)
        gameObj.jumping = false;
        gameObj.y = topTile;
        gameObj.speedY = 0;
    }
    check = true;
} else if (bricks.includes(map[y2][x1]) || bricks.includes(map[y2][x2])) {
    check = true;
}
```

Ho **caricato le immagini** e infine ho disegnato la mappa con un senso logico aggiungendo gli ostacoli, i blocchi, le monete da raccogliere. 

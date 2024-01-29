var canvas, canvasMap;
var ctx, ctxMap;
const GAME_WIDTH = 720;
const GAME_HEIGHT = 540;
var keyPressed;
var interval;
// player
var player;
const SPEED_X = 0.5;
const SPEED_Y = 20;
// obstacle
var obstacle;
var OBSTACLE_SPEEDX = 2.5;

const OBJECT_DIMENSION = 30;
const TILE_DIMENSION = 30;

// coins
var coin1, coin2, coin3, coin4, coin5, coin6, coin7, coin8, coin9, coin10;
var moneteRaccolte;

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

// Immagini 
// In questo array avrò tutte le immagini
const imagesURL = ["img/background00.png", "img/background01.png", "img/brick00.png",
    "img/brick01.png", "img/brick02.png", "img/brick03.png", "img/scatola.png",
    "img/scatola01.png", "img/lava.png", "img/puntineDx.png", "img/puntineSx.png",
    "img/puntineTop.png", "img/puntineBot.png", "img/cannon02.png", "img/bomb.png",
    "img/ominoDx.png", "img/ominoSx.png", "img/coin.png", "img/chain00.png",
    "img/chain01.png", "img/legno00.png", "img/legno01.png"
];

var images = [];
var imageLoaded = 0;
var imagePlayer;
var imageCoin;

// Input utente, pressione dei tasti
$(document).keydown(function(e) {
    // Quando l'utente preme un tasto mi salvo il codice del tasto
    keyPressed = e.key;

});

$(document).keyup(function() {
    keyPressed = null;
});


$(document).ready(function() {
    // Carico le immagini
    imagesURL.forEach(src => {
        var image = new Image();
        image.src = src;
        image.addEventListener('load', function() {
            imageLoaded += 1;
            // Quanto tutte le immagini sono state caricate inizio il gioco
            if (imageLoaded == imagesURL.length) {
                loadGame()
                gameSetup();
                drawMap(ctxMap);
            }
        }, false);
        images.push(image);
    });
});

function loadGame() {
    // Nel secondo layer ci saranno gli omini
    canvas = document.getElementById("layer2");
    // Nel primo layer ci sarà la mappa così quando si aggiorna la posizione
    // non dove cancellare tutte e ricaricare la mappa, ma cancello solo gli omini
    canvasMap = document.getElementById("layer1");
    ctx = canvas.getContext('2d');
    ctxMap = canvasMap.getContext("2d");
    coin1 = new GameObject(255, 425, 30, 30);
    coin2 = new GameObject(545, 425, 30, 30);
    coin3 = new GameObject(90, 305, 30, 30);
    coin4 = new GameObject(60, 155, 30, 30);
    coin5 = new GameObject(660, 185, 30, 30);
    coin6 = new GameObject(60, 485, 30, 30);
    coin7 = new GameObject(360, 215, 30, 30);
    coin8 = new GameObject(420, 365, 30, 30);
    coin9 = new GameObject(335, 125, 30, 30);
    coin10 = new GameObject(540, 35, 30, 30);
    moneteRaccolte = 0;
}

function gameSetup() {
    //Il mio personaggio
    player = new GameObject(420, 470, OBJECT_DIMENSION, OBJECT_DIMENSION);
    obstacle = new GameObject(720, 480, 20, 20);

    // Aggiorno ogni 20ms
    interval = setInterval(gameLoop, 16);
}

function drawMap(context) {
    imagePlayer = images[15];
    imageCoin = images[17];
    // Disegno la mappa sul ctxMap
    // Posizione dei tiles
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
    updateCoin(context, imageCoin);
}

function gameLoop() {

    // Funzione principale
    // La posizione dell'omino prima di muoversi
    let beginningX = player.x;
    let beginningY = player.y;
    obstacle.speedX = 0;
    // Cambio la posizione dell'omino in base alle direzione data dall'utente
    // Speed mi indica di quanto si deve muovere l'omino (x+speedX)
    if (keyPressed == "ArrowLeft") {
        player.speedX -= SPEED_X;
        imagePlayer = images[16];

    } else if (keyPressed == "ArrowRight") {
        player.speedX += SPEED_X;
        imagePlayer = images[15];
    }
    // Se è stato premuto il tasto per saltare e
    // l'oggetto non sta già saltando lo faccio saltare
    else if (keyPressed == "ArrowUp" && player.jumping == false) {
        player.speedY -= SPEED_Y;
        // Con la variabile jumping l'omino può saltare solo quando è a terra
        player.jumping = true;
    }

    // Pulisco il canvas, così posso disegnare nelle nuove posizioni
    // Pulisco solo il canvas dove sono presenti il mio omino e gli ostacoli
    ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

    // Aggiorno la posizione dell'ostacolo
    obstacle.speedX += OBSTACLE_SPEEDX;
    obstacle.x += obstacle.speedX;
    // Quando l'ostacolo andrà fino ai limiti del canvas spawnerà dall'altra parte
    obstacle.teleport(canvas);
    // Gestisco la posizione dell'omino (x, y, quindi anche la gravità)
    // Non aggiorno ancora graficamente la posizione
    player.speed();
    // Controllo che l'omino non esca dal perimetro del canvas
    player.limitCanvas(canvas);

    // Controllo se l 'omino si scontra con la mappa
    // Controllo solo la y, userò la vecchia x
    if (crashMap(beginningX, player.y, player)) {
        // Se l'omino si scontra con qualche blocco sulla mappa
        // la sua posizione non si aggiornerà, rimarrà quella precedente
        player.y = beginningY;
    }
    // Controllo solo la x, userò la vecchia y
    if (crashMap(player.x, beginningY, player)) {
        player.x = beginningX;
    }
    // Controllo che il player non si scontri con l'ostacolo
    if (player.crashWith(obstacle)) {
        // Se si scontra con l'ostacolo fermo il gioco
        clearInterval(interval);
        // Si deve riiniziare da capo
        gameSetup();
    }
    if (player.crashWith(coin1)) {
        moneteRaccolte += 1;
        coin1.x = 720;
        drawMap(ctxMap);
        // updateCoin(ctxMap, imageCoin);
    } else if (player.crashWith(coin2)) {
        moneteRaccolte += 1;
        coin2.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin3)) {
        moneteRaccolte += 1;
        coin3.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin4)) {
        moneteRaccolte += 1;
        coin4.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin5)) {
        moneteRaccolte += 1;
        coin5.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin6)) {
        moneteRaccolte += 1;
        coin6.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin7)) {
        moneteRaccolte += 1;
        coin7.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin8)) {
        moneteRaccolte += 1;
        coin8.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin9)) {
        moneteRaccolte += 1;
        coin9.x = 720;
        drawMap(ctxMap);
    } else if (player.crashWith(coin10)) {
        moneteRaccolte += 1;
        coin10.x = 720;
        drawMap(ctxMap);
    }

    if (moneteRaccolte == 10) {
        clearInterval(interval);
        alert("Hai vinto il gioco");
    }
    // Disegno l'omino nella nuova posizione
    player.update(ctx, imagePlayer);
    obstacle.update(ctx, images[14]);
}

function crashMap(x, y, gameObj) {
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
    // Se l'omino si scontra contro questi oggetti perde
    let obstacles = [8, 9, 10, 11, 12];
    // Ricalcolo
    DISTANCE = TILE_DIMENSION - 8;
    x1 = Math.floor((x + DISTANCE) / TILE_DIMENSION);
    y1 = Math.floor((y + DISTANCE) / TILE_DIMENSION);
    if (obstacles.includes(map[y1][x1]) || obstacles.includes(map[y1][x2]) ||
        obstacles.includes(map[y2][x1]) || obstacles.includes(map[y2][x2])) {
        clearInterval(interval);
        gameSetup();
    }


    return check;
}

function updateCoin(context, imageCoin) {
    // Carico le immagini delle monete
    coin1.update(context, imageCoin);
    coin2.update(context, imageCoin);
    coin3.update(context, imageCoin);
    coin4.update(context, imageCoin);
    coin5.update(context, imageCoin);
    coin6.update(context, imageCoin);
    coin7.update(context, imageCoin);
    coin8.update(context, imageCoin);
    coin9.update(context, imageCoin);
    coin10.update(context, imageCoin);
}
class GameObject {
    constructor(x, y, width, height) {
        // Tutte le proprietà dell'oggetto
        this.width = width;
        this.height = height;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
        this.gravity = 1.5;
        this.jumping = true;
    }

    update(context, image) {
        // Disegno l'oggetto nella nuova posizione
        context.drawImage(image, this.x, this.y, this.width, this.height);
    }

    speed() {
        // Cambio la posizione dell'oggetto
        this.speedY += this.gravity;
        this.x += this.speedX;
        this.y += this.speedY;
        // Frizione
        this.speedX *= 0.9;
        this.speedY *= 0.9;
    }

    get bottom() {
        return this.y + this.height;
    }

    get left() {
        return this.x;
    }
    get right() {
        return this.x + this.width;
    }
    get top() {
        return this.y;
    }

    limitCanvas(otherObj) {
        // Qui controllo le collisioni dell'omino con il canvas
        let otherBottom = otherObj.height - this.height;

        // Scontro in fondo
        if (this.y > otherBottom) {
            this.jumping = false;
            this.y = otherBottom;
            this.speedY = 0;
        }

        // Scontro destra
        if (this.right > otherObj.width) {
            this.x = otherObj.width - this.width;
        }
        // Scontro sinistra
        if (this.left < 0) {
            this.x = 0;
        }
        // Scontro alto
    }

    teleport(otherObj) {
        // Funzione utile per l'ostacolo,
        // se esce dal canvas a sinistra respawna a destra
        // Scontro destra
        if (this.right > otherObj.width) {
            this.x = 0 + this.width;
        }
        // Scontro sinistra
        if (this.x < 0) {
            this.x = otherObj.width - this.width;
        }
    }

    crashWith(other) {
        if (this.top > other.bottom || this.right < other.left ||
            this.bottom < other.top || this.left > other.right) {
            // console.log("nessuno scontro!");
            return false;
        } else {
            return true;
        }
    }
}
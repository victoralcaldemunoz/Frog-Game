import { Player } from "./player.js";
import { Enemy } from "./enemy.js";
// import { Princess } from "./princess.js";


// TABLERO
const board = document.getElementById('board');
let btnIniciarJuego = document.getElementById("startButton");
const seccionJuego = document.getElementById('seccion-juego');
let gameStarted = true;

// GAME OVER
function showGameoverScreen(){
    let gameoverSection = document.createElement('section');
    gameoverSection.setAttribute('id', 'gameover');

    let divContainerGameover = document.createElement('div')
    divContainerGameover.classList.add('gameover-button-div');

    let restartButton = document.createElement('button')
    restartButton.setAttribute('id', 'restart')
    restartButton.textContent = 'Restart'

    restartButton.addEventListener('click', function(){
        start()
        gameoverSection.style.display = 'none'
        seccionJuego.style.display = 'block'
    })

    divContainerGameover.appendChild(restartButton);

    gameoverSection.appendChild(divContainerGameover);

    document.body.appendChild(gameoverSection);
    
    gameoverSection.style.display = 'block';
    seccionJuego.style.display = 'none';

    gameStarted = false;
}

// SONIDO
let btnSound = document.getElementById('audioButton')
let buzz = new Audio('multimedia/mosquito.mp3')
let isPlaying = false;

let mosquito = new Player(0, 200, board);
/* let guayarmina = new Princess(1000, 400, board);
let princessId; */
let flySwatters = [];
let playerTimeId;
let enemyTimeId;

let randomY;
let swatter;

function start() {
    console.log("Start function is running.")
    mosquito.createMosquito()
    playerTimeId = setInterval(mosquitoMovement, 50)
    enemyTimeId = setInterval(createEnemy, 3000)
    // guayarmina.createPrincess();
}
function gameOv(){
    let gameOver = document.createElement("section"); 
    gameOver.setAttribute("id", "gameover"); 
    gameOver.innerHTML = `               
    <h1 class= "title">GAME OVER</h1>
    <button id="restartButton">Restart</button>
    ` ;
    parent.appendChild(gameOver);
}


function mosquitoMovement() {
    mosquito.move();
    if (mosquito.death === gameStarted){
        alert('Mosquito is dead')
        clearInterval(playerTimeId)
        clearInterval(enemyTimeId)
        showGameoverScreen();
    }
}

function createEnemy () {
    console.log("Creating enemy object.");
    randomY = Math.floor(Math.random() * 5) * 100
    swatter = new Enemy(1400, randomY, board, mosquito, flySwatters)
    flySwatters.push(swatter) 
    swatter.createFlySwatter() 
  }

window.addEventListener('keydown', function(e) {
    switch (e.key) {
        case 'ArrowRight':
            mosquito.directionX = 1;
            break;
        case 'ArrowLeft':
            mosquito.directionX = -1;
            break;
        case 'ArrowUp':
            mosquito.directionY = -1;
            break;
        case 'ArrowDown':
            mosquito.directionY = 1;
            break;
    }
});

// EVENTO PARA MOVER A MOSQUITO

window.addEventListener('keyup', function(e) {
    if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        mosquito.directionX = 0;
    }
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        mosquito.directionY = 0;
    }
});

// EVENTO PARA INICIAR EL BOARD DEL JUEGO
btnIniciarJuego.addEventListener('click', function(){
    start();
    document.getElementById('intro').style.display = 'none';
    seccionJuego.style.display = 'block';
});


// EVENTO PARA PONER O QUITAR EL SONIDO
buzz.addEventListener('canplaythrough', function(e){
    btnSound.addEventListener('click', function(){
        if (isPlaying) {
            buzz.pause()
        }else {
            buzz.play()
        }
        isPlaying = !isPlaying;
    });
});


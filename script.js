const btJogador1 = document.getElementById('btJogador1');
const btJogador2 = document.getElementById('btJogador2');
const btReiniciar = document.getElementById('btReiniciar');
const resultado = document.getElementById('resultado');
const numRodada = document.getElementById('numeroRodada');

let Jogador1 = 0;
let Jogador2 = 0;
let jogadaAtual = 1;
let rodadasJogadas = 0;
let numeroRodada = 0;

function salvarJogo() {
    localStorage.setItem('Jogador1', Jogador1);
    localStorage.setItem('Jogador2', Jogador2);
    localStorage.setItem('jogadaAtual', jogadaAtual);
    localStorage.setItem('rodadasJogadas', rodadasJogadas);
    localStorage.setItem('numeroRodada', numeroRodada);
  }

  function carregarJogo() {
    Jogador1 = parseInt(localStorage.getItem('Jogador1')) || 0;
    Jogador2 = parseInt(localStorage.getItem('Jogador2')) || 0;
    jogadaAtual = parseInt(localStorage.getItem('jogadaAtual')) || 1;
    rodadasJogadas = parseInt(localStorage.getItem('rodadasJogadas')) || 0;
    numeroRodada = parseInt(localStorage.getItem('numeroRodada')) || 0;
    
    numRodada.innerHTML = rodadasJogadas;
}

function rodarDado() {
    const sorteio = Math.floor(Math.random() * 6) + 1;
    resultado.innerText = `Jogador ${jogadaAtual}: ${sorteio}`;

    if (jogadaAtual === 1) {
        Jogador1 += sorteio;
        jogadaAtual = 2;
        
        btJogador1.disabled = true;
        btJogador2.disabled = false;
    }
    else {
        Jogador2 += sorteio;
        jogadaAtual = 1;
        rodadasJogadas++;
        numRodada.innerHTML = rodadasJogadas;

        btJogador1.disabled = false;
        btJogador2.disabled = true;
    }

    salvarJogo();

    if (rodadasJogadas === 10) {
        if (Jogador1 > Jogador2) {
            resultado.innerText = "\nJogador 1: Você Venceu!";
        }
        else if (Jogador2 > Jogador1) {
            resultado.innerText = "\nJogador 2: Você Venceu!";
        }
        else {
            resultado.innerText = "\nEmpate!";
        }

        btJogador1.disabled = true;
        btJogador2.disabled = true;
    }
    salvarJogo();
}

btJogador1.onclick = rodarDado;
btJogador2.onclick = rodarDado;
btReiniciar.onclick = function () {
    Jogador1 = 0;
    Jogador2 = 0;
    jogadaAtual = 1;
    rodadasJogadas = 0;
    numRodada.innerHTML = 0;
    resultado.innerText = "";
    btJogador1.disabled = false;
    btJogador2.disabled = false;
}
carregarJogo();
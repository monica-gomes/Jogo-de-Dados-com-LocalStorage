const btJogador1 = document.getElementById('btJogador1');
const btJogador2 = document.getElementById('btJogador2');
const btReiniciar = document.getElementById('btReiniciar');
const resultado = document.getElementById('resultado');
const numRodada = document.getElementById('numeroRodada');

let jogadorAtual = 1;
let rodadaAtual = 1;
let rodadasJogadas = 0;
let jogador1Pontos = 0;
let jogador2Pontos = 0;

function salvarJogo() {
    const jogo = {
        jogadorAtual: jogadorAtual,
        rodadaAtual: rodadaAtual,
        rodadasJogadas: rodadasJogadas,
        jogador1Pontos: jogador1Pontos,
        jogador2Pontos: jogador2Pontos
    };

    localStorage.setItem('jogoDados', JSON.stringify(jogo));
}

function carregarJogo() {
    const jogo = localStorage.getItem('jogoDados');
    if (jogo) {
        const dados = JSON.parse(jogo);
        jogadorAtual = dados.jogadorAtual;
        rodadaAtual = dados.rodadaAtual;
        rodadasJogadas = dados.rodadasJogadas;
        jogador1Pontos = dados.jogador1Pontos;
        jogador2Pontos = dados.jogador2Pontos;
        numRodada.innerHTML = rodadaAtual;

        exibirResultados();
    }
}

function rodarDado() {
    const sorteio = Math.floor(Math.random() * 6) + 1;
    resultado.innerText = `Jogador ${jogadorAtual}: ${sorteio}`;

    if (jogadorAtual === 1) {
        jogador1Pontos += sorteio;
        jogadorAtual = 2;
        btJogador1.disabled = true;
        btJogador2.disabled = false;
    } else {
        jogador2Pontos += sorteio;
        jogadorAtual = 1;
        rodadaAtual++;
        rodadasJogadas++;
        numRodada.innerHTML = rodadaAtual;
        btJogador1.disabled = false;
        btJogador2.disabled = true;
    }

    salvarJogo();

    if (rodadasJogadas === 10) {
        exibirResultados();
        btJogador1.disabled = true;
        btJogador2.disabled = true;
    }
}

function reiniciarJogo() {
    jogadorAtual = 1;
    rodadaAtual = 1;
    rodadasJogadas = 0;
    jogador1Pontos = 0;
    jogador2Pontos = 0;
    numRodada.innerHTML = 0;
    resultado.innerText = "";
    btJogador1.disabled = false;
    btJogador2.disabled = false;

    salvarJogo();
}

function exibirResultados() {
    const resultadoJogador1 = `Jogador 1: ${jogador1Pontos}`;
    const resultadoJogador2 = `Jogador 2: ${jogador2Pontos}`;

    resultado.innerHTML = `${resultadoJogador1}<br>${resultadoJogador2}`;

    if (rodadasJogadas === 10) {
        let vencedor = "";
        if (jogador1Pontos > jogador2Pontos) {
            vencedor = "Jogador 1 venceu!";
        } else if (jogador2Pontos > jogador1Pontos) {
            vencedor = "Jogador 2 venceu!";
        } else {
            vencedor = "Empate!";
        }

        resultado.innerHTML += `<br>${vencedor}`;
    }
}

btJogador1.addEventListener('click', rodarDado);
btJogador2.addEventListener('click', rodarDado);
btReiniciar.addEventListener('click', reiniciarJogo);

carregarJogo();
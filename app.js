let listaNumerosSorteados = []
let numeroMaximo = 10;
let numeroSecreto = gerarNumeroAleatorio(numeroMaximo);
let tentativas = 0;

function exibirTexto(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

function exibirMensagemInicial() {
    exibirTexto('#titulo', 'Jogo do número secreto');
    exibirTexto('.texto__paragrafo', `Escolha um número entre 1 e ${numeroMaximo}.`);
}

exibirMensagemInicial();

function verificarChute() {
    let chute = document.querySelector('input').value;
    tentativas ++;
    let palavraTentativa = tentativas == 1 ? 'tentativa' : 'tentativas';

    if(numeroSecreto == chute) {
        exibirTexto('#titulo', 'Acertou!');
        exibirTexto('.texto__paragrafo', `Você descobriu o número secreto com ${tentativas} ${palavraTentativa}.`);
        habilitarBtnNovoJogo();
        desabilitarBtnChutar();
    } else if (numeroSecreto < chute) {
        limparCampo();
        exibirTexto('#titulo', 'Você errou!');
        exibirTexto('.texto__paragrafo', `O número secreto é menor que ${chute}.`);
    } else if (numeroSecreto > chute) {
        limparCampo();
        exibirTexto('#titulo', 'Você errou!');
        exibirTexto('.texto__paragrafo', `O número secreto é maior que ${chute}.`);
    }
}

function gerarNumeroAleatorio(numeroMax) {
    let numeroEscolhido = parseInt(Math.random() * numeroMax + 1);
    let qtdDeElementosNaLista = listaNumerosSorteados.length;
    if(qtdDeElementosNaLista == numeroMax) {
        listaNumerosSorteados = [];
    }
    if(listaNumerosSorteados.includes(numeroEscolhido)) {
        return gerarNumeroAleatorio(numeroMax);
    } else {
        listaNumerosSorteados.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo() {
    let chute = document.querySelector('input');
    chute.value = '';
}

function habilitarBtnNovoJogo() {
    let btnReiniciar = document.querySelector('#reiniciar');
    btnReiniciar.removeAttribute('disabled');
}

function desabilitarBtnChutar() {
    let btnChutar = document.querySelector('#btnChutar');
    btnChutar.setAttribute('disabled', true);
}

function novoJogo() {
    exibirMensagemInicial();
    limparCampo();
    numeroSecreto = gerarNumeroAleatorio(numeroMaximo);
    tentativas = 0;
    document.querySelector('#reiniciar').setAttribute('disabled', true);
    document.querySelector('#btnChutar').removeAttribute('disabled');
}
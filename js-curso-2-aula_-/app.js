//PEGA AS VARIAVEIS
let listaDeNumerosSorteados = [];
let numeroLimite = 10;
let numeroSecreto = gerarNumeroAleatorio();
let tentativas = 1;

//FILTRA A TAG E TEXTO
function exibirTextoNaTela(tag, texto){
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female', {rate:1.2});
}

// EXIBE Exibir Mensagem Inicial
function exibirMensagemInicial() {    
    exibirTextoNaTela('h1', 'jogo do número secreto');
    exibirTextoNaTela('p', 'Escolha um número entre 1 e 10');
}
exibirMensagemInicial();

// VERIFICA CHUTE
function verificarChute() {
    let chute = document.querySelector('input').value;
     if (chute == numeroSecreto){
        let palavraTentativa = tentativas > 1 ? 'tentativas': 'tentativa';
        let mensagemTentativas = `Você descobriu o número secreto com  ${tentativas} ${palavraTentativa}!`;
        exibirTextoNaTela ('h1', 'Acertou');
        exibirTextoNaTela ('p', mensagemTentativas);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if(chute > numeroSecreto) {
            exibirTextoNaTela ('p', 'O número secreto é menor!');
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior!');
        }  
        tentativas++;
        limparCampo();
    }   
}       

//GERA O NUMERO ALEATORIO
function gerarNumeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if(quantidadeDeElementosNaLista == numeroLimite){
        listaDeNumerosSorteados = [];
    }
    if (listaDeNumerosSorteados.includes(numeroEscolhido)){
        return gerarNumeroAleatorio();
    } else{
        listaDeNumerosSorteados.push(numeroEscolhido);
        console.log(listaDeNumerosSorteados);
        return numeroEscolhido;
    }
}

//LIMPA OS CAMPOS A CADA CHUTE
function limparCampo() {
    chute = document.querySelector('input');
        chute.value = ''; 
}

//REINICIA O JOGO
function reiniciarJogo() {
    numeroSecreto =gerarNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled', true);
}
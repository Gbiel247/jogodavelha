let participanteAtual = 'X';
let vitoriasParticipante1 = 0;
let vitoriasParticipante2 = 0;
let modoComputador = false;
let modoDoisParticipantes = false;

function registrarParticipante(participante) {
    if (participante === 1) {
        document.getElementById('player1').disabled = true;
    } else {
        document.getElementById('player2').disabled = true;
    }
}

function clicarCelula(celula) {
    const participant1Name = document.getElementById('player1').value;
    const participant2Name = modoComputador ? 'Computador' : document.getElementById('player2').value;

    if (celula.innerText === '' && !verificarVencedor() && !verificarEmpate()) {
        celula.innerText = participanteAtual;
        if (verificarVencedor()) {
            alert(`Parabéns, ${participanteAtual === 'X' ? participant1Name : participant2Name}! Você venceu!`);
            atualizarVitorias();
            reiniciarTabuleiro();
        } else if (verificarEmpate()) {
            alert('O jogo empatou!');
            reiniciarTabuleiro();
        } else {
            participanteAtual = participanteAtual === 'X' ? 'O' : 'X';
            if (modoComputador && participanteAtual === 'O') {
                jogadaComputador();
            }
        }
    }
}

function verificarVencedor() {
    const celulas = document.querySelectorAll('.quadrado');
    const combinacoesVencedoras = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combinacao of combinacoesVencedoras) {
        const [a, b, c] = combinacao;
        if (celulas[a].innerText !== '' &&
            celulas[a].innerText === celulas[b].innerText &&
            celulas[a].innerText === celulas[c].innerText) {
            return true;
        }
    }

    return false;
}

function verificarEmpate() {
    const celulas = document.querySelectorAll('.quadrado');
    return Array.from(celulas).every(celula => celula.innerText !== '');
}

function atualizarVitorias() {
    if (participanteAtual === 'X') {
        vitoriasParticipante1++;
        document.getElementById('player1-wins').innerText = `Vitórias: ${vitoriasParticipante1}`;
    } else {
        vitoriasParticipante2++;
        document.getElementById('player2-wins').innerText = `Vitórias: ${vitoriasParticipante2}`;
    }
}

function reiniciarTabuleiro() {
    const celulas = document.querySelectorAll('.quadrado');
    for (const celula of celulas) {
        celula.innerText = '';
    }
}

function reiniciarJogo() {
    vitoriasParticipante1 = 0;
    vitoriasParticipante2 = 0;
    document.getElementById('player1-wins').innerText = 'Vitórias: 0';
    document.getElementById('player2-wins').innerText = 'Vitórias: 0';
    document.getElementById('player1').value = '';
    document.getElementById('player2').value = '';
    document.getElementById('player1').disabled = false;
    document.getElementById('player2').disabled = false;
    reiniciarTabuleiro();
}

function alternarModoComputador() {
    modoComputador = document.getElementById('computer-checkbox').checked;
    document.getElementById('player2').disabled = modoComputador;
    reiniciarJogo();
}

function alternarModoDoisParticipantes() {
    modoDoisParticipantes = !modoDoisParticipantes;
    document.getElementById('computer-checkbox').checked = false;
    document.getElementById('player2').disabled = modoComputador;
    reiniciarJogo();
}

function jogadaComputador() {
    const celulas = document.querySelectorAll('.quadrado');
    const celulasVazias = Array.from(celulas).filter(celula => celula.innerText === '');

    if (celulasVazias.length > 0) {
        const celulaAleatoria = celulasVazias[Math.floor(Math.random() * celulasVazias.length)];
        setTimeout(() => clicarCelula(celulaAleatoria), 200);
    }
}

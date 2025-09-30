// quiz.js
const quizContainer = document.getElementById('quiz-container');
const perguntaEl = document.getElementById('pergunta');
const alternativasEl = document.getElementById('alternativas');
const tempoEl = document.getElementById('tempo');

let perguntaAtual = 0;
let pontuacaoTotal = 0;
let tempoRestante = 30;
let timer;
let tempoInicio;

function mostrarPergunta() {
  if (perguntaAtual >= questions.length) {
    salvarPontuacao();
    return;
  }

  const q = questions[perguntaAtual];
  perguntaEl.textContent = q.pergunta;
  alternativasEl.innerHTML = "";

  q.alternativas.forEach((alt, index) => {
    const li = document.createElement('li');
    li.textContent = alt;
    li.className = 'alternativa';
    li.onclick = () => verificarResposta(index);
    alternativasEl.appendChild(li);
  });

  tempoRestante = 30;
  tempoEl.textContent = tempoRestante;
  tempoInicio = Date.now();

  clearInterval(timer);
  timer = setInterval(() => {
    tempoRestante--;
    tempoEl.textContent = tempoRestante;
    if (tempoRestante <= 0) {
      clearInterval(timer);
      verificarResposta(-1); // Resposta não respondida
    }
  }, 1000);
}

function verificarResposta(selecionada) {
  clearInterval(timer);
  const q = questions[perguntaAtual];

  if (selecionada === q.correta) {
    const tempoGasto = (Date.now() - tempoInicio) / 1000;
    const pontos = Math.max(1000 - Math.round(tempoGasto * 100), 100);
    pontuacaoTotal += pontos;
  }

  perguntaAtual++;
  setTimeout(mostrarPergunta, 500);
}

function salvarPontuacao() {
  const nome = localStorage.getItem('nomeParticipante') || 'Anônimo';
  const normalizado = nome.toLowerCase().replace(/\s+/g, '_');

  const ref = firebase.database().ref('participantes/' + normalizado);
  ref.update({ pontuacao: pontuacaoTotal })
    .then(() => {
      window.location.href = 'ranking.html';
    });
}

// Iniciar
mostrarPergunta();

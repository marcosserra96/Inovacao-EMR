// ranking.js
const rankingEl = document.getElementById('ranking');

firebase.database().ref('participantes').once('value')
  .then(snapshot => {
    const participantes = [];
    snapshot.forEach(child => {
      const val = child.val();
      participantes.push({ nome: val.nome, pontuacao: val.pontuacao || 0 });
    });

    participantes.sort((a, b) => b.pontuacao - a.pontuacao);
    const top10 = participantes.slice(0, 10);

    top10.forEach((p, i) => {
      const li = document.createElement('li');
      li.innerHTML = `<span>#${i + 1} - ${p.nome}</span><strong>${p.pontuacao} pts</strong>`;
      rankingEl.appendChild(li);
    });
  });

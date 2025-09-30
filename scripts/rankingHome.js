// rankingHome.js
const top10El = document.getElementById('top10-home');

firebase.database().ref('participantes').on('value', snapshot => {
  const participantes = [];
  snapshot.forEach(child => {
    const val = child.val();
    participantes.push({ nome: val.nome, pontuacao: val.pontuacao || 0 });
  });

  participantes.sort((a, b) => b.pontuacao - a.pontuacao);
  const top10 = participantes.slice(0, 10);

  top10El.innerHTML = "";
  top10.forEach((p, i) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>#${i + 1} - ${p.nome}</span><span>${p.pontuacao} pts</span>`;
    top10El.appendChild(li);
  });
});

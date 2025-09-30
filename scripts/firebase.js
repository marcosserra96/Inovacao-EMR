// Substitua pelos seus dados do Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2l8LU3vYfQjTly8JSa658mfIlVk2Dw8E",
  authDomain: "inovacao-emr.firebaseapp.com",
  projectId: "inovacao-emr",
  storageBucket: "inovacao-emr.firebasestorage.app",
  messagingSenderId: "1075399271811",
  appId: "1:1075399271811:web:f532f25547125d6a8f42b6",
  measurementId: "G-8CTLMNCZJN"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.database();

document.getElementById('start-form').addEventListener('submit', async function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();

  if (!name) {
    alert("Digite seu nome para começar.");
    return;
  }

  const normalizedName = name.toLowerCase().replace(/\s+/g, "_");

  const ref = db.ref('participantes/' + normalizedName);
  const snapshot = await ref.get();

  if (snapshot.exists()) {
    alert("Você já participou do quiz! Cada pessoa só pode responder uma vez.");
  } else {
    await ref.set({
      nome: name,
      tentativaEm: new Date().toISOString(),
      pontuacao: 0
    });
    localStorage.setItem("nomeParticipante", name);
    window.location.href = "quiz.html";
  }
});

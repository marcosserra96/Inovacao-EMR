// firebase.js — compatível com navegador e GitHub Pages

// Configuração do seu projeto Firebase
const firebaseConfig = {
  apiKey: "AIzaSyC2l8LU3vYfQjTly8JSa658mfIlVk2Dw8E",
  authDomain: "inovacao-emr.firebaseapp.com",
  databaseURL: "https://inovacao-emr-default-rtdb.firebaseio.com", // essencial!
  projectId: "inovacao-emr",
  storageBucket: "inovacao-emr.appspot.com",
  messagingSenderId: "1075399271811",
  appId: "1:1075399271811:web:f532f25547125d6a8f42b6",
  measurementId: "G-8CTLMNCZJN"
};

// Inicializa o Firebase
firebase.initializeApp(firebaseConfig);

// Exporta referência para o banco de dados
const db = firebase.database();


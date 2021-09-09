import './style.css';

const API_KEY = 'Fb0kz1AVcHNnXEPp3Oex';
const URI = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${API_KEY}/scores`;
const resultUI = document.querySelector('.result-list');
const displayScores = (list, res) => {
  const { result } = res;
  const scores = [];
  for (let i = 0; i < result.length; i += 1) {
    scores.push([result[i].user, result[i].score]);
  }
  list.innerHTML = '';
  scores.forEach((score) => {
    list.innerHTML += `<li>${score[0]}: ${score[1]}</li>`;
  });
  if (scores.length > 5) { list.classList.add('scroll'); }
};
const fetchData = async () => {
  await fetch(URI, {
    method: 'GET',
  })
    .then((response) => response.json())
    .then((result) => displayScores(resultUI, result));
};
const refresh = document.querySelector('.refresh');
refresh.addEventListener('click', () => {
  fetchData();
});
const postData = async (user, score) => {
  await fetch(URI, {
    method: 'POST',
    body: JSON.stringify({ user, score }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((json) => json);
};
const sendData = async () => {
  const submitScore = document.querySelector('#form');
  const name = document.getElementById('name');
  const score = document.getElementById('score');
  submitScore.addEventListener('submit', (e) => {
    e.preventDefault();
    postData(name.value, score.value);
    submitScore.reset();
  });
};

document.addEventListener('DOMContentLoaded', () => {
  sendData();
  fetchData();
});
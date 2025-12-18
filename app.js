const intervals = [1, 7, 15, 30, 60, 90];


function loadData() {
return JSON.parse(localStorage.getItem('studies') || '[]');
}


function saveData(data) {
localStorage.setItem('studies', JSON.stringify(data));
}


function addStudy() {
const date = document.getElementById('date').value || today();
const topic = document.getElementById('topic').value;
const questions = Number(document.getElementById('questions').value);


if (!topic) return alert('Informe o tópico');


const study = { date, topic, questions, revisions: [] };


intervals.forEach(days => {
const d = new Date(date);
d.setDate(d.getDate() + days);
study.revisions.push({
date: d.toISOString().split('T')[0],
interval: days,
done: false
});
});


const data = loadData();
data.push(study);
saveData(data);


document.getElementById('topic').value = '';
document.getElementById('questions').value = '';


renderToday();
}


function today() {
return new Date().toISOString().split('T')[0];
}


function renderToday() {
const ul = document.getElementById('today');
ul.innerHTML = '';
const data = loadData();


data.forEach(study => {
study.revisions
.filter(r => r.date === today() && !r.done)
.forEach(r => {
const li = document.createElement('li');
li.innerHTML = `
<strong>${study.topic}</strong><br>
Revisão ${r.interval} dias
<br><button>Marcar como feita</button>
`;
li.querySelector('button').onclick = () => {
r.done = true;
saveData(data);
renderToday();
};
ul.appendChild(li);
});
});
}


renderToday();
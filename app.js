const intervals = [1, 7, 15, 30, 60, 90];

function today() {
  return new Date().toISOString().split('T')[0];
}

async function addStudy() {
  const date = document.getElementById('date').value || today();
  const topic = document.getElementById('topic').value;
  const questions = Number(document.getElementById('questions').value);

  if (!topic) return alert('Informe o tópico');

  const revisions = intervals.map(days => {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return {
      date: d.toISOString().split('T')[0],
      interval: days,
      done: false
    };
  });

const col = userCollection();
if (!col) return alert('Faça login primeiro');


await col.add({
date,
topic,
questions,
revisions
});

  document.getElementById('topic').value = '';
  document.getElementById('questions').value = '';

  renderToday();
}

async function renderToday() {
  const ul = document.getElementById('today');
  ul.innerHTML = '';

  if (!currentUser) return;
  const snapshot = await userCollection().get();

  snapshot.forEach(doc => {
    const study = doc.data();

    study.revisions
      .filter(r => r.date === today() && !r.done)
      .forEach(r => {
        const li = document.createElement('li');
        li.innerHTML = `
          <strong>${study.topic}</strong><br>
          Revisão ${r.interval} dias
          <br><button>Marcar como feita</button>
        `;
        li.querySelector('button').onclick = async () => {
          r.done = true;
          await userCollection().doc(doc.id).update({
		  revisions: study.revisions
		  });
          renderToday();
        };
        ul.appendChild(li);
      });
  });
}

function userCollection() {
if (!currentUser) return null;
return db.collection('users')
.doc(currentUser.uid)
.collection('studies');
}

renderToday();

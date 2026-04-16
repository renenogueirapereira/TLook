const ctx = document.getElementById('graficoTreino');

new Chart(ctx, {
type: 'line',

data: {

labels: ['Semana 1','Semana 2','Semana 3','Semana 4','Semana 5'],

datasets: [{

label: 'Evolução do Treino',

data: [20,40,55,70,90],

borderWidth: 3

}]

},

options: {

responsive:true,

scales: {

y: {

beginAtZero:true

}

}

}

});
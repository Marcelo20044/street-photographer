let trainings = JSON.parse(localStorage.getItem('trainings')) || [];
const clearButton = document.getElementById('clear-trainings');

function generateTrainingTable() {
    const tableContainer = document.getElementById('training-table');
    tableContainer.innerHTML = '';

    if (trainings.length === 0) {
        tableContainer.textContent = 'Тренингов нет';
        clearButton.style.display = 'none';
        return;
    }

    clearButton.style.display = 'block';

    const headers = ['Дата', 'Место', 'Тема', 'Стоимость'];
    const headerRow = document.createElement('div');
    headerRow.classList.add('row', 'header-row');

    headers.forEach(header => {
        const headerDiv = document.createElement('div');
        headerDiv.classList.add('header');
        headerDiv.textContent = header;
        headerRow.appendChild(headerDiv);
    });

    tableContainer.appendChild(headerRow);

    trainings.forEach(training => {
        const dateCell = document.createElement('div');
        dateCell.classList.add('row');
        dateCell.textContent = training.date;

        const locationCell = document.createElement('div');
        locationCell.classList.add('row');
        locationCell.textContent = training.location;

        const topicCell = document.createElement('div');
        topicCell.classList.add('row');
        topicCell.textContent = training.topic;

        const priceCell = document.createElement('div');
        priceCell.classList.add('row');
        priceCell.textContent = training.price + '₽';

        tableContainer.appendChild(dateCell);
        tableContainer.appendChild(locationCell);
        tableContainer.appendChild(topicCell);
        tableContainer.appendChild(priceCell);
    });
}

const form = document.getElementById('training-form');
form.addEventListener('submit', function (event) {
    event.preventDefault()

    const date = document.getElementById('date').value;
    const location = document.getElementById('location').value;
    const topic = document.getElementById('topic').value;
    const price = document.getElementById('price').value;

    trainings.push({date, location, topic, price});

    localStorage.setItem('trainings', JSON.stringify(trainings));

    generateTrainingTable();

    form.reset();
});

clearButton.addEventListener('click', function() {
    trainings = [];
    localStorage.removeItem('trainings');
    generateTrainingTable();
});

generateTrainingTable();

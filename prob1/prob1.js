document.getElementById('weatherForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const cityName = document.getElementById('cityName').value;
    fetchWeather(cityName);
});

function fetchWeather(cityName) {
    const apiKey = '763f1dbecb41431592141508242803';
    const currentApiUrl = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${cityName}&days=5&aqi=no&alerts=no`;
    const historyApiUrl = `http://api.weatherapi.com/v1/history.json?key=${apiKey}&q=${cityName}&dt=`;
    
    fetch(currentApiUrl)
        .then(response => response.json())
        .then(currentData => {
            displayCurrentWeather(currentData);
        })
        .catch(error => console.error('Error fetching current weather:', error));
    
    const dates = generateDates(); // Generate past 5 days' dates

    Promise.all(dates.map(date => {
        return fetch(historyApiUrl + date)
            .then(response => response.json());
    }))
    .then(historyData => {
        displayPastWeather(historyData);
    })
    .catch(error => console.error('Error fetching past weather:', error));
}

function displayCurrentWeather(weatherData) {
    const { location, forecast } = weatherData;

    document.getElementById('currentTime').textContent = `Local Time: ${location.localtime}`;
    document.getElementById('currentLocation').textContent = `Location: ${location.name}, ${location.country}`;
    document.getElementById('currentTemperature').textContent = `Temperature: ${forecast.forecastday[0].day.avgtemp_c}°C`;
    document.getElementById('weatherIcon').src = `http:${forecast.forecastday[0].day.condition.icon}`;
    document.getElementById('humidity').textContent = `Humidity: ${forecast.forecastday[0].day.avghumidity}%`;

    document.getElementById('weatherInfo').classList.remove('hidden');
}

function generateDates() {
    const today = new Date();
    const dates = [];
    for (let i = 4; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = formatDate(date);
        dates.push(dateString);
    }
    return dates;
}

function formatDate(date) {
    const year = date.getFullYear();
    let month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    let day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    return `${year}-${month}-${day}`;
}

function displayPastWeather(weatherData) {
    const pastForecastDiv = document.getElementById('pastForecast');
    pastForecastDiv.innerHTML = ''; // Clear previous content

    weatherData.forEach(data => {
        const forecast = data.forecast.forecastday[0].day;
        const condition = forecast.condition;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');

        const date = new Date(data.forecast.forecastday[0].date_epoch * 1000);
        const dateString = formatDate(date);

        const iconUrl = `http:${condition.icon}`;
        const iconImg = document.createElement('img');
        iconImg.src = iconUrl;
        iconImg.alt = condition.text;

        dayDiv.innerHTML = `
            <p>Date: ${dateString}</p>
            <p>Temperature: ${forecast.avgtemp_c}°C</p>
            <p>Humidity: ${forecast.avghumidity}%</p>
            <p>Condition: ${condition.text}</p>
        `;
        dayDiv.appendChild(iconImg);

        pastForecastDiv.appendChild(dayDiv);
    });

    document.getElementById('weatherInfo').classList.remove('hidden');
}

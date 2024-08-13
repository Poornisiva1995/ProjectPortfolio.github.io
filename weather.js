function getweather() {
    const apiKey = 'c98210d57ea352155530277089dd5f23';
    const city = document.querySelector('#city').value;

    if (!city) {
        alert('Please enter a city');
        return;
    }
    const currentweatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}`;

    fetch(currentweatherUrl)
        .then(response => response.json())
        .then(data => {
            displayweather(data);
        })
        .catch(error => {
            console.error('Error fetching current weather data:', error);
            alert('Error fetching current weather data. Please try again.');
        });

    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(error => {
            console.error('Error fetching hourly forecast data:', error);
            alert('Error fetching hourly forecast data. Please try again.');
        });
}

function displayweather(data) {
    const tempdivinfo = document.querySelector('#temp-div');
    const weatherinfodiv = document.querySelector('#weather-info');
    const weathericon = document.querySelector('#weather-icon');
    const hourlyforecastdiv = document.querySelector('#hourly-forecast');

    weatherinfodiv.innerHTML = '';
    hourlyforecastdiv.innerHTML = '';
    tempdivinfo.innerHTML = '';

    if (data.cod === '404') {
        weatherinfodiv.innerHTML = `<p>${data.message}</p>`;
    } else {
        const cityname = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconcode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconcode}@4x.png`;

        const temperatureHTML = `<p>${temperature}°C</p>`;
        const weatherHTML = `<p>${cityname}</p><p>${description}</p>`;

        tempdivinfo.innerHTML = temperatureHTML;
        weatherinfodiv.innerHTML = weatherHTML;
        weathericon.src = iconUrl;
        weathericon.alt = description;

        showimage();
    }
}

function displayHourlyForecast(hourlydata) {
    const hourlyforecastdiv = document.querySelector('#hourly-forecast');
    const next24hours = hourlydata.slice(0, 8);

    hourlyforecastdiv.innerHTML = ''; 

    next24hours.forEach(item => {
        const datatime = new Date(item.dt * 1000);
        const hour = datatime.getHours();
        const temperature = Math.round(item.main.temp - 273.15);
        const iconcode = item.weather[0].icon;

        const iconUrl = `https://openweathermap.org/img/wn/${iconcode}.png`;

        const hourlyitemHTML = `<div class="hourly-item"><span>${hour}:00</span><img src="${iconUrl}" alt="Hourly weather icon"><span>${temperature}°C</span></div>`;

        hourlyforecastdiv.innerHTML += hourlyitemHTML;
    });
}

function showimage() {
    const weathericon = document.querySelector('#weather-icon');
    weathericon.style.display = 'block';
}


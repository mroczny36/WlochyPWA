document.addEventListener("DOMContentLoaded", function() {
    var navLinks = document.querySelectorAll(".nav-link");
    var sections = document.querySelectorAll(".city-section");
    var intro = document.querySelector(".intro");

    // Ukryj wszystkie sekcje miast
    sections.forEach(function(section) {
        section.style.display = "none";
    });

    // Obsługa kliknięcia na link miasta
    navLinks.forEach(function(link) {
        link.addEventListener("click", function(event) {
            event.preventDefault();
            var target = link.getAttribute("href");
            var targetSection = document.querySelector(target);

            // Ukryj wszystkie sekcje miast
            sections.forEach(function(section) {
                section.style.display = "none";
            });

            // Wyświetl tylko wybraną sekcję miasta
            targetSection.style.display = "block";

            // Usuniecie diva
            intro.remove();          
        });
    });

    const weather = 'https://api.openweathermap.org/data/2.5/weather?q=';
    const forecastweather = 'https://api.openweathermap.org/data/2.5/forecast?q=';
    const apiKey = '&appid=72986e36d16f2cc3a411bfce77121a10';
    const apiUnits = '&units=metric';
    const apiLang = '&lang=pl';

    // Pobierz dane pogodowe dla wszystkich miast
    function getAllWeatherData(apiKey) {
        const cities = [
            { name: 'Rzym', id: '1' },
            { name: 'Florence', id: '2' },
            { name: 'Wenecja', id: '3' },
            { name: 'Mediolan', id: '4' },
            { name: 'Neapol', id: '5' }
        ];

        cities.forEach(city => {
            const URLWeather = `${weather}${city.name},IT${apiKey}${apiUnits}${apiLang}`;
            fetch(URLWeather)
                .then(response => response.json())
                .then(data => {
                    const temperatureValue = data.main && data.main.temp;
                    const weatherValue = data.weather && data.weather[0].description;
                    document.getElementById(`temp${city.id}`).textContent = temperatureValue || '';
                    document.getElementById(`weather${city.id}`).textContent = weatherValue || '';

                    // Pobierz ikonę pogody
                    const weatherIcon = data.weather && data.weather[0].icon;
                    const iconUrl = `https://openweathermap.org/img/wn/${weatherIcon}.png`;

                    // Utwórz element <img> i ustaw atrybut src na adres ikony
                    const iconElement = document.createElement('img');
                    iconElement.src = iconUrl;

                    // Wstaw element ikony pogody do odpowiedniej sekcji miasta
                    const weatherIconContainer = document.getElementById(`icon${city.id}`);
                    weatherIconContainer.innerHTML = '';
                    weatherIconContainer.appendChild(iconElement);
                })
                .catch(error => console.log('Błąd:', error));

            const tomorrowUrl = `${forecastweather}${city.name},IT${apiKey}${apiUnits}${apiLang}`;
            fetch(tomorrowUrl)
                .then(response => response.json())
                .then(data => {
                    const temperatureTomorrow = data.list && data.list[8].main.temp;
                    const weatherTomorrow = data.list && data.list[8].weather[0].description;
                    document.getElementById(`temp${city.id}-tomorrow`).textContent = temperatureTomorrow || '';
                    document.getElementById(`weather${city.id}-tomorrow`).textContent = weatherTomorrow || '';

                    // Pobierz ikonę pogody na jutro
                    const weatherIconTomorrow = data.list && data.list[8].weather[0].icon;
                    const iconUrlTomorrow = `https://openweathermap.org/img/wn/${weatherIconTomorrow}.png`;

                    // Utwórz element <img> i ustaw atrybut src na adres ikony
                    const iconElementTomorrow = document.createElement('img');
                    iconElementTomorrow.src = iconUrlTomorrow;

                    // Wstaw element ikony pogody na jutro do odpowiedniej sekcji miasta
                    const weatherIconContainerTomorrow = document.getElementById(`icon${city.id}-tomorrow`);
                    weatherIconContainerTomorrow.innerHTML = '';
                    weatherIconContainerTomorrow.appendChild(iconElementTomorrow);
                })
                .catch(error => console.log('Błąd:', error));
        });
    }

    // Wywołaj funkcję dla wszystkich miast
    getAllWeatherData(apiKey);
});

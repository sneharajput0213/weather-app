let cityInput = document.getElementById("cityInput");
let btn = document.getElementById("btn");
let outputElement = document.getElementById('weather-output');

btn.onclick = function () {
  const city = cityInput.value.trim();
  if (city === "") {
    outputElement.innerHTML = `<p>Please enter a city name.</p>`;
    outputElement.style.background = "#ffcccc";
    outputElement.style.color = "#000";
    return;
  }

  const apiKey = '8cfbb697e50ee219ac17c53c10c04c0c';
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  fetch(apiUrl)
    .then(response => {
      if (!response.ok) {
        throw new Error('City not found');
      }
      return response.json();
    })
    .then(data => {
      const temperature = data.main.temp;
      const description = data.weather[0].description;
      const mainCondition = data.weather[0].main;
      const location = data.name;

      // Background images from Unsplash
      let backgroundImages = {
        BrokenClouds: "https://images.unsplash.com/photo-1606857521015-7a9b47b5d3bb",
        Clear: "https://images.unsplash.com/photo-1506744038136-46273834b3fb",
        Clouds: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63",
        Rain: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        Drizzle: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29",
        Thunderstorm: "https://images.unsplash.com/photo-1593642634367-d91a135587b5",
        Snow: "https://images.unsplash.com/photo-1608889175112-04b62d7d4f52",
        Default: "https://images.unsplash.com/photo-1499346030926-9a72daac6c63"
      };

      let bgUrl = backgroundImages[mainCondition] || backgroundImages.Default;

      outputElement.style.backgroundImage = `url('${bgUrl}&auto=format&fit=cover&crop=center')`;
      outputElement.innerHTML = `
        <p><strong>${location}</strong></p>
        <p>🌡️ Temperature: ${temperature.toFixed(1)}°C</p>
        <p>☁️ Condition: ${description}</p>
      `;
    })
    .catch(error => {
      outputElement.innerHTML = `<p>${error.message}</p>`;
      outputElement.style.background = "#ffcccc";
      outputElement.style.color = "#000";
    });
};

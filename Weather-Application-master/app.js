const apiKey = "b1b8cf586657b657cf9b6f9276455032";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?&units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weatherIcon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    const data = await response.json();
    const locRes = await fetch(
      "http://api.openweathermap.org/geo/1.0/direct?q=" +
        city +
        "&limit=1&appid=" +
        apiKey
    );
    const locData = await locRes.json();
    const lat = locData[0].lat;
    const lon = locData[0].lon;
    const airq = await fetch(
      `http://api.openweathermap.org/data/2.5/air_pollution?lat=${lat}&lon=${lon}&appid=${apiKey}`
    );
    const airqData = await airq.json();
    const aqi = airqData.list[0].main.aqi;

    const airScale = {
      1: "Good",
      2: "Fair",
      3: "Moderate",
      4: "Poor",
      5: "Very Poor",
    };

    const dataIcon = data.weather[0].main;
    const weatherIconImage = {
      Clouds: "images/clouds.png",
      Clear: "images/clear.png",
      Rain: "images/rain.png",
      Drizzle: "images/drizzle.png",
      Mist: "images/mist.png",
    };
    weatherIcon.src = weatherIconImage[dataIcon];

    const airQuality = airScale[aqi];

    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
    Math.round(data.main.temp) + "°C";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
    document.querySelector(".air").innerHTML = airQuality;

    document.querySelector(".weather").style.display = "block";
  }
}

searchButton.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

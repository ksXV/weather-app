const searchBox = document.getElementById("search-box");
const button = document.getElementById("button");
const _APIKEY = "0e34bc26d067fde03f334d36b7ed753d";
const getWeatherData = async (location) => {
  try {
    const response = await fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${_APIKEY}`
    );
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};
function lowerFirstLetter(string) {
  return string.charAt(0).toLowerCase() + string.slice(1);
}
button.addEventListener("click", () => {
  if (searchBox.value) {
    const weatherBox = document.getElementById("weather");
    const location = document.getElementById("location");
    const temperature = document.getElementById("degrees-celcius");
    const tempFeeling = document.getElementById("degrees-feels");
    const windSpeed = document.getElementById("wind-speed");
    const visibilityDoc = document.getElementById("visibility");
    const direction = document.getElementById("direction");
    const humidity = document.getElementById("humidity");
    const pressure = document.getElementById("pressure");
    const imageLocation = document.getElementById("image");
    const images = document.querySelector("img");
    getWeatherData(searchBox.value).then((weatherReport) => {
      if (weatherReport.cod === 404) {
        throw Error;
      } else {
        const { name, main, wind, visibility, weather } = weatherReport;
        location.innerText = name;
        temperature.innerText = Math.floor(main.temp - 272.15);
        tempFeeling.innerText = Math.floor(main.feels_like - 272.15);
        windSpeed.innerText = wind.speed;
        visibilityDoc.innerText = visibility;
        humidity.innerText = main.humidity;
        pressure.innerText = main.pressure;
        switch (true) {
          case 359 >= wind.deg >= 280:
            direction.innerText = "SE";
            break;
          case 279 >= wind.deg >= 180:
            direction.innerText = "NW";
            break;
          case 179 >= wind.deg >= 100:
            direction.innerText = "NE";
          case 99 >= wind.deg >= 0:
            direction.innerText = "SW";
        }

        const createImage = document.createElement("img");
        if (imageLocation.children.length === 1) {
          imageLocation.removeChild(images);
        }
        createImage.src = `./svgs/Weather Icons/${lowerFirstLetter(
          weather[0].main
        )}.svg`;
        imageLocation.appendChild(createImage);
        searchBox.value = "";
        weatherBox.classList.add("grid");
        weatherBox.classList.remove("display-none");
      }
    });
  } else {
    throw "Error: Invalid input.";
  }
});

// base: "stations"
// clouds: {all: 20}
// cod: 200
// coord: {lon: -0.1257, lat: 51.5085}
// dt: 1641212219
// id: 2643743
// main: {temp: 283.47, feels_like: 282.65, temp_min: 282.42, temp_max: 284.26, pressure: 1009, …}
// name: "London"
// sys: {type: 2, id: 2019646, country: 'GB', sunrise: 1641197149, sunset: 1641225821}
// timezone: 0
// visibility: 10000
// weather: [{…}]
// wind: {speed: 6.17, deg: 240}

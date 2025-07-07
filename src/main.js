const weather = {};

function processData(data) {
  weather["location"] = data.resolvedAddress;
  weather["description"] = data.description;

  const current = {};
  current["temp"] = data.currentConditions.temp;
  current["humidity"] = data.currentConditions.humidity;
  current["conditions"] = data.currentConditions.conditions;
  current["sunrise"] = data.currentConditions.sunrise;
  current["sunset"] = data.currentConditions.sunset;
  current["icon"] = data.currentConditions.icon;
  weather["current"] = current;

  const days = {};
  let i = 0;
  data.days.forEach((element) => {
    days[`${i}`] = {
      date: element.datetime,
      tempMax: element.tempmax,
      tempMin: element.tempmin,
      temp: element.temp,
      description: element.description,
    };
    i = i + 1;
  });

  weather["days"] = days;
  console.log(data);
  return weather;
}

async function getData() {
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${year}-${month}-${day}`;

  const date5 = new Date();
  date5.setDate(date5.getDate() + 5);
  let day5 = date5.getDate();
  let month5 = date5.getMonth() + 1;
  let year5 = date5.getFullYear();
  let day5later = `${year5}-${month5}-${day5}`;

  const data = await fetch(
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/kecskemet/${currentDate}/${day5later}?unitGroup=metric&lang=hu&key=59SPDL97E2WX9UKD9PYF9244W`,
    { mode: "cors" }
  );
  const jsonData = await data.json();
  return processData(jsonData);
}

async function main() {
  await getData();
  const body = document.querySelector("body");

  function addSearch() {
    const searchDiv = document.createElement("div");
    searchDiv.classList.add("searchDiv");

    const searchField = document.createElement("input");
    searchField.classList.add("searchField");
    searchDiv.appendChild(searchField);

    const searchButton = document.createElement("button");
    searchButton.classList.add("searchButton");

    const searchIcon = document.createElement("img");
    searchIcon.src = "../img/search.svg";
    searchIcon.classList.add("searchIcon");
    searchButton.appendChild(searchIcon);
    searchDiv.appendChild(searchButton);

    body.appendChild(searchDiv);
  }

  addSearch();

  function loadToDom() {
    const current = document.createElement("div");
    current.classList.add("current");

    const currentLocation = document.createElement("h1");
    currentLocation.classList.add("currentLocation");
    currentLocation.textContent = `${weather.location}`;
    current.appendChild(currentLocation);

    const currentIcon = document.createElement("img");
    currentIcon.src = `../img/${weather.current.icon}.svg`;
    currentIcon.classList.add("currentIcon");
    current.appendChild(currentIcon);

    const currentData = document.createElement("div");
    currentData.classList.add("currentData");

    const currentTempDiv = document.createElement("div");
    currentTempDiv.classList.add("currentTempDiv");

    const currentTemp = document.createElement("p");
    currentTemp.textContent = `${weather.current.temp}°`;
    currentTempDiv.appendChild(currentTemp);

    const minmax = document.createElement("div");
    minmax.classList.add("minmax");

    const currentMin = document.createElement("p");
    currentMin.textContent = `${weather.days[0].tempMin}°`;
    minmax.appendChild(currentMin);

    const currentMax = document.createElement("p");
    currentMax.textContent = `${weather.days[0].tempMax}°`;
    minmax.appendChild(currentMax);

    currentTempDiv.appendChild(minmax);
    currentData.appendChild(currentTempDiv);

    const currentSunDiv = document.createElement("div");
    currentSunDiv.classList.add("currentSunDiv");

    const currentSunrise = document.createElement("div");
    currentSunrise.classList.add("currentSunrise");

    const currentSunriseImg = document.createElement("img");
    currentSunriseImg.src = "../img/sunrise-svgrepo-com.svg";
    currentSunriseImg.classList.add("currentSunriseImg")
    currentSunrise.appendChild(currentSunriseImg);

    const currentSunriseData = document.createElement("p");
    currentSunriseData.textContent = `${weather.current.sunrise}`;
    currentSunrise.appendChild(currentSunriseData);
    currentSunDiv.appendChild(currentSunrise);

    const currentSunset = document.createElement("div");
    currentSunset.classList.add("currentSunset");

    const currentSunsetImg = document.createElement("img");
    currentSunsetImg.src = "../img/sunset-svgrepo-com.svg";
    currentSunsetImg.classList.add("currentSunsetImg")
    currentSunset.appendChild(currentSunsetImg);

    const currentSunsetData = document.createElement("p");
    currentSunsetData.textContent = `${weather.current.sunset}`;
    currentSunset.appendChild(currentSunsetData);
    currentSunDiv.appendChild(currentSunset);

    currentData.appendChild(currentSunDiv);

    current.appendChild(currentData);

    body.appendChild(current);
  }
  loadToDom();
  console.log(weather);
}
main();

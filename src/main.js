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

  const days = [];
  let i = 0;
  data.days.forEach((element) => {
    days[`${i}`] = {
      date: element.datetime,
      tempMax: element.tempmax,
      tempMin: element.tempmin,
      temp: element.temp,
      description: element.description,
      icon: element.icon,
    };
    i = i + 1;
  });

  weather["days"] = days;
  return weather;
}

async function getData(loc) {
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
    `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${loc}/${currentDate}/${day5later}?unitGroup=metric&lang=hu&key=G7735MBBFA9BDA93WCW2SQWYE`,
    { mode: "cors" }
  );
  const jsonData = await data.json();
  return processData(jsonData);
}

async function main(loc) {
  await getData(loc);
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
  const searchButton = document.querySelector(".searchButton")
  const searchField = document.querySelector(".searchField")
  searchButton.addEventListener("click", () => {
    body.innerHTML = ""
    main(searchField.value)
  })

  function loadToDom() {
    const mainScreen = document.createElement("div");
    mainScreen.classList.add("mainScreen");

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
    currentSunriseImg.classList.add("currentSunriseImg");
    currentSunrise.appendChild(currentSunriseImg);

    const currentSunriseData = document.createElement("p");
    currentSunriseData.textContent = `${weather.current.sunrise}`;
    currentSunrise.appendChild(currentSunriseData);
    currentSunDiv.appendChild(currentSunrise);

    const currentSunset = document.createElement("div");
    currentSunset.classList.add("currentSunset");

    const currentSunsetImg = document.createElement("img");
    currentSunsetImg.src = "../img/sunset-svgrepo-com.svg";
    currentSunsetImg.classList.add("currentSunsetImg");
    currentSunset.appendChild(currentSunsetImg);

    const currentSunsetData = document.createElement("p");
    currentSunsetData.textContent = `${weather.current.sunset}`;
    currentSunset.appendChild(currentSunsetData);
    currentSunDiv.appendChild(currentSunset);
    currentData.appendChild(currentSunDiv);
    current.appendChild(currentData);
    mainScreen.appendChild(current);

    const daysContainer = document.createElement("div");
    daysContainer.classList.add("daysContainer");

    weather.days.forEach((day) => {
      const dayCard = document.createElement("div");
      dayCard.classList.add("dayCard");

      const dayDate = document.createElement("p")
      dayDate.textContent = day.date
      dayCard.appendChild(dayDate)

      const dayIcon = document.createElement("img");
      dayIcon.classList.add("dayIcon");
      dayIcon.src = `../img/${day.icon}.svg`;
      dayCard.appendChild(dayIcon);

      const dayData = document.createElement("div");
      dayData.classList.add("dayData");

      const dayMin = document.createElement("p");
      dayMin.textContent = day.tempMin;
      dayData.appendChild(dayMin);

      const dayMax = document.createElement("p");
      dayMax.textContent = day.tempMax;
      dayData.appendChild(dayMax);

      dayCard.appendChild(dayData)

      daysContainer.appendChild(dayCard);
    });

    mainScreen.appendChild(daysContainer);
    body.appendChild(mainScreen);
  }
  loadToDom();
}
main("kecskemet");

async function getData() {
  const data = await fetch(
    "https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/budapest?unitGroup=metric&lang=hu&key=59SPDL97E2WX9UKD9PYF9244W",
    { mode: "cors" }
  );
  const jsonData = await data.json()
  console.log(jsonData.days)
}

getData()

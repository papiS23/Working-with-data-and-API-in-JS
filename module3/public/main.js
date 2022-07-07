const btn = document.querySelector(".check-in");
const coordsP = document.querySelectorAll(".coords");

const succesCallback = async (pos) => {
  console.log("Geolocation available");

  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;

  coordsP[0].textContent = lat.toFixed(2);
  coordsP[1].textContent = lon.toFixed(2);

  btn.addEventListener("click", async function () {
    const data = { lat, lon };

    const options = {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    };

    const response = await fetch("/send_location", options);
    const json = await response.json();

    console.log(json);
  });

  const weather_response = await fetch(`get_weather/${lat},${lon}`, {
    method: "POST",
  });
  const data_json = await weather_response.json();
  const weather_json = data_json.weather;
  const aq_json = data_json.air_quality;
  console.log(weather_json);
  console.log(aq_json);

  const temp = weather_json.current.temp;
  const desc = weather_json.current.weather[0].description;
  const humidity = weather_json.current.humidity;
  const uvi = weather_json.current.uvi;

  document.querySelector(".temp").textContent = temp;
  document.querySelector(".desc").textContent = desc;
  document.querySelector(".humi").textContent = humidity;
  document.querySelector(".uvi").textContent = uvi;

  switch (aq_json.list[0].main.aqi) {
    case 1:
      document.querySelector(".aq").textContent = "Good";
      break;
    case 2:
      document.querySelector(".aq").textContent = "Fair";
      break;
    case 3:
      document.querySelector(".aq").textContent = "Moderate";
      break;
    case 4:
      document.querySelector(".aq").textContent = "Poor";
      break;
    case 5:
      document.querySelector(".aq").textContent = "Very poor";
      break;
  }
};

const errorCallback = (err) => {
  console.error(err);
};

navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);

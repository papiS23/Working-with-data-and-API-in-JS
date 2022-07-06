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
  const weather_json = await weather_response.json();
  console.log(weather_json);
  const temp = weather_json.current.temp;
  document.querySelector(".temp").textContent = temp;
};

const errorCallback = (err) => {
  console.error(err);
};

navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);

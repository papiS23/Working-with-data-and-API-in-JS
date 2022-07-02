const btn = document.querySelector(".check-in");
const coordsP = document.querySelectorAll(".coords");

//TODO: hidden api key file, weather fetch.

const succesCallback = (pos) => {
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
};

const errorCallback = (err) => {
  console.error(err);
};

navigator.geolocation.getCurrentPosition(succesCallback, errorCallback);

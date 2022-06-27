function setup() {
  noCanvas();
  const video = createCapture(VIDEO);
  video.size(480, 400);

  const btn = document.querySelector("#submit");
  const latSpan = document.querySelector("#lat");
  const lonSpan = document.querySelector("#lon");
  const moodInput = document.querySelector("#mood");

  getLocation();
  getData();

  //GETTING LOCATION AND SANDING IT TO THE SERVER
  function getLocation() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude;
        const lon = pos.coords.longitude;

        latSpan.textContent = lat;
        lonSpan.textContent = lon;

        btn.addEventListener("click", async function () {
          video.loadPixels();
          const video64 = video.canvas.toDataURL();

          const mood = moodInput.value;
          const data = {
            lat,
            lon,
            mood,
            video64,
          };

          const options = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
              "Content-Type": "application/json",
            },
          };

          const response = await fetch("/send_data", options);
          const json = await response.json();

          console.log(json);

          getData();
        });
      });
    } else {
      console.log("geolocation not available");
    }
  }
  async function getData() {
    const response = await fetch("/get_data");
    const json = await response.json();
    seeData(json, document.querySelector("#seedata"));
  }

  function seeData(data, dir) {
    clearDiv();
    for (item of data) {
      const div = document.createElement("div");
      div.classList.add("dataDiv");
      const pLat = document.createElement("p");
      const pLon = document.createElement("p");
      const pTime = document.createElement("p");
      const pMood = document.createElement("p");
      const image = document.createElement("img");

      pLat.textContent = `Latitude: ${item.lat}`;
      pLon.textContent = `Longitude: ${item.lon}`;
      pMood.textContent = `Mood: ${item.mood}`;
      const time = new Date(item.timestand).toLocaleString();
      pTime.textContent = time;
      image.src = item.video64;

      div.append(pLat, pLon, pTime, pMood, image);
      div.style = "border: 1px solid red;";
      dir.append(div);
    }
  }

  function clearDiv() {
    const divs = document.querySelectorAll(".dataDiv");
    for (div of divs) {
      div.remove();
    }
  }

  document.querySelector("#showData").addEventListener("click", () => {
    document.querySelector(".data").classList.toggle("data--active");
  });
}

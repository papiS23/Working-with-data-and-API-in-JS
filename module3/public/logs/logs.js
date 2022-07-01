const logsDiv = document.querySelector(".logs");

getData();

async function getData() {
  const response = await fetch("/get_data");
  const json = await response.json();

  for (item of json) {
    const p = document.createElement("p");
    p.classList.add("pData");

    const date = new Date(item.timestand).toLocaleString();

    p.textContent = `${item.lat.toFixed(2)}°, ${item.lon.toFixed(
      2
    )}° |  ${date}`;

    logsDiv.append(p);
  }
}

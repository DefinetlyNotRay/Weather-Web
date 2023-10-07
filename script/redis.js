import Redis from "/ioredis";

const redis = new Redis({
  host: "ideal-bluejay-31039.upstash.io",
  port: 31039,
  password: "8d1efb4c8a1f4202a56a4a04bef43f89",
});
let index = 1;
let locationInput = document.querySelector(".location-input").value; // Get the value from the input element
function red() {
  console.log(locationInput);
  redis.set(`location:${index++}`, locationInput);
}

themeBtn.addEventListener("click", red());
searchBtn.addEventListener("click", red());

function handleKeyDown(event) {
  if (event.key === "Enter") {
    red();
  }
}

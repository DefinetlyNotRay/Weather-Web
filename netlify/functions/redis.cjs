const Redis = require("ioredis");
let counter = 1;
exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const locationInput = body.locationName;

  const redis = new Redis({
    host: "ideal-bluejay-31039.upstash.io",
    port: 31039,
    password: "8d1efb4c8a1f4202a56a4a04bef43f89",
  });

  try {
    // const id = counter++; // Get the current ID and increment it for the next call
    const key = `location:${Math.random()}`;
    await redis.set(key, locationInput);
    await redis.quit();

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Data stored successfully" }),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ message: "Error storing data" }),
    };
  }
};

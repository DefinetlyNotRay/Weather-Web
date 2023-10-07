const Redis = require("ioredis");
const fetch = require("node-fetch");

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const locationInput = body.locationInput;

  const redis = new Redis({
    host: "redis://default:8d1efb4c8a1f4202a56a4a04bef43f89@ideal-bluejay-31039.upstash.io:31039",
  });

  try {
    await redis.set("location", locationInput);
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

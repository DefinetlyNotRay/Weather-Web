const Redis = require("ioredis");
const redis = new Redis({
  host: "ideal-bluejay-31039.upstash.io",
  port: 31039,
  password: "8d1efb4c8a1f4202a56a4a04bef43f89",
});

exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const locationInput = body.locationInput;
  const index = body.index;

  redis.set(`location:${index}`, locationInput);

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data stored successfully" }),
  };
};

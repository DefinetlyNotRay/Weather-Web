exports.handler = async function (event) {
  if (!event.body) {
    return {
      statusCode: 400,
      body: JSON.stringify({ message: "Empty request body" }),
    };
  }

  console.log(event);

  const body = JSON.parse(event.body);
  const locationInput = body.locationInput;

  const UPSTASH_API_KEY = "42808d40-2adf-4b76-b850-1e143ab417c8="; // Replace with your Upstash API key
  const UPSTASH_URL = "https://ideal-bluejay-31039.upstash.io";

  console.log("UPSTASH_URL:", UPSTASH_URL);
  console.log("UPSTASH_API_KEY:", UPSTASH_API_KEY);
  console.log("locationInput:", locationInput);

  const response = await fetch(UPSTASH_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${UPSTASH_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ location: locationInput }),
  });

  if (!response.ok) {
    return {
      statusCode: response.status,
      body: JSON.stringify({ message: "Error storing data" }),
    };
  }

  return {
    statusCode: 200,
    body: JSON.stringify({ message: "Data stored successfully" }),
  };
};

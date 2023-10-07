exports.handler = async function (event) {
  const body = JSON.parse(event.body);
  const locationInput = body.locationInput;

  const UPSTASH_API_KEY =
    "AXk_ACQgZjU5N2RmNWUtN2I1YS00NWUwLWJkMzAtMjUxNTM3YzdhZmE0OGQxZWZiNGM4YTFmNDIwMmE1NmE0YTA0YmVmNDNmODk="; // Replace with your Upstash API key
  const UPSTASH_URL = "https://ideal-bluejay-31039.upstash.io";

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

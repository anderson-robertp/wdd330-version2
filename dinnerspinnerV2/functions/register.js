// netlify/functions/register.js
import fetch from 'node-fetch';

export async function handler(event, context) {
  const baseURL = process.env.BASE_URL; // Ensure you have BASE_URL set in your environment variables
  const { info, token } = JSON.parse(event.body);

  const options = {
    method: "POST",
    headers: {
      'Authorization': `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(info),
  };

  try {
    const response = await fetch(baseURL + "/users", options);
    const jsonResponse = await response.json();

    if (response.ok) {
      return {
        statusCode: 200,
        body: JSON.stringify(jsonResponse),
      };
    } else {
      console.error("Error:", jsonResponse);
      return {
        statusCode: response.status,
        body: JSON.stringify(jsonResponse),
      };
    }
  } catch (error) {
    console.error("Fetch error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
}

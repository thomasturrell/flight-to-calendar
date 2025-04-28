import * as functions from "firebase-functions";
import fetch from "node-fetch";

export const apiProxy = functions.https.onRequest(async (req, res) => {
  const API_KEY = process.env.API_TOKEN;
  const endpoint = req.url;

  try {
    const apiRes = await fetch(
      `https://aerodatabox.p.rapidapi.com${endpoint}`,
      {
        method: req.method,
        headers: {
          "x-rapidapi-host": "aerodatabox.p.rapidapi.com",
          "x-rapidapi-key": API_KEY!,
        },
      }
    );

    const data = await apiRes.text();
    res.setHeader("Content-Type", "application/json");
    res.status(apiRes.status).send(data);
  } catch (err: any) {
    console.error("API Proxy error:", err);
    res.status(500).send({ error: "API proxy failed" });
  }
});

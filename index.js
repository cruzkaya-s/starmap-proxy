const express = require("express");
const fetch = require("node-fetch");
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.post("/starmap", async (req, res) => {
  const { latitude, longitude, date, time } = req.body;

  try {
    const response = await fetch("https://api.astronomyapi.com/api/v2/studio/star-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic ZTI3MDE0NTMtNjYwNS00MzBhLTkyMTYtYjM5MWFiNjI1YzQ0Ojc0YmFiNjQzMDdjMGU1ZmE1MTU5NWJkYjhiNzBkMzNlNTdkMzIwNTRjYjdjNGU3Njc4MDg1NTRjYTJmYzRmYmZmNzY5MmQzNmViYzJkZTRiMzE4NGU5OGZkNjM3MjEwMzhiNDIwMWU1YTg3ODhhMDQ3ZjE3OGZiMWI5ZThmNDdlZDRhYTUyZjE4ODYzNTVhZTdhMTZmOWY4YjlkZmM2NGY0YTFhNjFlMzMzOTdlY2RhNjNmMGEwOWU5OGIwYTAwMzM1ZTk1MzJjY2QzYWYxNzliYWNkZTkzNjdkZjJkMmY1"
      },
      body: JSON.stringify({
        style: "inverted-colors",
        observer: {
          latitude,
          longitude,
          date,
          time
        },
        view: {
          type: "portrait-simple",
          parameters: {
            constellation: "all",
            labels: true
          }
        }
      })
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    console.error("Error en /starmap:", error);
    res.status(500).json({ error: "Error al generar el mapa estelar." });
  }
});

app.get("/", (req, res) => {
  res.send("Starmap service is running.");
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

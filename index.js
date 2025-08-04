const express = require("express");
const cors = require("cors");
const fetch = require("node-fetch");
const app = express();

app.use(cors());
app.use(express.json());

app.post("/starmap", async (req, res) => {
  const { latitude, longitude, date, time, style, view } = req.body;

  const astronomyRequest = {
    observer: { latitude, longitude, date, time },
    style: style || "inverted",
    view: view || {
      type: "constellation",
      parameters: {
        constellation: "all",
        labels: true,
      },
    },
  };

  try {
    const response = await fetch("https://api.astronomyapi.com/api/v2/studio/star-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization:
          "Basic ZTI3MDE0NTMtNjYwNS00MzBhLTkyMTYtYjM5MWFiNjI1YzQ0Ojc0YmFiNjQzMDdjMGU1ZmE1MTU5NWJkYjhiNzBkMzNlNTdkMzIwNTRjYjdjNGU3Njc4MDg1NTRjYTJmYzRmYmZmNzY5MmQzNmViYzJkZTRiMzE4NGU5OGZkNjM3MjEwMzhiNDIwMWU1YTg3ODhhMDQ3ZjE3OGZiMWI5ZThmNDdlZDRhYTUyZjE4ODYzNTVhZTdhMTZmOWY4YjlkZmM2NGY0YTFhNjFlMzMzOTdlY2RhNjNmMGEwOWU5OGIwYTAwMzM1ZTk1MzJjY2QzYWYxNzliYWNkZTkzNjdkZjJkMmY1",
      },
      body: JSON.stringify(astronomyRequest),
    });

    const data = await response.json();
    res.json(data);
  } catch (error) {
    res.status(500).json({ error: "Error generando el mapa estelar" });
  }
});

app.get("/", (req, res) => {
  res.send("Star Map Proxy funcionando");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor en puerto ${PORT}`));

const express = require('express');
const fetch = require('node-fetch');
const app = express();
app.use(express.json());

// Middleware CORS
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'https://roohgallery.com');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.post('/starmap', async (req, res) => {
  const { latitude, longitude, date, time } = req.body;

  const body = {
    style: "inverted-colors",
    observer: { latitude, longitude, date, time },
    view: {
      type: "portrait-simple",
      parameters: {
        constellation: "all",
        labels: true
      }
    }
  };

  try {
    const result = await fetch("https://api.astronomyapi.com/api/v2/studio/star-chart", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Basic ZTI3MDE0NTMtNjYwNS00MzBhLTkyMTYtYjM5MWFiNjI1YzQ0Ojc0YmFiNjQzMDdjMGU1ZmE1MTU5NWJkYjhiNzBkMzNlNTdkMzIwNTRjYjdjNGU3Njc4MDg1NTRjYTJmYzRmYmZmNzY5MmQzNmViYzJkZTRiMzE4NGU5OGZkNjM3MjEwMzhiNDIwMWU1YTg3ODhhMDQ3ZjE3OGZiMWI5ZThmNDdlZDRhYTUyZjE4ODYzNTVhZTdhMTZmOWY4YjlkZmM2NGY0YTFhNjFlMzMzOTdlY2RhNjNmMGEwOWU5OGIwYTAwMzM1ZTk1MzJjY2QzYWYxNzliYWNkZTkzNjdkZjJkMmY1"
      },
      body: JSON.stringify(body)
    });

    const data = await result.json();
    res.json(data);

  } catch (error) {
    res.status(500).json({ error: 'Error al conectarse a AstronomyAPI' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Star Map proxy running on port ${PORT}`));

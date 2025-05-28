const axios = require("axios");

module.exports = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Walang lungsod na ibinigay." });
  }

  try {
    const response = await axios.get(`https://jonell01-ccprojectsapihshs.hf.space/api/weather?city=${encodeURIComponent(city)}`);
    const data = response.data;

    // Simplified data para hindi na object sa frontend
    res.status(200).json({
      city: data.city,
      temperature: data.temperature?.value || null,
      humidity: data.humidity?.value || null,
      wind_speed: data.wind_speed || null
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ error: "Hindi nakuha ang data. Subukan muli." });
  }
};

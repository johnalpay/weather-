const axios = require("axios");

module.exports = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Walang lungsod na ibinigay." });
  }

  try {
    const response = await axios.get(`https://jonell01-ccprojectsapihshs.hf.space/api/weather?city=${encodeURIComponent(city)}`);
    const data = response.data;

    // Simplify para sa frontend
    const result = {
      city: city,
      issuedAt: data.issuedAt,
      synopsis: data.synopsis,
      temperature_max: data.temperature?.max?.value || "N/A",
      temperature_min: data.temperature?.min?.value || "N/A",
      humidity_max: data.humidity?.max?.value || "N/A",
      humidity_min: data.humidity?.min?.value || "N/A"
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ API ERROR:", err.message);
    res.status(500).json({ error: "Hindi nakuha ang data. Subukan muli." });
  }
};

const axios = require("axios");

module.exports = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Walang lungsod na ibinigay." });
  }

  try {
    const response = await axios.get(`https://jonell01-ccprojectsapihshs.hf.space/api/weather?city=${encodeURIComponent(city)}`);
    const data = response.data;

    // I-extract pati oras ng max/min para sa temperatura at humidity
    const result = {
      city: city,
      issuedAt: data.issuedAt,
      synopsis: data.synopsis,
      temperature_max: data.temperature?.max?.value || "N/A",
      temperature_max_time: data.temperature?.max?.time || "N/A",
      temperature_min: data.temperature?.min?.value || "N/A",
      temperature_min_time: data.temperature?.min?.time || "N/A",
      humidity_max: data.humidity?.max?.value || "N/A",
      humidity_max_time: data.humidity?.max?.time || "N/A",
      humidity_min: data.humidity?.min?.value || "N/A",
      humidity_min_time: data.humidity?.min?.time || "N/A"
    };

    res.status(200).json(result);
  } catch (err) {
    console.error("❌ API ERROR:", err.message);
    res.status(500).json({ error: "Hindi nakuha ang data. Subukan muli." });
  }
};

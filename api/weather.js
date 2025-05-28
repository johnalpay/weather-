const axios = require("axios");

module.exports = async (req, res) => {
  const { city } = req.query;

  if (!city) {
    return res.status(400).json({ error: "Walang lungsod na ibinigay." });
  }

  try {
    const response = await axios.get(`https://jonell01-ccprojectsapihshs.hf.space/api/weather?city=${encodeURIComponent(city)}`);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: "Hindi nakuha ang data. Subukan muli." });
  }
};

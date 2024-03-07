const { apiConnector } = require("../apiconnector");
const { endpoint } = require("../apis");

const { CHECK_WEATHER_API } = endpoint;

const apiKey = process.env.API_KEY;

async function fetchWeather(req, res) {
  try {
    let params;
    const { city, lat, lon, unit } = req.body;

    console.log("here inside fetchWeather ", req.body);

    if (!city && (!lat || !lon)) {
      return res.status(400).json({ success: false, message: 'City name or latitude and longitude are required' });
    }

    if (city) {
      params = {
        q: city,
        appid: apiKey,
        units: unit
      };
    } else {
      params = {
        lat,
        lon,
        appid: apiKey,
        units: unit
      };
    }

    const response = await apiConnector(
      "GET",
      CHECK_WEATHER_API,
      null,
      null,
      params
    );

    console.log("fetchWeather API RESPONSE............", response.data);

    return res.status(200).json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.log("fetchWeather API ERROR............", error);
    return res.status(500).json({ success: false, message: 'Internal server error' });
  }
}

module.exports = { fetchWeather };

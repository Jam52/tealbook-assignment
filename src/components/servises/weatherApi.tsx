export const fetchGeoLocation = async (cityName: string) => {
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
  );
  const data = await res.json();
  return data;
};

export const fetchWeatherData = async (location: IGeoLocation) => {
  const { lat, lon } = location;
  const res = await fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely&appid=${process.env.REACT_APP_API_KEY}&units=metric`,
  );
  const data = await res.json();
  return data;
};

export const fetchReverseGeoencoding = async (location: IGeoLocation) => {
  const { lat, lon } = location;
  const res = await fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${lon}&limit=1&appid=${process.env.REACT_APP_API_KEY}`,
  );
  const data = await res.json();
  return data[0];
};

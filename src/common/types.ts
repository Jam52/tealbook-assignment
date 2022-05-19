export {};

declare global {
  interface IGeoLocation {
    lat: number;
    lon: number;
    name: string;
  }

  interface ICity {
    name: string;
    data: {
      current: {
        dt: number;
        temp: number;
        humidity: number;
        wind_speed: number;
        pressure: number;
        uvi: number;
        weather: Array<{ icon: string; description: string; dt: number }>;
      };
      daily: Array<{
        dt: number;
        weather: Array<{ icon: string; description: string; dt: number }>;
        temp: { day: number };
      }>;
    };
  }
}

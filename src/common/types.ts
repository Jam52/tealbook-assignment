export {};

declare global {
  interface IGeoLocation {
    lat: number;
    lon: number;
    name: string;
  }

  interface ICity {
    name: string;
    data: Array<{
      dt: number;
      weather: Array<{ icon: string; description: string }>;
    }>;
  }

  interface IUserCity {
    name: string;
    data: {
      dt: number;
      temp: number;
      weather: Array<{ icon: string; description: string }>;
    };
  }
}

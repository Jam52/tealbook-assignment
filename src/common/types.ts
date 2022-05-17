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
}

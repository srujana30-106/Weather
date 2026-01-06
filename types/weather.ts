export interface WeatherResponse {
    name: string;
    main: {
      temp: number;
      humidity: number;
    };
    weather: {
      main: string;
    }[];
    wind: {
      speed: number;
    };
  }
  
  export interface ForecastItem {
    dt_txt: string;
    main: {
      temp: number;
    };
    weather: {
      main: string;
    }[];
  }
  
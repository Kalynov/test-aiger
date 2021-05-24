import { 
    GET_WEATHER_REQUEST_ACTION,
    GET_WEATHER_REQUEST_SUCCESS_ACTION,
    GET_WEATHER_REQUEST_FAIL_ACTION,
    SET_CURRENT_CITY,
    GET_CASHED_WEATHER
} from "../constants";

export interface IWeather {
    id: number;
    main: string;
    description: string;
    icon: string;
};

export interface ITemp {
    temp: string;
    feels_like: string;
    temp_min: string;
    temp_max: string;
};

export interface IWind {
    speed: number;
    deg: number;
    gust: number;
};

export interface ICities {
    [key: string]: IWeatherInfo;
}

export interface IWeatherInfo {
    weather: IWeather;
    temp: ITemp;
    wind: IWind;
}

export interface IState {
    activeCityId: string;
    loading: boolean;
    error: boolean;
    cities: ICities;
    currentWeather: IWeather | null;
    currentTemp: ITemp | null;
    currentWind: IWind | null;
};

type ActionType = typeof GET_WEATHER_REQUEST_ACTION |
    typeof GET_WEATHER_REQUEST_SUCCESS_ACTION |
    typeof GET_WEATHER_REQUEST_FAIL_ACTION |
    typeof SET_CURRENT_CITY | 
    typeof GET_CASHED_WEATHER;

export interface IAction {
    type: ActionType;
    payload?: any;
};

export interface ICityListProp {
    activeId: string;
    onSelect: (key: string) => void;
    onReload: () => void;
};

export interface IWeatherInfoProp {
    city: string;
    weather: IWeather | null;
    wind: IWind | null;
    temp: ITemp | null;
    loading: boolean;
};
import { IState, IAction } from "../../types";
import { 
    GET_WEATHER_REQUEST_ACTION,
    GET_WEATHER_REQUEST_SUCCESS_ACTION,
    GET_WEATHER_REQUEST_FAIL_ACTION,
    SET_CURRENT_CITY,
    GET_CASHED_WEATHER
} from "../../constants";

export const reducer = (state: IState, action: IAction ): IState  => {
    switch (action.type) {
        case SET_CURRENT_CITY:
            return {
                ...state,
                activeCityId: action.payload,
            }
        case GET_CASHED_WEATHER:
            return{
                ...state,
                currentWeather: state.cities[state.activeCityId].weather,
                currentTemp: state.cities[state.activeCityId].temp,
                currentWind: state.cities[state.activeCityId].wind,
            }
        case GET_WEATHER_REQUEST_ACTION:
            return {
                ...state,
                loading: true,
                error: false,
            };
        case GET_WEATHER_REQUEST_SUCCESS_ACTION:
            return  {
                ...state,
                loading: false,
                error: false,
                cities: {
                    ...state.cities,
                    [state.activeCityId]: action.payload
                },
                currentWeather: action.payload.weather,
                currentTemp: action.payload.temp,
                currentWind: action.payload.wind,
            };
        case GET_WEATHER_REQUEST_FAIL_ACTION:
            return  {
                ...state,
                loading: false,
                error: true,
            };
        default:
            throw new Error();
    }
}
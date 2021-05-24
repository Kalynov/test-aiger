import { IState } from "../../types"

export const initialState: IState = {
    activeCityId: "524894",
    loading: false,
    error: false,
    cities: {},
    currentWeather: null,
    currentTemp: null,
    currentWind: null
}
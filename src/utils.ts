import { GET_WEATHER_REQUEST_ACTION } from "./constants";
import { IAction } from "./types"

export function* FakeSaga(dispatch: React.Dispatch<IAction>) {
    yield dispatch({
        type: GET_WEATHER_REQUEST_ACTION
    })
}
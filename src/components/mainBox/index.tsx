import React, { useReducer, useMemo, useEffect, useRef } from "react";
import { reducer } from "./reducer";
import { initialState } from "./initialState";
import { CITIES } from "../../constants"
import { CityList } from "../city-list";
import { WeatherInfo } from "../weather-info";
import { Layout, notification } from "antd";
import { 
    SET_CURRENT_CITY, 
    GET_WEATHER_REQUEST_ACTION, 
    GET_WEATHER_REQUEST_SUCCESS_ACTION,
    GET_CASHED_WEATHER
} from "../../constants";
import { getWeather } from "../../api"

const openNotification = () => {
    notification.open({
      message: 'Ошибка',
      description:
        'Не удалось получить данные от сервера, попробуйте еще раз',
    });
};

export const MainBox = () => {
    const [state, dispatch] = useReducer(reducer, initialState)
    const TimeOuts = useRef<{[key:string]:number}>({});
    const interval = useRef<NodeJS.Timeout>();
    const city = useMemo(() => CITIES.find(el => el.cityId === state.activeCityId),[state.activeCityId])
    const onSelect = (cityId: string) => dispatch({
        type: SET_CURRENT_CITY,
        payload: cityId
    })

    const onReload = () => {
        TimeOuts.current[state.activeCityId] = 120000;
        getData();
     }

    const getData = async () => {
        dispatch({type: GET_WEATHER_REQUEST_ACTION})
        const response = await getWeather(state.activeCityId, openNotification);
        if (response.cod === 200) {
            dispatch({
                type: GET_WEATHER_REQUEST_SUCCESS_ACTION,
                payload: {
                    weather: response.weather[0],
                    temp: response.main,
                    wind: response.wind,
                }
            })
        } else {
            openNotification()
        }
    } 

    useEffect(()=> {
        TimeOuts.current[state.activeCityId] =  TimeOuts.current[state.activeCityId]! ?? 120000
        if (state.cities[state.activeCityId] && TimeOuts.current[state.activeCityId] <= 120000){
            dispatch({
                type: GET_CASHED_WEATHER,
            })
        } else {
            getData()
        }
    }, [state.activeCityId])

    useEffect(() => {
        if (interval.current) clearInterval(interval.current);
        interval.current = setInterval(() => {
            for (let city in TimeOuts.current){
                if(TimeOuts.current[city] > 0)
                    TimeOuts.current[city] -=1000;
            };
            if (TimeOuts.current[state.activeCityId] === 0) {
                getData();
                TimeOuts.current[state.activeCityId] = 120000
            }
        }, 1000);
    },[state.activeCityId])
    

    
    return (
        <Layout>
            <Layout.Sider
                breakpoint="lg"
                collapsedWidth="0"
                >
                <CityList activeId={state.activeCityId} onSelect={onSelect} onReload={onReload}/>
            </Layout.Sider>
            <Layout>
                <Layout.Content style={{ margin: '24px 16px 0' }}>
                    <div className="site-layout-background" style={{ padding: 24, minHeight: 360 }}>
                    <WeatherInfo 
                        city={city?.name || ""}
                        weather={state.currentWeather}
                        wind={state.currentWind}
                        temp={state.currentTemp}
                        loading={state.loading}
                    />
                    </div>
                </Layout.Content>
            </Layout>
        </Layout>
    )
}
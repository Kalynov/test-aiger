import React from "react";
import { Typography, Image, Spin,  } from "antd";
import { IWeatherInfoProp } from "../../types";
import "./style.css";



export const WeatherInfo = ({
    city,
    weather,
    wind,
    temp,
    loading
}:IWeatherInfoProp ) => {
    return (
        <>
            <Typography.Title  >
                {city}
            </Typography.Title>
            { !loading 
                ? <>
                    <Typography.Title level={4}  >
                        {weather?.description}
                    </Typography.Title>
                    <Image
                        width={50}
                        preview={false}
                        src={`http://openweathermap.org/img/wn/${weather?.icon}.png`}
                    />
                    <Typography.Title level={4}  >
                        {temp?.temp.toString().split(".")[0]}
                    </Typography.Title>
                    <div className="weather-info-wrapper">
                        <div className="weather-info-box">
                            <Typography.Text >
                            Ветер
                            </Typography.Text>
                            <Typography.Text >
                                {wind?.speed? Math.round(wind?.speed) : null} м/с
                            </Typography.Text>
                            <Typography.Text >
                                {wind?.speed? Math.round(wind?.deg) : null}&deg;
                            </Typography.Text>
                        </div>
                        <div className="weather-info-box">
                            <Typography.Text >
                                Ощущается как 
                            </Typography.Text>
                            <Typography.Text >
                                {temp?.feels_like.toString().split(".")[0]}
                            </Typography.Text>
                            
                        </div>
                    </div>
                </> 
                : 
                <Spin />
            }
        </>
    )

}
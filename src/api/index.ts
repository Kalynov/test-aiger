import { API_KEY } from "../API_key";

export const getWeather = async (cityId: string, rej: any) => {
    try {
        let response = await fetch(`/data/2.5/weather?id=${cityId}&appid=${API_KEY}&units=metric&lang=RU`);
        return await response.json();
    } catch (e){
        rej()
    }
    
    
};
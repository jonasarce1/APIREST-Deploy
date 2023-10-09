import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts"; //Esto es para el archivo .env y poder ocultar la API_KEY
const env = await load(); //Cargamos el archivo .env

const getTemperatura = async (city:string):Promise<number> =>{
    const BASE_URL = "http://api.weatherapi.com/v1";

    const API_KEY = env["API_KEY_WEATHER"];

    const url = `${BASE_URL}/current.json?key=${API_KEY}&q=${city}`;

    const data = await fetch(url);

    if(data.status !== 200){ //Si al hacer la peticion el status no es 200 (ok) lanzamos un error
        throw new Error("No se ha podido obtener la informacion"); //Lanzamos un error
    }

    const json = await data.json(); //Convertimos la respuesta a json y esperamos a que nos respondan

    const temperatura = json.current.temp_c; //Obtenemos la temperatura

    return temperatura;
}

export default getTemperatura;
type Place = {
    city: string,
    country: string,
}
//Me creo un archivo para cada funcion

import { load } from "https://deno.land/std@0.202.0/dotenv/mod.ts"; //Esto es para el archivo .env y poder ocultar la API_KEY
const env = await load(); //Cargamos el archivo .env, luego hay que ignorarlo en el .gitignore para que no se suba a github y se vea la API_KEY

//cuando hago una llamada a alguien que no soy yo mismo, es asincrona (llamada a una api)
const getPlace = async (zipcode: number):Promise<Place> => { //Las funciones asincronas devuelven promesas
    const BASE_URL = "http://postalcode.parseapi.com/api"; //La api que vamos a usar
    
    const API_KEY = env["API_KEY_ZIPCODE"] || Deno.env.get("API_KEY_ZIPCODE"); //La api key que vamos a usar, la obtenemos del archivo .env
    
    if(!API_KEY){ //Si no hay API_KEY
        throw new Error("No se ha encontrado la API_KEY"); //Lanzamos un error
    }

    const url = `${BASE_URL}/${API_KEY}/${zipcode}`; //La url a la que vamos a hacer la peticion    
    
    //Estas dos lineas no cambian nunca
    const data = await fetch(url); //Hacemos la peticion y esperamos a que nos respondan
    if(data.status !== 200){ //Si al hacer la peticion el status no es 200 (ok) lanzamos un error
        throw new Error("No se ha podido obtener la informacion"); //Lanzamos un error
    }
    const json = await data.json(); //Convertimos la respuesta a json y esperamos a que nos respondan

    const city = json.city.name; //Obtenemos la ciudad de la respuesta
    const country = json.country.name; //Obtenemos el pais de la respuesta

    return {city, country}; //Devolvemos un objeto con la ciudad y el pais

}

export default getPlace; //Exportamos la funcion para poder usarla en otros archivos, es default porque solo exportamos una funcion
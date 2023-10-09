import express, {Request, Response} from "npm:express@4.18.2";
import getPlace from "./zipcode.ts";
import getTemperatura from "./temperatura.ts";

const app = express();

app.get("/temp/:zip", async (req:Request, res:Response) => {
    try{
        const zip = req.params.zip; //28012 corresponde a Belmont (EEUU)
        if(isNaN(parseInt(zip))){
            res.status(400).send("El codigo postal debe ser un numero");
            return;
        }
        const ciudad = (await getPlace(zip)).city;
        const temp = await getTemperatura(ciudad);
        res.send(`La temperatura en ${ciudad} es de ${temp} grados`);
    }catch(_excepcion){
        res.status(500).send("La ciudad no se ha enontrado");
    }

})

app.listen(3000);
import {Pool} from "pg"
import dotenv from "dotenv"


dotenv.config();


const {HOST,PORT,DATABASE,USER,PASSWORD} = process.env;

export const client = new Pool({
        host:HOST,
        port:Number(PORT),
        database:DATABASE,
        user:USER,
        password:PASSWORD
    })
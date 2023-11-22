import express from "express"
import bodyParser from "body-parser"
import cors from "cors"
import routes from "./routes/index"
import dotenv from "dotenv"

dotenv.config();

const app = express();

const middleWares = [cors(),bodyParser.json()];

app.use("/courseRegistration",middleWares,routes);

const host =String(process.env.SERVERHOST);
const port = Number(process.env.SERVERPORT);

app.listen(port,host,()=>{
    console.log(`*** Server runs on ${host}:${port} ***`);
})
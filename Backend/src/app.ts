import express, { urlencoded } from 'express'
import { dbConnection } from './db/connection'
import { port } from './config/appconfig'
import {router} from './routers'
import { errorHandlerMiddleware } from './handlers/errorResponse'
import cookieParser from 'cookie-parser'
import cors from 'cors'
const app = express()
const allowedOrigins = ['http://localhost:4200'];


const corsOption = {
    origin: (origin: any, callback: any) => {

        if (allowedOrigins.includes(origin) || !origin) {
            callback(null, true);
        }
        else {
            callback(new Error("Not allowed by cors"));
        }

    }
}
app.use(express.json())
app.use(cors(corsOption));
app.use(urlencoded({ extended:false}))
app.use(cookieParser());
app.use('/',router)
app.use(errorHandlerMiddleware)
app.use(express.static(__dirname + '/src/public/uploads'));
dbConnection().then(() => {
app.listen(port.port);
console.log("Server listening on port " + port.port);
}).catch((err)=>{
console.log(err.message);
})
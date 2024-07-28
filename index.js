import express from "express";
import dotenv from "dotenv"
dotenv.config()

import mongoose from "mongoose";
import cors from "cors"

import { getHealth } from "./controllers/health.js";
import { postPlant,getPlants, getPlantid, putPlantid, deletePlant } from "./controllers/plant.js";
import { handlePageNotFound } from "./controllers/errors.js";

const PORT = process.env.PORT
const app = express()
app.use(cors())
app.use(express.json())

//Mongo_DB_connection
const dbConnection = async ()=>{
    const conn = await mongoose.connect(`process.env.MONGO_URL`)

    if(conn){
        console.log(`MongoDB Connected 📦`)
    }
    else{
        console.log(`MongoDB Not Connected ❌`)
    }
}
dbConnection();

//Health_end_point
app.get("/health", getHealth)
//Create_plant
app.post("/plant", postPlant)
//Read_all_plants
app.get("/plants",getPlants)
//Read_single_plant
app.get("/plant/:id", getPlantid)
//Update_plant
app.put("/plant/:id", putPlantid)
//Delete_plant
app.delete("/plant/:id", deletePlant)

app.use("*", handlePageNotFound)
app.listen(PORT , ()=> console.log(`Server is running on port :${PORT}`));
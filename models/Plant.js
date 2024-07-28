import { Schema,model } from "mongoose";

const plantScheme=new Schema({
    name:String,
    category:String,
    price:Number,
    image:String,
    description:String,
},
{
    timestamps: true
})

const Plant =model("Plant",plantScheme)

export default Plant
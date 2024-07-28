import Plant from "../models/Plant.js"


const postPlant = async (req,res)=>{
    const {name, category, image, price, description} = req.body

    const newPlant = new Plant({
        name : name,
        category : category,
        image : image,
        price : price,
        description : description
    })

    const savedPlant = await newPlant.save();

    res.json({
        success : true,
        data : savedPlant,
        message : "New Plant added successfully"
    })
}

const getPlants = async (req,res)=>{
    const allPlants = await Plant.find().sort({updatedAt: -1})

    res.json({
        success : true,
        data : allPlants,
        message : "Plants data fetched successfully"
    })
}

const getPlantid = async (req,res)=>{
    const {id} = req.params

    const plant = await Plant.findById( id)
    res.json({
        success : plant ? true : false,
        data : plant || null,
        message : plant ? "plant fetched successfully" : "Plant not found"
    })
}

const putPlantid = async (req,res)=>{
    const {name, category, image, price, description} = req.body

    const {id} = req.params

    await Plant.updateOne({ _id : id},{
        $set : {
            name : name,
            category : category,
            image : image,
            price : price,
            description : description
        }
    })

    const updatedPlant = await Plant.findById(id)

    res.json({
        success : true,
        data : updatedPlant,
        message : `Plant updated successfully !`
    })
   
}

const deletePlant = async (req,res)=>{
    const {id} = req.params
   
    await Plant.deleteOne({
        _id : id
    })
    res.json({
        success :  true,
        data : null,
        message : "Plant Deleted Successfully"
    })
}
export {postPlant, getPlants, getPlantid, putPlantid, deletePlant}
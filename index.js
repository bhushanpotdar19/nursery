import express from "express"
import dotenv from "dotenv"
dotenv.config()

//server app
const app = express()
app.use(express.json())
const plants = [
    {
        "id": 1,
        "name": "bamboo",
        "category": "indoor",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkWoyU1QcI8miQHRt5p1f9TP7GutlsIQnqg&s",
        "price": 150,
        "description": "This is bamboo plant"
    },
    {
        "id": 2,
        "name": "rose",
        "category": "indoor",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkWoyU1QcI8miQHRt5p1f9TP7GutlsIQnqg&s",
        "price": 350,
        "description": "This is rose plant"
    },
    {
        "id": 3,
        "name": "mango",
        "category": "indoor",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRNkWoyU1QcI8miQHRt5p1f9TP7GutlsIQnqg&s",
        "price": 50,
        "description": "This is mango plant"
    }
]

//API
app.post("/plant", (req, res) => {

    const {
        name,
        category,
        image,
        price,
        description
    } = req.body


    if (!name) {
        return res.json({
            success: false,
            data: null,
            messege: "Name is required"
        })
    }
    if (!category) {
        return res.json({
            success: false,
            data: null,
            messege: "category is required"
        })
    }
    if (!image) {
        return res.json({
            success: false,
            data: null,
            messege: "image is required"
        })
    }
    if (!price) {
        return res.json({
            success: false,
            data: null,
            messege: "price is required"
        })
    }
    if (!description) {
        return res.json({
            success: false,
            data: null,
            messege: "Description is required"
        })
    }

    const randomId = Math.round(Math.random() * 1000)


    const newPlant = {
        id: randomId,
        name: name,
        category: category,
        image: image,
        price: price,
        description: description

    }

    plants.push(newPlant)

    res.json({
        success: true,
        data: newPlant,
        messege: "New plant added successfully"
    })


})


app.get("/plants", (req, res) => {
    res.json({
        success: true,
        data: plants,
        messege: "All plants fetched successfully"
    })

})

app.get("/plant/:id", (req, res) => {
    const { id } = req.params
    const plant = plants.find((p) => p.id == id)

    res.json({
        success: plant ? true : false,
        data: plant || null,
        messege: plant ? "plant getted" : "Plant is not found"
    })
})

app.put("/plant/:id", (req, res) => {
    const {
        name,
        category,
        image,
        price,
        description
    } = req.body

    const { id } = req.params
    let index = -1

    plants.forEach((plant, i) => {
        if (plant.id == id) {
            index = i
        }
    })

    res.json({
        success: true,
        data: index,
        messege: "update sucessfully"
    })


    const newObject = {
        id: id,
        name: name,
        category: category,
        image: image,
        price: price,
        description: description
    }


    if (index == -1) {
        return res.json({
            success: false,
            data: null,
            messege: "plant not found"

        })
    }
    else {
        plants[index] = newObject
        return res.json({
            success: true,
            data: newObject,
            messege: "plant updated successfully"
        })

    }
})

app.delete("/plant/:id", (req, res) => {
    const { id } = req.params
    let index = -1

    plants.forEach((plant, i) => {
        if (plant.id == id) {
            index = i
        }
    })
    if (index == -1) {
        return res.json({
            success: false,
            messege: `plant not found with id ${id}`
        })
    }

    plants.splice(index, 1)

    res.json({
        success: true,
        data: null,
        messege: "plant deleted successfully"

    })





})

const PORT = process.env.PORT

app.listen(PORT, () => {
    console.log(`Server is Running on PORT ${PORT}`)
})

require("dotenv").config()

const express = require("express")
const app = express()
const mongoose = require("mongoose")

mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    auth: {
        authdb: "admin"
    }
})
const db = mongoose.connection
db.on("error", (error) => console.log(error))

app.use(express.json())

const userRouter = require("./routes/users")
app.use("/users", userRouter)

app.listen(3000, () => console.log("Server Started"))
db.once("open", () => console.log("Connected to DB"))
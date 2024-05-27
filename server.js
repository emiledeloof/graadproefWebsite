const express = require("express")
const fs = require("fs")
const app = express()
const router = require("./routes/router")
const PORT = process.env.URL || 5001   
const DBPath = "./database/database.json"

let DBStructure = {
    attempts: 134,
    goalsMade: 129,
    fgPercentage: 0 
}
DBStructure.fgPercentage = parseInt(DBStructure.attemptsMade) / parseInt(DBStructure.attempts) * 100

let readDB = fs.readFileSync(DBPath, (e, data) => {
    if(e) throw e
})

app.use(express.static("views/statics"))
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    let parsedData = JSON.parse(readDB)
    res.render("pages/index", {
        attempts: parsedData.attempts,
        goals: parsedData.goalsMade,
        fgPercentage: parsedData.fgPercentage
    })
})

app.use("/requests", router)

app.listen(PORT, () => console.log("listening on port " + PORT))

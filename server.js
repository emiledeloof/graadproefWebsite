const express = require("express")
const fs = require("fs")
const PORT = 5001   
const app = express()
const DBPath = "./database/database.json"

let DBStructure = {
    attempts: 134,
    attemptsMade: 129,
    fgPercentage: 0 
}
DBStructure.fgPercentage = parseInt(DBStructure.attemptsMade) / parseInt(DBStructure.attempts) * 100

fs.readFileSync(DBPath, (e, data) => {
    if(e) throw e
    console.log(JSON.stringify(data))
})

app.use(express.static("views/statics"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("pages/index")
})

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)})
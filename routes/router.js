const express = require("express")
const router = express.Router()
const fs = require("fs")
const DBPath = "./database/database.json"

let data = {
    attempts: 0,
    goalsMade: 0,
    fgPercentage: 0
}

router.post("/reset", (req, res) => {
    data = {
        attempts: 0,
        goalsMade: 0,
        fgPercentage: 0
    }
    fs.writeFileSync(DBPath, JSON.stringify(data, null, 4))
    res.send({message: "All good"}).status(200)
})

router.post("/goal", (req, res) => {
    let dbData = fs.readFileSync(DBPath)
    let parsedData = JSON.parse(dbData)
    parsedData.goalsMade += 1
    parsedData.fgPercentage = parseFloat(calculatePercentage(parsedData.attempts, parsedData.goalsMade))
    fs.writeFileSync(DBPath, JSON.stringify(parsedData, null, 4))
    res.send({message: "All good"}).status(200)
})

function calculatePercentage(attempts, goals){

    console.log(goals, attempts)
    return (goals / attempts).toFixed(2)
}

module.exports = router
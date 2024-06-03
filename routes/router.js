const express = require("express")
const router = express.Router()
const fs = require("fs")
const DBPath = "./database/database.json"

let graphData = {
    attempt: 0,
    goalAmount: 0
}

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
    graphData.attempt = parsedData.attempts
    graphData.goalsAmount = parsedData.goalsMade
    let parsedGraphData = parsedData.graphData
    parsedGraphData.append(graphData)
    fs.writeFileSync(DBPath, JSON.stringify(parsedData, null, 4))
    res.send({message: "All good"}).status(200)
})

router.post("/attempt", (req, res) => {
    let dbData = fs.readFileSync(DBPath)
    let parsedData = JSON.parse(dbData)
    parsedData.attempts = parsedData.attempts + 1
    parsedData.fgPercentage = parseFloat(calculatePercentage(parsedData.attempts, parsedData.goalsMade))
    fs.writeFileSync(DBPath, JSON.stringify(parsedData, null, 4))
    res.send({message: "All good"}).status(200)
})

router.get("/getAttempts", (req, res) => {
    let dbData = fs.readFileSync(DBPath)
    let parsedData = JSON.parse(dbData)
    res.send({attempts: parsedData.attempts}).status(200)
})

router.get("/getGoals", (req, res) => {
    let dbData = fs.readFileSync(DBPath)
    let parsedData = JSON.parse(dbData)
    res.send({goals: parsedData.goalsMade}).status(200)
})

function calculatePercentage(attempts, goals){
    return (goals / attempts).toFixed(2)
}

module.exports = router
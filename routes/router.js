const express = require("express")
const router = express.Router()
const fs = require("fs")

router.post("/reset", (req, res) => {
    console.log(req.body.message)
    res.send({message: "All good"}).status(200)
})

module.exports = router
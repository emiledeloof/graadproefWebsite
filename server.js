const express = require("express")
const PORT = 5001   
const app = express()

app.use(express.static("views/statics"))
app.set("view engine", "ejs")

app.get("/", (req, res) => {
    res.render("pages/index")
})

app.listen(PORT, () => {console.log(`Listening on port ${PORT}`)})
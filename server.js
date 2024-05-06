const express = require("express")
const app = express()
const cors = require("cors")
app.use(express.json())
require("dotenv").config()
require("./db/db")()
app.use(cors())




const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})
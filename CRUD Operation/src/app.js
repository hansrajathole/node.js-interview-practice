const express = require('express')
const morgan = require("morgan")
const userRouter = require("./routers/user.route")
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api/auth",userRouter)





module.exports = app
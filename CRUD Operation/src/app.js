const express = require('express')
const morgan = require("morgan")
const userRouter = require("./routers/user.route")
const app = express()


app.use(userRouter)





module.exports = app
const app = require("./src/app")
const config = require("./src/config/config")
const connect = require("./src/db/db")
const PORT = config.PORT


app.listen(PORT , ()=>{
    console.log("server run on post :"+ PORT);  
    connect()
})


require("dotenv").config()

const _config = {
    PORT : process.env.PORT,
    MONGO_URI : process.env.MONGO_URI,
    JWT_SECREAT : process.env.JWT_SECREAT
}

const config = Object.freeze(_config)
module.exports = config
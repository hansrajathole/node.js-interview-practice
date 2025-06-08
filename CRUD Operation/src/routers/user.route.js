const {Router} = require('express')
const userController = require('../controller/user.controller')
const registerValidator = require("../middleware/userMiddleware")

const router = Router()

router.post("/register", registerValidator , userController.userCreate)


module.exports = router
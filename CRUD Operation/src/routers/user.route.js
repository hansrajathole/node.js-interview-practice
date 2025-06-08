const {Router} = require('express')
const userController = require('../controller/user.controller')
const expressValidation = require("../middleware/userMiddleware")

const router = Router()

router.post("/register", expressValidation.registerValidator , userController.registerController)
router.post("/login", expressValidation.loginValidator , userController.loginController)


module.exports = router
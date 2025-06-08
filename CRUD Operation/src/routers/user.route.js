const {Router} = require('express')
const userController = require('../controller/user.controller')
const expressValidation = require("../middleware/userMiddleware")
const protected = require("../middleware/protectedMiddleware")
const router = Router()

router.post("/register", expressValidation.registerValidator , userController.registerController)
router.post("/login", expressValidation.loginValidator , userController.loginController)
router.get("/me" , protected , userController.meController)


module.exports = router
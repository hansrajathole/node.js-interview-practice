const {Router} = require('express')
const userController = require('../controller/user.controller')
const expressValidation = require("../middleware/userMiddleware")
const protected = require("../middleware/protectedMiddleware")
const router = Router()

router.post("/register", expressValidation.registerValidator , userController.registerController)
router.post("/login", expressValidation.loginValidator , userController.loginController)
router.patch('/update' , protected , userController.updateProfile)
router.delete("/delete" , protected , userController.deleteController)
router.get("/me" , protected , userController.meController)


module.exports = router
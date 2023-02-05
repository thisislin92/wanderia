const express = require('express')
const router = express.Router()
const controller = require('../controllers/userController')
const { authentication } = require('../middlewares')

router.get("/", authentication, controller.findAllUser)
router.post("/", controller.registerUser)
router.post("/login", controller.loginUser)
router.get("/:id", controller.findUserByPk)
router.patch("/:id", controller.updateUserByPk)
router.delete("/:id", controller.deleteUser)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controllers/userPreferencesController')
const { authentication } = require('../middlewares')


// router.get("/", controller.findAllUserPreferences)
router.post("/",authentication, controller.registerUserPreferences)
router.get("/:id", controller.findPreferencesUserIdAndPreferenceId)
router.delete("/:id",authentication, controller.deleteUserPreferences)

module.exports = router
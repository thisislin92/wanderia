const express = require('express')
const router = express.Router()
const controller = require('../controllers/userPreferencesController')
const { authentication } = require('../middlewares')

router.get("/", authentication, controller.findUserPreferencesByUserId)
router.post("/",authentication, controller.registerUserPreferences)
router.delete("/:id",authentication, controller.deleteUserPreferences)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controllers/preferencesController')


router.get("/", controller.findAllPreferences)
router.post("/", controller.registerPreferences)
router.post("/login", controller.registerPreferences)
router.get("/:id", controller.findPreferencesByPk)
router.patch("/:id", controller.updatePreferencesByPk)
router.delete("/:id", controller.deletePreferences)

module.exports = router
const express = require('express')
const router = express.Router()
const controller = require('../controllers/partnerController')

router.get("/", controller.findAllPartner)
router.post("/", controller.createPartner)
router.get("/:id", controller.findPartnerByPk)
router.delete("/:id", controller.deletePartner)

module.exports = router
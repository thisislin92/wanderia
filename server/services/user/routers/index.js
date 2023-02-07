const express = require("express");
const router = express.Router();
const userRouter = require("./userRouter");
const preferencesRouter = require("./preferencesRouter")
const userPreferencesRouter = require("./userPreferencesRouter")
router.use("/users", userRouter);
router.use("/preferences", preferencesRouter)
router.use("/userPreferences", userPreferencesRouter)
module.exports = router;

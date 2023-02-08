const express = require("express");
const BusinessController = require("../controllers/businesController");
const CategoryController = require("../controllers/categoryController");
const UserController = require("../controllers/userController");
const { authentication, authorization } = require("../middleware/auth");
const router = express.Router();
const postRouter = require("./postRoute");

router.post("/partner/register", UserController.register);
router.post("/partner/login", UserController.login);
router.get("/", BusinessController.getAllBusinesses);
router.get("/categories", CategoryController.readCategory);
router.get("/business/:id", BusinessController.getOneBusiness);
router.put("/business/:id", BusinessController.updateStatus); //super admin
router.get("/categories/:id", CategoryController.readCategoryId);
router.use("/post", postRouter);
router.use(authentication);
router.get("/business", BusinessController.getPartnerBusiness);
router.post("/business", BusinessController.createBusiness);

router.patch("/business/:id", authorization, BusinessController.editBusiness);
router.delete(
    "/business/:id",
    authorization,
    BusinessController.deleteBusiness
);

module.exports = router;
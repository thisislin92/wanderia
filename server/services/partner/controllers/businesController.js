const { Partner, Business } = require("../models/index");
class BusinessController {
    static async createBusiness(req, res, next) {
        try {
            const { name, description, CategoryId, mapUrl, PartnerId } =
                req.body;
            const data = await Business.create({
                name,
                description,
                CategoryId,
                mapUrl,
                PartnerId,
                status: "pending",
            });

            res.status(201).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = BusinessController;

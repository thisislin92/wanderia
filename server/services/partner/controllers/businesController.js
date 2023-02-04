const { Partner, Business } = require("../models/index");
class BusinessController {
    static async createBusiness(req, res, next) {
        try {
            const {
                name,
                description,
                CategoryId,
                mapUrl,
                PartnerId,
                imageUrl,
            } = req.body;
            const data = await Business.create({
                name,
                description,
                CategoryId,
                mapUrl,
                PartnerId,
                imageUrl,
                status: "pending",
            });

            res.status(201).json(data);
        } catch (error) {
            console.log(error);
        }
    }

    static async editBusiness(req, res, next) {
        try {
            const id = req.params.id;
            const { name, description, CategoryId, mapUrl, imageUrl } =
                req.body;
            const data = await Business.update(
                {
                    name,
                    description,
                    CategoryId,
                    mapUrl,
                    imageUrl,
                },
                {
                    where: {
                        id,
                    },
                }
            );
            res.status(201).json("data berhasil di update");
        } catch (error) {
            console.log(error);
        }
    }

    static async getAllBusinesses(req, res, next) {
        try {
            const data = await Business.findAll();
            res.status(200).json(data);
        } catch (error) {
            console.log(error);
        }
    }
}

module.exports = BusinessController;

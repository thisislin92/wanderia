const { ObjectId } = require("mongodb")
const Route = require("../models")

class RoutesController {
    static async getAllRoutes(req, res, next) {
        try {
            let data = await Route.findAll()
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addRoute(req, res) {
        try {
            const { allRoutes, BussinessId, UserId } = req.body

            const payload = allRoutes.map((el, index) => {
                return {
                    UserId: UserId,
                    routeNumber: index + 1,
                    BussinessId: BussinessId,
                    destination: el
                }
            })
            let data = await Route.create(payload)
            // console.log(data)
            // let newRoute = await Route.findOne(data.insertedId)
            // res.status(201).json(data.insertedIds)
            res.status(201).json({ message: 'Success create new routes' })
        } catch (error) {
            next(error)
        }
    }

    static async getOneRoute(req, res) {
        try {
            const { _id } = req.params
            let data = await Route.findOne(new ObjectId(_id))
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async deleteOneRoute(req, res) {
        try {
            const { UserId } = req.params
            await Route.destroy(+UserId)
            res.status(200).json({ message: `Success delete Route with UserId: ${UserId}` })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = RoutesController
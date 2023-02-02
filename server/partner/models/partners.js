const { ObjectId } = require('mongodb')
const { getDatabase } = require('../config/mongodb')


class Partner {
    static async findAllPartner() {
        try {
            const db = getDatabase()
            const dataPartnerFromDb = db.collection("Partners")
            let dataUser = await dataPartnerFromDb.find().toArray()
            return dataUser
        } catch (error) {
            throw error
        }
    }

    static async createUser(dataPartners) {
        try {
            const data = {
                ...dataPartners,
                created_at: new Date()
            }
            const db = getDatabase()
            const dataPartnerFromDb = db.collection("Partners")
            const result = await dataPartnerFromDb.insertOne(data)
            return result
        } catch (error) {
            throw error
        }
    }

    static async findPartnerByPk(id) {
        try {
            const db = getDatabase()
            const dataPartnerFromDb = db.collection("Partners")
            const data = await dataPartnerFromDb.findOne({
                _id: ObjectId(id)
            })
            return data
        } catch (error) {
            throw error
        }
    }

    static async deletePartner(id) {
        try {
            const db = getDatabase()
            const dataPartnerFromDb = db.collection("Partners")
            const data = await dataPartnerFromDb.deleteOne({
                _id:ObjectId(id)
            })
            return data
        } catch (error) {
            throw error
        }
    }




}

module.exports = Partner
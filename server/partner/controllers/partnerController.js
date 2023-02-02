const Partner = require("../models/partners");

class partnerController {
  static async findAllPartner(req, res, next) {
    try {
      const dataPartners = await Partner.findAllPartner();
      const response = dataPartners.map(partner => {
        return {
          ...partner,

          created_at: undefined,
          createdAt: partner.created_at,
          updatedAt: partner.updatedAt || null
        }
      })

      res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }

  static async createPartner(req, res, next) {
    try {
      const { email, password, address, name } = req.body;
      const data = await Partner.createUser({
        name,
        email,
        password,
        address,
      });

      res.status(200).json(data);
    } catch (error) {
      next(error);
    }
  }

  static async findPartnerByPk(req, res, next) {
    try {

      const  {id}  = req.params;
      const dataPartners = await Partner.findPartnerByPk(id);
      res.status(200).json(dataPartners);
    } catch (error) {
      next(error);
    }
  }

  static async deletePartner(req, res, next) {
    try {
    const  {id}  = req.params;
    const dataUsers = await Partner.findPartnerByPk(id);
    if(!dataUsers) {
        throw {
            name:"notFound"
        }
    }
    const data = await Partner.deletePartner(id)
    res.status(200).json({message:" Successfully Deleted"})
      
    } catch (error) {
        nest(error)
    }
    
}
}

module.exports = partnerController;

const axios = require("axios");
const FormData = require('form-data')
const redis = require("../configs/ioredis");

const partnerPostTypeDef = `#graphql
    type PartnerPost {
        id: ID,
        name: String,
        imageUrl: String,
        BusinessId: Int
    }

    type Query {
        allPartnerPost(access_token: String): [PartnerPost] 
    }

    input NewPartnerPost {
        name: String,
        BusinessId: Int,
        access_token: String
    }

    type Mutation {
        addNewPartnerPost(input: NewPartnerPost): [PartnerPost] 
    }
`;

const partnerPostResolver = {
    Query: {
        allPartnerPost: async (_, args) => {
            try {
                const { access_token } = args
                const cache = await redis.get("partnerPost")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    const { data } = await axios({
                        method: 'GET',
                        url: `${process.env.PARTNER_URL}/post`,
                        headers: {
                            access_token
                        }
                    })
                    await redis.set("partnerPost", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        }
    },
    Mutation: {
        addNewPartnerPost: async (_, args) => {
            try {
                const { name, BusinessId, access_token } = args.input
                const response = await axios({
                    method: "POST",
                    url: `${process.env.PARTNER_URL}/add-post/${BusinessId}`,
                    data: { name },
                    headers: {
                        access_token
                    }
                })
            } catch (error) {
                throw error.response.data
            }
        }
    }
}

module.exports = { partnerPostTypeDef, partnerPostResolver }
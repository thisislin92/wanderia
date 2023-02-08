const axios = require("axios");
const redis = require("../configs/ioredis");

const partnerCategoryTypeDefs = `#graphql
    type PartnerCategory {
        id: ID,
        name: String,
        symbol: String
    }

    type Query {
        allPartnerCategories: [PartnerCategory]
    }
`;

const partnerCategoryResolver = {
    Query: {
        allPartnerCategories: async (_, args) => {
            try {
                const cache = await redis.get("partnerCategories");
                if (cache) {
                    const data = await JSON.parse(cache);
                    return data;
                } else {
                    const { data } = await axios({
                        method: "GET",
                        url: `${process.env.PARTNER_URL}/categories`,
                    });
                    await redis.set("partnerCategories", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                throw error.response.data;
            }
        },
    },
};

module.exports = { partnerCategoryTypeDefs, partnerCategoryResolver };

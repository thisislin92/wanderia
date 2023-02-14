const axios = require("axios");
const redis = require("../configs/ioredis");

const cloudinary = require("cloudinary");

const partnerPostTypeDef = `#graphql
    type PartnerPost {
        id: ID,
        name: String,
        imageUrl: String,
        BusinessId: Int,
        link: String
    }

    type Query {
        allPartnerPost(access_token: String): [PartnerPost] 
    }

    type Message {
        message: String
    }

    input DeletePost {
        id: Int,
        access_token: String
    }

    input NewPartnerPost {
        name: String,
        BusinessId: Int,
        access_token: String,
        photo: String,
        link: String
    }

    type Mutation {
        uploadPhoto(input: NewPartnerPost): PartnerPost,
        deletePost(input: DeletePost): Message
    }
`;

const partnerPostResolver = {
    Query: {
        allPartnerPost: async (_, args) => {
            try {
                const { access_token } = args;
                const cache = await redis.get("partnerPost");
                if (cache) {
                    const data = await JSON.parse(cache);
                    return data;
                } else {
                    const { data } = await axios({
                        method: "GET",
                        url: `${process.env.PARTNER_URL}/post`,
                        headers: {
                            access_token,
                        },
                    });
                    await redis.set("partnerPost", JSON.stringify(data));
                    return data;
                }
            } catch (error) {
                throw error.response.data;
            }
        },
    },
    Mutation: {
        uploadPhoto: async (_, args) => {
            const { name, BusinessId, access_token, photo, link } = args.input;
            // let result;

            try {
                cloudinary.config({
                    cloud_name: process.env.CLOUDINARY_NAME,
                    api_key: process.env.CLOUDINARY_API_KEY,
                    api_secret: process.env.CLOUDINARY_API_SECRET,
                });
                const result = await cloudinary.v2.uploader.upload(photo, {
                    public_id: "",
                    folder: "Wanderia",
                });
                const response = await axios({
                    method: "POST",
                    url: `${process.env.PARTNER_URL}/post/add/${BusinessId}`,
                    data: { name, link, imageUrl: result ? result.url : "" },
                    headers: {
                        access_token,
                    },
                });
                return response.data;
            } catch (error) {
                return `Image could not be uploaded:${error.message}`;
            }
        },
        deletePost: async (_, args) => {
            try {
                const { id, access_token } = args.input;
                const response = await axios({
                    method: "DELETE",
                    url: `${process.env.PARTNER_URL}/post/${id}`,
                    headers: {
                        access_token,
                    },
                });
                return response.data;
            } catch (error) {
                throw error.response.data;
            }
        },
    },
};

module.exports = { partnerPostTypeDef, partnerPostResolver };

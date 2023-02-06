const axios = require("axios");
const redis = require("../configs/ioredis");

const { readFileSync } = require("fs"); // this is used to import the graphql schema definition

//contract
const userTypeDefs = readFileSync(
  require.resolve("./graphql/user.graphql")
).toString("utf-8");

const userResolver = {
    Query: {
        getAllUsers: async () => {
            try {
                const cache = await redis.get("users")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    const { data } = await axios.get(`${process.env.USER_URL}/users`)
                    await redis.set("users", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        },
    },
    Mutation: {
        registerNewUser: async (_, args) => {
            try {
                // const {
                //   name,
                //   email,
                //   password,
                //   phoneNumber,
                //   dateOfBirth,
                //   address
                // } = args.input
                const response = await axios({
                    method: "POST",
                    url: `${process.env.USER_URL}/users`,
                    data: args.input,
                })
                await redis.del('users')
                return response.data
            } catch (error) {
                throw error.response.data;
            }
        }
    }
};

module.exports = { userTypeDefs, userResolver }
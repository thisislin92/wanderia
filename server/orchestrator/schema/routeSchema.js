const axios = require("axios");
const redis = require("../configs/ioredis");

const routeTypeDefs = `#graphql
    type Route {
        tripId: String
        name: String,
        address: String,
        latitude: Float,
        longitude: Float,
    }

    type Message {
        message: String
    }

    type Bussiness{
        id: Int,
        name: String,
        address: String,
        latitude: Float,
        longitude: Float,
    }

    type NewRoute {
        placeOfOrigin: String,
        destination: String,
        neLat: String,
        swLat: String,
        neLon: String,
        swLon: String,
    }

    input NewRoute {
        placeOfOrigin: String,
        destination: String,
        neLat: String,
        swLat: String,
        neLon: String,
        swLon: String,
    }

    input GetBusiness {
        neLat: String,
        swLat: String,
        neLon: String,
        swLon: String,
    }

    type Query {
        allRoutes: [Route],
        allRoutesEachOneTrip(UserId: Int): [Route]
        allBusiness(input: GetBusiness): [Bussiness]
    }

    type Mutation {
        addNewTrip(input: NewRoute): [Route]
    }
`;

const routeResolver = {
    Query: {
        allRoutes: async () => {
            try {
                const cache = await redis.get("routes")
                if (cache) {
                    const data = await JSON.parse(cache)
                    return data
                } else {
                    const { data } = await axios.get(`${process.env.JOURNEY_URL}/routes`)
                    await redis.set("routes", JSON.stringify(data))
                    return data
                }
            } catch (error) {
                throw error.response.data
            }
        },
        allRoutesEachOneTrip: async (_, args) => {
            try {
                const { UserId } = args
                const { data } = await axios({
                    url: `${process.env.JOURNEY_URL}/routes/${UserId}`,
                });
                return data
            } catch (error) {
                throw error.response.data;
            }
        },
        allBusiness: async (_, args) => {
            console.log('masuk allbusiness')
            try {
                const { data } = await axios({
                    url: `${process.env.PARTNER_URL}`,
                });
                console.log(data.length)
                const filteredData = data.filter((marker) => {
                    return marker.latitude <= +args.input.neLat + 0.0005 && marker.latitude >= +args.input.swLat - 0.0005 && marker.longitude <= +args.input.neLon + 0.0005 && marker.longitude >= +args.input.swLon - 0.0005
                })
                console.log(filteredData.length)
                return filteredData
            } catch (error) {
                throw error.response.data;
            }
        }
    },
    Mutation: {
        addNewTrip: async (_, args) => {
            const origin = args.input.placeOfOrigin.split(' ')
            const destination = args.input.destination.split(' ')

            function getCorners(coord1, coord2) {
                const left = Math.min(coord1[1], coord2[1]);
                const right = Math.max(coord1[1], coord2[1]);
                const bottom = Math.min(coord1[0], coord2[0]);
                const top = Math.max(coord1[0], coord2[0]);
              
                return { left, right, bottom, top };
              }

            const corner = getCorners(origin, destination)
            try {
                const response1 = await axios({
                    url: `${process.env.PARTNER_URL}`,
                });
                const filteredData = response1.data.filter((marker) => {
                    return marker.latitude <= +corner.top + 0.0005 && marker.latitude >= +corner.bottom - 0.0005 && marker.longitude <= +corner.right + 0.0005 && marker.longitude >= +corner.left - 0.0005
                })

                console.log(filteredData, "filteredData")
                
                
                const trimData = filteredData.map(el => {
                    return {
                        id: el.id,
                        name: el.name,
                        address: el.address,
                        latitude: el.latitude,
                        longitude: el.longitude,
                    }
                })

                console.log(trimData, "trimData")

                const randomItems = []
                for (let i = 0; i < 20; i++) {
                    const randomIndex = Math.floor(Math.random() * trimData.length)
                    randomItems.push(trimData[randomIndex])
                    trimData.splice(randomIndex, 1)
                }

                console.log(randomItems, "randomItems")
                // const sliceData = trimData.slice(0, 30)
                // console.log(randomItems, "ini random")
                // console.log(sliceData)
                


                await redis.del('routes')
                const { placeOfOrigin, destination } = args.input
                const response = await axios({
                    method: "POST",
                    url: `http://localhost:4003/routes`,
                    data: { placeOfOrigin, destination, dataBusiness: randomItems },
                })
                console.log(response)
                return response.data
            } catch (error) {
                console.log(error)
                throw error.response.data;
            }
        }
    }
};

module.exports = { routeTypeDefs, routeResolver }
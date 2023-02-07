const Route = require("../models");
const fs = require("fs");

const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

class RoutesController {
    static async getAllRoutes(req, res, next) {
        try {
            let data = await Route.findAll();
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async addRoute(req, res, next) {
        // console.log('asdasdasd')
        try {
            const { placeOfOrigin, destination, dataBusiness } = req.body;
            console.log(placeOfOrigin, "placeOfOrigin");
            const inputBusiness = dataBusiness.map((el) => {
                return `${el.name} ${el.latitude} ${el.longitude} ${el.address}`;
            });

            console.log(inputBusiness);

            let input = `berikan rute perjalanan dari ${placeOfOrigin} ke ${destination} yang hanya melewati 4 tempat dari data berikut ${inputBusiness}, berikan hanya nama tempat, latitude, longitude, serta alamatnya dari masing masing tempat hanya dengan format seperti berikut, name:xxx, latitude: xxx, longitude: xxx, address: xxx`;
            const { data } = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: input,
                // temperature: 0,
                max_tokens: 3000,
                top_p: 0.0001,
                // frequency_penalty: 0,
                // presence_penalty: 0,
                // stop: ["\n"],
            });

            const result = data.choices[0].text.split("\n");
            // console.log(result)
            const filteredData = result.filter((el) => {
                return el !== "";
            });
            console.log(filteredData);
            const finalData = [];

            for (let i = 0; i < filteredData.length; i++) {
                const elements = filteredData[i].split(", ");
                const name = elements[0];
                const latitude = elements[1].split(": ")[1];
                const longitude = elements[2].split(": ")[1];
                const address = elements[3].split(": ")[1];
                finalData.push({ name, latitude, longitude, address });
            }

            let id = "TRIP_" + Math.floor(1000_000 + Math.random() * 9000_000);
            finalData.forEach((el) => {
                el.tripId = id;
            });

            function sortCoordinates(finalData, placeOfOrigin) {
                placeOfOrigin = placeOfOrigin.split(" ");
                return finalData.sort((a, b) => {
                    const distA = distanceFromOrigin(
                        [a.latitude, a.longitude],
                        placeOfOrigin
                    );
                    const distB = distanceFromOrigin(
                        [b.latitude, b.longitude],
                        placeOfOrigin
                    );
                    return distA - distB;
                });
            }

            function distanceFromOrigin(coord, placeOfOrigin) {
                return Math.sqrt(
                    Math.pow(coord[1] - placeOfOrigin[1], 2) +
                        Math.pow(coord[0] - placeOfOrigin[0], 2)
                );
            }

            const sorted = sortCoordinates(finalData, placeOfOrigin);

            console.log(sorted);
            await Route.create(sorted);
            res.status(201).json(sorted);

            // console.log(finalData);
            // for (let i = 0; i < filteredData.length; i++) {
            //   const splitData = filteredData[i].split(" ");
            //   const nama = splitData.slice(2, splitData.length - 3).join(" ");
            //   const latitude = splitData[splitData.length - 3];
            //   const longitude = splitData[splitData.length - 2];
            //   const address = splitData.slice(splitData.length - 1).join(" ");
            //   finalData.push({ nama, latitude, longitude, address });
            // }
            // console.log(filteredData)

            // let splitData = (data.choices[0].text).split('\n\n')
            // let array = []
            // splitData.map((el) => {
            //     if (el.includes('.')) {
            //         array.push(el)
            //     }
            // })

            // function convertToArrayOfObjects(data) {
            //     const headers = ['name', 'address', 'latitude', 'longitude'];
            //     let result = [];

            //     for (let i = 0; i < data.length; i++) {
            //         let obj = {};
            //         let currentData = data[i].split('\n');

            //         for (let j = 0; j < headers.length; j++) {
            //             obj[headers[j]] = currentData[j].trim();
            //         }

            //         result.push(obj);
            //     }

            //     return result;
            // }

            // let newArray = convertToArrayOfObjects(array)
            // newArray.forEach((el) => {
            //     let temp = []
            //     let egg = el.name.split(' ')
            //     egg.map((el, i) => {
            //         if (i !== 0) {
            //             temp.push(el)
            //         }
            //     })
            //     el.name = temp.join(' ')
            // })

            // let id = "TRIP_" + Math.floor(1000_000 + Math.random() * 9000_000)
            // const filteredData = newArray.map(obj => {
            //     return {
            //         id: id,
            //         name: obj.name,
            //         address: obj.address.replace("Alamat: ", ""),
            //         latitude: obj.latitude.replace("Latitude: ", ""),
            //         longitude: obj.longitude.replace("Longitude: ", "")
            //     }
            // });
            // // console.log(filteredData)
            // // res.status(200).json(filteredData)
            // await Route.create(filteredData)
            // // res.status(200).json(newArray)
            // res.status(201).json(filteredData)
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async getOneRoute(req, res) {
        try {
            const { UserId } = req.params;
            let data = await Route.findOne(+UserId);
            res.status(200).json(data);
        } catch (error) {
            next(error);
        }
    }

    static async deleteOneRoute(req, res) {
        try {
            const { UserId } = req.params;
            await Route.destroy(+UserId);
            res.status(200).json({
                message: `Success delete Route with UserId: ${UserId}`,
            });
        } catch (error) {
            next(error);
        }
    }
}

module.exports = RoutesController;

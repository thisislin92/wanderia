if (process.env.NODE_ENV !== "production") {
    require("dotenv").config();
}

const { ApolloServer } = require("@apollo/server");
const { startStandaloneServer } = require("@apollo/server/standalone");
const { routeTypeDefs, routeResolver } = require("./schema/routeSchema");

const port = process.env.PORT || 4000;

const server = new ApolloServer({
    typeDefs: [routeTypeDefs],
    resolvers: [routeResolver],
    introspection: true,
});

startStandaloneServer(server, { listen: { port } })
    .then(({ url }) => {
        console.log(`🚀 Server ready at ${url}`);
    })
    .catch((err) => {
        console.log(err);
    });

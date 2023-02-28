import "reflect-metadata";
import express, {Express, Request, Response} from "express";
import {ApolloServer} from "apollo-server-express";
import cors from "cors";
import datasource from "./db";
import {buildSchema} from "type-graphql";
import {CityResolver} from "./resolver/CityResolver";
import {UserResolver} from "./resolver/UserResolver";
import {PoiResolver} from "./resolver/PoiResolver";
import {env} from "./env";
import {
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageLocalDefault,
} from "apollo-server-core";
import * as http from "http";

const start = async () => {
    await datasource.initialize();
    const app: Express = express();
    const httpServer = http.createServer(app);

    const schema = await buildSchema({
        resolvers: [CityResolver, UserResolver, PoiResolver],
    });

    const apolloServer = new ApolloServer({
        schema,
        csrfPrevention: true,
        cache: "bounded",
        plugins: [
            ApolloServerPluginDrainHttpServer({httpServer}),
            ApolloServerPluginLandingPageLocalDefault({embed: true}),
        ],
        // https://www.apollographql.com/docs/apollo-server/v3/security/authentication/#putting-authenticated-user-info-on-the-context
        context: ({req, res}) => {
            return {req, res};
        },
    });

    console.log("Hello World");
    const allowedOrigins = env.CORS_ALLOWED_ORIGINS.split(",");

    app.use(express.json());
    app.use(
        cors({
            credentials: true,
            origin: (origin, callback) => {
                if (typeof origin === "undefined" || allowedOrigins.includes(origin))
                    return callback(null, true);
                callback(new Error("Not allowed by CORS"));
            },
        })
    )

    app.get("/", (req: Request, res: Response) => {
        res.send("<h1>Bienvenue sur City Simononio</h1>");
    });

    await apolloServer.start();
    apolloServer.applyMiddleware({app, cors: false, path: "/"});
    const port = process.env.PORT || 4000;

    app.listen(port, () => {
        console.log(`🚀 App listening on port ${port}/graphql 🥳`);
    });
};
void start();
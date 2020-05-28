import dotenv from 'dotenv';
dotenv.config();

import { Options } from 'graphql-yoga';
import app from './app';
import connectionOptions from './ormConfig'
import { createConnection } from 'typeorm';
import decodeJWT from './utils/decodeJWT';

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const SUBSCRIPTION_ENDPOINT: string = "/subscription";


const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT,
    subscriptions: {
        path: SUBSCRIPTION_ENDPOINT,
        onConnect: async connectionParams => {

            console.log("subscription onConnect params : " + connectionParams);

            const token = connectionParams["X-JWT"];
            if (token) {
                const user = await decodeJWT(token);
                if (user) {
                    return {
                        currentUser: user
                    };
                }
            }
            throw new Error("No JWT. Can't subscribe");
        }
    }

}

console.log(connectionOptions.entities);

const handleAppStat = () => console.log(`Listening on port ${PORT}`)
createConnection(connectionOptions).then(m => {
    console.log(`success create connection ${m.isConnected}`);
    app.start(appOptions, handleAppStat);
}).catch(e => console.log(e));

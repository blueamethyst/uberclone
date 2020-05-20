import { Options } from 'graphql-yoga';
import app from './app';
import connectionOptions from './ormConfig'
import { createConnection } from 'typeorm';
import dotenv from 'dotenv';

dotenv.config();

const PORT: number | string = process.env.PORT || 4000;
const PLAYGROUND_ENDPOINT: string = "/playground";
const GRAPHQL_ENDPOINT: string = "/graphql";
const appOptions: Options = {
    port: PORT,
    playground: PLAYGROUND_ENDPOINT,
    endpoint: GRAPHQL_ENDPOINT
}
const handleAppStat = () => console.log(`Listening on port ${PORT}`)
createConnection(connectionOptions).then(m => {
    console.log(`success create connection ${m.isConnected}`);
    app.start(appOptions, handleAppStat);
}).catch(e => console.log(e));

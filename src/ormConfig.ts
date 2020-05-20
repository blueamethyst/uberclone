import { ConnectionOptions } from 'typeorm'
const connectionOptions: ConnectionOptions = {
    type: "mongodb",
    database: "nuber",
    synchronize: true,
    logging: true,
    entities: ["entities/**/*.*"],
    host: process.env.DB_ENDPOINT,
    port: 27017,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD
};

export default connectionOptions;

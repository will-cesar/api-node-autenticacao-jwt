import { createConnection } from "typeorm";

export const connectToDb = async () => {
    const conn = await createConnection();
    console.log(`App connected to db ${conn.options.database}`);

    process.on('SIGINT', () => {
        conn.close().then(() => console.log('DB connection closed'));
    });
}
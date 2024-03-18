import sqlite3 from 'sqlite3';
import { open, Database } from "sqlite";


const createTables = async (db: Database<sqlite3.Database, sqlite3.Statement>) => {
    // Create table if not exists
    await db.exec(`CREATE TABLE IF NOT EXISTS events (
        id TEXT PRIMARY KEY,
        ticket_type TEXT,
        title TEXT,
        start_date TEXT,
        end_date TEXT,
        status TEXT,
        image TEXT,
        total_orders INTEGER,
        scanned_orders INTEGER,
        error TEXT
    );`);
}


// Function to establish SQLite database connection
export const initDatabase = (): sqlite3.Database => {
    try {
        const db = new sqlite3.Database(
            'data.db',
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                if (err) {
                    return console.error(`Error connecting to database: ${err}`);
                }

                console.log("Connected to the SQlite database.");
            }
        );

        open({
            filename: 'data.db',
            driver: sqlite3.Database
        }).then(async (db) => {
            await createTables(db);
        });

        return db;
    } catch (error: any) {
        console.error(`Error connecting to database: ${error}`);
        const db = new sqlite3.Database(':memory:');
        return db;
    }
};
// Connect to SQLite database
// const db = initDatabase();
// // db.serialize(() => {
// //     db.run(`CREATE TABLE IF NOT EXISTS events (
// //     id TEXT PRIMARY KEY,
// //     ticket_type TEXT,
// //     title TEXT,
// //     start_date TEXT,
// //     end_date TEXT,
// //     status TEXT,
// //     image TEXT,
// //     total_orders INTEGER,
// //     scanned_orders INTEGER,
// //     error TEXT
// // );`);
// // });


// db.close();
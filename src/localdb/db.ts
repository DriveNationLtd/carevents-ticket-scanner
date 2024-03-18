import sqlite3 from 'sqlite3';
import { open, Database } from "sqlite";

// Function to establish SQLite database connection
export const initDatabase = (): sqlite3.Database => {
    try {
        return new sqlite3.Database(
            'data.db',
            sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
            (err) => {
                if (err) {
                    return console.error(err.message);
                }
                console.log("Connected to the SQlite database.");
            }
        );
    } catch (error: any) {
        console.error(error.message);
        return new sqlite3.Database(':memory:');
    }
};

// Connect to SQLite database
const db = initDatabase();

// Create table if not exists
db.serialize(() => {
    db.run(`CREATE TABLE IF NOT EXISTS events (
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
});

db.close();
import sqlite3 from 'sqlite3';

// Connect to SQLite database
let db: sqlite3.Database;
try {
    db = new sqlite3.Database('data.db');
} catch (error: any) {
    console.error(error.message);
    db = new sqlite3.Database(':memory:');
}

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

// Function to establish SQLite database connection
export const initDatabase = (): sqlite3.Database => {
    try {
        return new sqlite3.Database('data.db');
    } catch (error: any) {
        console.error(error.message);
        return new sqlite3.Database(':memory:');
    }
};


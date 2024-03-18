import sqlite3 from 'sqlite3';

// Connect to SQLite database
const db = new sqlite3.Database('../data.db');

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
    return new sqlite3.Database('./data.db');
};


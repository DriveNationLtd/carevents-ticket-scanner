import { Event } from "@/types/event";
import { initDatabase } from "@/localdb/db";


// Function to insert event into database
export const insertEvent = (event: Event) => {
    const db = initDatabase();

    db.run(
        `INSERT INTO events (id, ticket_type, title, start_date, end_date, status, image, total_orders, scanned_orders, error)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
            event.id,
            event.ticket_type,
            event.title,
            event.start_date,
            event.end_date,
            event.status,
            event.image,
            event.orders ? event.orders.total : null,
            event.orders ? event.orders.scanned : null,
            event.orders ? event.orders.error : null
        ],
        (err) => {

            if (err) {
                console.error('Error inserting event:', err.message);
            } else {
                console.log('Event inserted successfully');
            }
        }
    );

    db.close();
};

// Function to get all events from the database
export const getAllEvents = (): Promise<Event[]> => {

    return new Promise((resolve, reject) => {
        const db = initDatabase();

        db.all(`SELECT * FROM events`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                // Transform database rows into Event objects
                const events: Event[] = rows.map((row: any) => {
                    return {
                        id: row.id,
                        ticket_type: row.ticket_type,
                        title: row.title,
                        start_date: row.start_date,
                        end_date: row.end_date,
                        status: row.status,
                        image: row.image,
                        orders: row.total_orders ? {
                            total: row.total_orders,
                            scanned: row.scanned_orders,
                            error: row.error
                        } : undefined
                    };
                });
                resolve(events);
            }

            db.close();
        });
    });
};

// Function to clear all data from all tables in the database
export const clearDatabase = (): Promise<void> => {
    return new Promise((resolve, reject) => {
        const db = initDatabase();

        db.run(`DELETE FROM events`, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });

        db.close();
    });
};
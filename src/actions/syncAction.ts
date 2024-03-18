'use server'
import { clearDatabase, insertEvent } from "@/localdb/db-helpers";
import { Event } from "@/types/event";
import { revalidatePath } from "next/cache";

export const resyncAction = async () => {
    // Clear database
    await clearDatabase();
    revalidatePath("/", "layout");
}

export const syncEvents = async (events: Event[]) => {
    try {
        // Insert events into database
        events.forEach((event) => {
            insertEvent(event);
        });
    } catch (error: any) {
        console.error(error.message);
    }
}
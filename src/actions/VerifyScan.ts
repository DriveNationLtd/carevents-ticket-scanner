"use server"

import { auth } from "@/auth";
import { EventTicketProgressResponse, EventsResponse, SingleEventResponse, TicketRedeemResponse, TicketScanResponse } from "@/types/event";

// process.env.HEADLESS_CMS_API_URL ?? 
const API_URL = "https://www.carevents.com";
const getSessionUser = async () => {
    const session = await auth();

    if (!session) {
        throw new Error("No session found");
    }

    return session.user;
}

export const getEvents = async (): Promise<EventsResponse> => {
    let url = `https://www.carevents.com/wp-json/ticket_scanner/v1/get_user_events`;

    try {
        const user = await getSessionUser();
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // @ts-ignore
                user_id: user?.id,
            }),
        });

        const data = JSON.parse(await response.json());
        return data;
    } catch (error: any) {
        return {
            success: false,
            error: error.message ?? "Internal Server Error",
        }
    }
}

export const getEventById = async (id: string): Promise<SingleEventResponse> => {
    let url = `https://www.carevents.com/wp-json/ticket_scanner/v1/get_user_event`;

    try {
        const user = await getSessionUser();
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user?.id,
                event_id: id,
            }),
        });

        const data = JSON.parse(await response.json());
        return data;
    } catch (error: any) {
        return {
            success: false,
            error: error.message ?? "Internal Server Error",
        }
    }
}

export const getEventScanProgress = async (event_id: string): Promise<EventTicketProgressResponse> => {
    let url = `https://www.carevents.com/wp-json/ticket_scanner/v1/get_event_scan_progress`;

    try {
        const user = await getSessionUser();
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user?.id,
                event_id: event_id,
            }),
        });

        const data = JSON.parse(await response.json());
        return data;
    } catch (error: any) {
        return {
            success: false,
            error: error.message ?? "Internal Server Error",
        }
    }
}


export const verifyScan = async (scannedData: string | null): Promise<TicketScanResponse> => {
    let url = `https://www.carevents.com/wp-json/ticket_scanner/v1/verify_scanned_ticket`;

    try {
        const user = await getSessionUser();

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // @ts-ignore
                user_id: user?.id,
                scanned_data: scannedData,
            }),
        });

        const data = JSON.parse(await response.json());
        return data;
    } catch (error: any) {
        return {
            success: false,
            error: error.message ?? "Internal Server Error",
        }
    }
}

export const redeemTicket = async (ticket_id: string): Promise<TicketRedeemResponse> => {
    let url = `https://www.carevents.com/wp-json/ticket_scanner/v1/redeem_ticket`;


    try {
        const user = await getSessionUser();

        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                user_id: user?.id,
                order_item_id: ticket_id,
            }),
        });

        const data = JSON.parse(await response.json());
        return data;
    } catch (error: any) {
        return {
            success: false,
            error: error.message ?? "Internal Server Error",
        }
    }
}
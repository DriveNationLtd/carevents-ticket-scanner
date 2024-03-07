import { Session } from "next-auth";

const API_URL = process.env.HEADLESS_CMS_API_URL;

export const getEvents = async (session: Session) => {
    const { user } = session;
    let url = `${API_URL}/wp-json/ticket_scanner/v1/get_user_events`;

    try {
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
    } catch (error) {
        return { error: "Internal Server Error" };
    }
}


export const verifyScan = async (session: Session, scannedData: string | null) => {
    const { user } = session;
    let url = `${API_URL}/wp-json/ticket_scanner/v1/verify_scanned_ticket`;

    try {
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
    } catch (error) {
        return { error: "Internal Server Error" };
    }
}

export const redeemTicket = async (session: Session, ticket_id: string) => {
    const { user } = session;
    let url = `${API_URL}/wp-json/ticket_scanner/v1/redeem_ticket`;

    try {
        let response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                // @ts-ignore
                user_id: user?.id,
                order_item_id: ticket_id,
            }),
        });

        const data = JSON.parse(await response.json());
        console.log(data);

        return data;
    } catch (error) {
        return { error: "Internal Server Error" };
    }
}
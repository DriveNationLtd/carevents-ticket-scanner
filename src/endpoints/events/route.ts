import { Session } from "next-auth";

// make request to ts_get_user_events
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
        console.log(data);

        return data;
    } catch (error) {
        return { error: "Internal Server Error" };
    }
}

export default getEvents;
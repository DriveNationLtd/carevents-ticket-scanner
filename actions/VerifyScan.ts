'use server'

import { verifyScan } from "@/endpoints/events/route";
import { Session } from "next-auth";

export default async function verifyScanAction(session: Session, result: string | null) {
    if (session === null) return;

    const response = await verifyScan(session, result);
    console.log(response);
}
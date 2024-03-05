import QRScanner from "@/components/scanner/Scanner";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { EventsList } from "@/components/EventsList";
import getEvents from "@/endpoints/events/route";


export default async function Home() {
  let session = await getServerSession(options);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/");
  }

  const events = await getEvents(session);

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <QRScanner />
      <EventsList error={events.error} events={events.events} />
    </main>
  );
}

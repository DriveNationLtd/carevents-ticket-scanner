import QRScanner from "@/components/scanner/Scanner";
import { getServerSession } from "next-auth";
import { options } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import { EventsList } from "@/components/EventsList";
import { Suspense } from "react";
import { redeemTicket, verifyScan } from "@/endpoints/events/route";


export default async function Home() {
  let session = await getServerSession(options);

  if (!session) {
    return redirect("/api/auth/signin?callbackUrl=/");
  }

  const handleOnScan = async (result: string | null) => {
    if (session === null) return;

    const response = await verifyScan(session, result);
    console.log(response);
  }

  // handleOnScan('NVpnTUhSNmpKcDVLZTFYazIxSEgwdz09');
  redeemTicket(session, 'NVpnTUhSNmpKcDVLZTFYazIxSEgwdz09');

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <QRScanner session={session} />

      <h1 className='text-3xl font-semibold mb-4'>Your Events</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EventsList />
      </Suspense>
    </main>
  );
}

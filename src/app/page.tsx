import QRScanner from "@/components/scanner/Scanner";
import { EventsList } from "@/components/EventsList";
import { Suspense } from "react";


export default async function Home() {
  // handleOnScan('NVpnTUhSNmpKcDVLZTFYazIxSEgwdz09');
  // redeemTicket('NVpnTUhSNmpKcDVLZTFYazIxSEgwdz09');

  return (
    <main className="flex h-full flex-col items-center justify-center">
      <QRScanner />

      <h1 className='text-3xl font-semibold mb-4'>Your Events</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <EventsList />
      </Suspense>
    </main>
  );
}

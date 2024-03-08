import QRScanner from "@/components/scanner/Scanner";
import { EventsList } from "@/components/EventsList";
import { Suspense } from "react";


export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <QRScanner />

      <div className="my-4 flex flex-col items-center">
        <h1 className='text-3xl font-semibold'>Your Events</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <EventsList />
        </Suspense>
      </div>
    </main>
  );
}

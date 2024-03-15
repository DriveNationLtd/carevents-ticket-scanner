import { EventsList } from "@/components/events/EventsList";

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center">
      <EventsList />
    </main>
  );
}

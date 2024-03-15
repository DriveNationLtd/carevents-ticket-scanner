import { EventsList } from "@/components/events/EventsList";
import ProtectedLayout from "./(protected)/layout";

export default async function Home() {
  return (
    <ProtectedLayout>
      <main className="flex h-full flex-col items-center justify-center">
        <EventsList />
      </main>
    </ProtectedLayout>
  );
}

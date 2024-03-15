import { getEvents } from "@/actions/VerifyScan";
import { Event } from "@/types/event";
import { EventTile, NoEventsPlaceholder } from "./EventTile";
import { Suspense } from "react";
import Loader from "@/shared/Loader";

interface EventsListProps {

}

export const EventsAysnc: React.FC = async () => {
    const data = await getEvents();

    return (
        <>
            {data.error && <p className='text-red-500'>{data.error}</p>}
            {(data.events && !data.error && data.events.length > 0) ? (
                <div className='flex flex-col w-full'>
                    {data.events.map((event: Event, idx: number) => {
                        return <EventTile key={idx} event={event} />;
                    })}
                </div>
            ) : (
                <NoEventsPlaceholder />
            )}
        </>
    );
};

export const EventsList: React.FC<EventsListProps> = () => {
    return (
        <div className='container mx-auto px-4 w-full my-4'>
            <div className="my-4 flex flex-col w-full">
                <h1 className="text-3xl font-semibold mb-4 text-center">
                    Your Events
                </h1>
                <Suspense fallback={<Loader />}>
                    <EventsAysnc />
                </Suspense>
            </div>
        </div >
    );
};

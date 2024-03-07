import { options } from '@/app/api/auth/[...nextauth]/options';
import { getEvents } from '@/endpoints/events/route';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

interface EventsListProps {
    // events: [] | null;
    // error: string | null;
}

export const EventsList: React.FC<EventsListProps> = async () => {
    let session = await getServerSession(options);

    if (!session) {
        return redirect('/api/auth/signin?callbackUrl=/');
    }

    const data = await getEvents(session);

    return (
        <div className='container mx-auto px-4'>
            {data.error && <p className='text-red-500'>{data.error}</p>}
            {(data.events && !data.error && data.events.length > 0) ? (
                <ul className='divide-y divide-gray-200'>
                    {data.events.map((event: any) => (
                        <li key={event.id} className='py-4'>
                            <h2 className='text-lg font-semibold'>{event.title} <span className='text-gray-500 capitalize text-xs'>({event.status})</span></h2>
                            <p className='text-gray-500 text-xs'>Ends on {event.dates}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-gray-500'>No events found</p>
            )}
        </div>
    );
};

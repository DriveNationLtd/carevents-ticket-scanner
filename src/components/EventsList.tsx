import React from 'react'

interface EventsListProps {
    events: [] | null;
    error: string | null;
}

export const EventsList: React.FC<EventsListProps> = ({ error, events }) => {
    return (
        <div className='container mx-auto px-4 py-8'>
            <h1 className='text-3xl font-semibold mb-4'>Events List</h1>
            {error && <p className='text-red-500'>{error}</p>}

            {(events && !error && events.length > 0) ? (
                <ul className='divide-y divide-gray-200'>
                    {events.map((event: any) => (
                        <li key={event.id} className='py-4'>
                            <h2 className='text-lg font-semibold'>{event.title}</h2>
                            <p className='text-gray-500 capitalize'>{event.status}</p>
                            <p className='text-gray-500'>{event.dates}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className='text-gray-500'>No events found</p>
            )}
        </div>
    );
};

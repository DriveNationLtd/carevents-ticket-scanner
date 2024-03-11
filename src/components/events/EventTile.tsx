import { Event } from '@/types/event';
import { formatDate } from '@/utils/date';
import Image from 'next/image';

interface EventTileProps {
    event: Event;
}

export const EventTile: React.FC<EventTileProps> = ({ event }) => {
    const { title, start_date, image } = event;
    const formattedDate = formatDate(start_date);

    return (
        <div className="relative flex gap-3 p-4 w-full rounded-md mb-2 bg-theme-dark border-none bg-opacity-90 overflow-hidden cursor-pointer">
            <div className="w-1/4 mr-4">
                <div className="relative w-full h-0 min-w-[100px] max-w-[100px] lg:max-w-none" style={{ paddingBottom: '100%' }}>
                    <Image src={image} alt={title} layout="fill" objectFit="cover" className="" />
                </div>
            </div>
            <div className="flex flex-col justify-between flex-grow mt-2">
                <div>
                    <p className="text-gray-300 text-xs">{formattedDate}</p>
                    <h2 className="font-bold mb-2 text-lg">{title}</h2>
                </div>
                <div className="absolute inset-0 -z-10 bg-black opacity-60"></div>
                <Image src={image} alt={title} layout="fill" objectFit="cover" className="absolute inset-0 -z-10" />
            </div>
        </div>
    );
}

export const NoEventsPlaceholder: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full mt-10">
            <h1 className="text-2xl font-semibold mb-2">No Events</h1>
            <p className="text-gray-300">You have no events to display</p>
        </div>
    );
}
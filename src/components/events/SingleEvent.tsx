import { getEventById } from "@/actions/VerifyScan";
import Loader from "@/shared/Loader";
import { formatDate } from "@/utils/date";
import Image from "next/image";
import { Suspense } from "react";
import { EventScanProgress, EventScanProgressSkeleton } from "./EventScanProgress";

interface SingleEventProps {
    event_id: string;
}

export const SingleEvent: React.FC<SingleEventProps> = async ({ event_id }) => {
    const data = await getEventById(event_id);

    if (data.error || !data.success) {
        return (
            <div className="text-center text-red-500">
                {data.error ?? "Internal Server Error"}
            </div>
        );
    }

    if (!data.event) {
        return (
            <div className="text-center text-red-500">
                No event found
            </div>
        );
    }

    const event = data.event;

    const { title, start_date, image, orders } = event;
    const formattedDate = formatDate(start_date);

    return (
        <div className="flex flex-col h-full">
            <div className="relative flex flex-col items-center gap-3 w-full min-h-52 justify-center mb-2 bg-theme-dark border-none bg-opacity-90 overflow-hidden cursor-pointer">
                <div className="flex flex-col justify-center flex-grow p-4 w-full">
                    <div className='flex items-center justify-center flex-col'>
                        <h2 className="font-bold mb-2 text-md">{title}</h2>
                        <p className="text-gray-300 text-xs">
                            <i className="fas fa-calendar-alt mr-2"></i>
                            {formattedDate}
                        </p>
                        {(orders && !orders.error) && (
                            <div className="flex flex-col items-center text-xs mt-5 mb-2 w-full">
                                <span className="text-white/90 uppercase">
                                    Total scanned
                                </span>
                                <div className="text-white text-xl mt-2">
                                    <span className="text-green-500">{orders.scanned}</span> / <span className="">{orders.total}</span>
                                </div>

                                {/* progress meter */}
                                <div className="w-full h-4 mt-4 bg-gray-200/40 rounded-full overflow-hidden">
                                    <div className="h-full bg-green-500 rounded-l-full" style={{ width: `${(orders.scanned / orders.total) * 100}%` }}></div>
                                </div>
                            </div>
                        )}

                        {(orders && orders.error) && (
                            <p className="text-red-500 text-xs mt-2">{orders.error}</p>
                        )}
                    </div>
                    <div className="absolute inset-0 -z-10 bg-black opacity-60"></div>
                    <Image src={image} alt={title} layout="fill" objectFit="cover" className="absolute inset-0 -z-10" />
                </div>
            </div>
            <span className="my-4 text-white/70 text-xs px-4">Scans by ticket type</span>
            <Suspense fallback={<EventScanProgressSkeleton />}>
                <EventScanProgress event_id={event_id} />
            </Suspense>
        </div>
    );
}
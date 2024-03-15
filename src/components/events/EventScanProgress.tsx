import { getEventScanProgress } from "@/actions/VerifyScan";
import { clsx } from "clsx";

interface EventScanProgressProps {
    event_id: string;
}

export const EventScanProgressSkeleton: React.FC = () => {
    return (
        <div className="flex flex-col bg-theme-dark">
            {[1, 2, 3].map((index) => (
                <div key={index} className="flex justify-between border-t p-5 shadow animate-pulse">
                    <span className="bg-white/70 h-2 rounded w-36"></span>
                    <span className="bg-white/70 h-2 rounded w-12"></span>
                </div>
            ))}
        </div>
    );
}

export const EventScanProgress: React.FC<EventScanProgressProps> = async ({ event_id }) => {
    const data = await getEventScanProgress(event_id);
    const { progress, error, success } = data;


    if (error || !success) {
        return (
            <div className="text-center text-red-500">
                {error ?? "Internal Server Error"}
            </div>
        );
    }

    if (!progress) {
        return (
            <div className="text-center text-red-500">
                No tickets found
            </div>
        );
    }


    return (
        <div className="flex flex-col bg-theme-dark">
            {Object.entries(progress).map(([ticketId, ticketInfo]) => (
                <div key={ticketId} className="flex justify-between border-t p-5">
                    <span className="text-white/70 text-sm font-medium">{ticketInfo.name}</span>
                    <span className="text-white/70 text-sm">
                        <span className={clsx(
                            ticketInfo.scanned === ticketInfo.sold ? "text-green-500" : ""
                        )}>
                            {ticketInfo.scanned}
                        </span>
                        /{ticketInfo.sold}</span>
                </div>
            ))}
        </div>
    );
}
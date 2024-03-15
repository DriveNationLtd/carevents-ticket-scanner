import { getBrowserConnectivityStatus } from "@/utils/connection";
import { clsx } from "clsx";

export const ConnectivityStatus: React.FC = () => {
    // return an icon based on the connectivity status
    // if online, return a green icon
    // if offline, return a red icon
    const isOnline = getBrowserConnectivityStatus();

    return (
        <div className="min-w-[35px] flex flex-col items-center gap-2">
            <i className={isOnline ? "fas fa-wifi text-green-500" : "fas fa-wifi text-red-500"}></i>
            <p className={clsx(
                "text-xs",
                isOnline ? "text-green-500" : "text-red-500"
            )}>
                {isOnline ? "Online" : "Offline"}
            </p>
        </div>
    )
}
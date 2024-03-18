'use client'
import { Button } from "./Button";
import { resyncAction } from "@/actions/syncAction";
interface ReSyncProps {
    callback?: () => void;
}

export const ReSync: React.FC<ReSyncProps> = ({
    callback
}) => {
    const handleReSync = async () => {
        await resyncAction()
        callback?.();
    }

    return (
        <form className='flex flex-col items-center justify-center w-full h-full my-3' action={handleReSync}>
            <Button fullPageLoading>
                Re-Sync
            </Button>
            <p className="text-gray-300 text-xs mt-2">Clear cached data and load new data</p>
        </form>
    );
}
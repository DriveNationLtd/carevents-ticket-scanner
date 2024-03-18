'use client'
import { Button } from "./Button";
import { resyncAction } from "@/actions/syncAction";

export const ReSync: React.FC = () => {
    const handleReSync = async () => {
        await resyncAction()
        // revalidate 
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
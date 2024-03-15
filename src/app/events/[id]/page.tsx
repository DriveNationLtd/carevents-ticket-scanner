import { SingleEvent } from "@/components/events/SingleEvent";
import Loader from "@/shared/Loader";
import { Suspense } from "react";

export default function Page({ params }: { params: { id: string } }) {
    return (
        <Suspense fallback={<Loader />}>
            <SingleEvent event_id={params.id} />
        </Suspense>
    )
}
import { redeemTicket } from '@/actions/VerifyScan';
import { ErrorMessage } from '@/shared/ErrorMessage';
import { SuccessMessage } from '@/shared/SuccessMessage';
import { ThemeBtn } from '@/shared/ThemeBtn';
import { TicketScanResponse } from '@/types/event';
import { formatDate } from '@/utils/date';
import { capitalize, formatCarDetails } from '@/utils/string';
import clsx from 'clsx';
import React, { useState } from 'react'

interface ScanResultProps {
    result: TicketScanResponse | null;
    callback: (result: null) => void;
}

export const ScanResult: React.FC<ScanResultProps> = ({
    result,
    callback
}) => {
    const [redeeming, setRedeeming] = useState<{
        loading: boolean;
        success: boolean;
        message: string;
    }>({
        loading: false,
        success: false,
        message: "",
    });

    if (result === null) {
        return null
    }

    const handleRedeem = async (ticket_id: string) => {
        setRedeeming({
            loading: true,
            success: false,
            message: "",
        });

        // Redeem ticket
        const data = await redeemTicket(ticket_id);

        if (data && data.success) {
            setRedeeming({
                loading: false,
                success: true,
                message: `Ticket redeemed successfully`,
            });
            return;
        } else {
            setRedeeming({
                loading: false,
                success: false,
                message: data.error ?? "Failed to redeem ticket",
            });
        }
    }

    const renderTicketCard = (ticket: TicketScanResponse) => {
        const { data, ticket_scanned_at, error, success } = ticket;

        if (ticket.error && !success) {
            return (
                <ErrorMessage message={ticket.error} />
            );
        }

        if (!data || !data.ticket) {
            return (
                <div className="flex flex-col h-full items-center justify-center">
                    <ErrorMessage message={"Oops! No ticket data found"} />
                    <ThemeBtn
                        className="bg-white border border-theme-primary hover:bg-theme-primary hover:text-white w-full text-center text-theme-primary text-lg font-medium"
                        onClick={() => callback(null)}
                    >
                        Try Again
                    </ThemeBtn>
                </div>
            )
        }
        const { event_name, event_venue, event_date } = data.event;
        const { meta, name, price } = data?.ticket;
        const { ticket_date_start, ticket_date_end } = meta;
        const {
            billing_email, billing_first_name, billing_last_name, date_created_gmt,
            order_id, order_item_id, status, payment_method_title,
        } = data.ticket_data;

        // specific to car event
        const { car_make, car_model, car_reg, concours } = data.ticket_data

        return (
            <div className="flex flex-col bg-white px-4 rounded-lg w-full">
                {redeeming.success && <SuccessMessage message={redeeming.message} />}
                {(!redeeming.success && redeeming.message) && <ErrorMessage message={redeeming.message} />}

                {error ? (
                    <div className="flex w-full flex-col mb-6 items-center justify-center">
                        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="red" stroke-width="2" />
                            <line x1="30" y1="30" x2="70" y2="70" stroke="red" stroke-width="2" />
                            <line x1="30" y1="70" x2="70" y2="30" stroke="red" stroke-width="2" />
                        </svg>
                        <h2 className="text-red-600 text-xl font-bold mt-1 uppercase">Already Used</h2>
                        <p className="text-red-600 text-sm font-bold">{error}</p>
                    </div>
                ) : (
                    <div className="flex w-full flex-col mb-10 items-center justify-center">
                        <svg width="100" height="100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="40" fill="none" stroke="green" stroke-width="2" />
                            <line x1="30" y1="50" x2="45" y2="65" stroke="green" stroke-width="2" />
                            <line x1="45" y1="65" x2="70" y2="40" stroke="green" stroke-width="2" />
                        </svg>
                        <h2 className="text-green-600 text-xl font-bold mt-1 uppercase">Valid</h2>
                    </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center col-span-2">
                        <span className='text-slate-400 text-xs'>Event</span>
                        <h2 className="text-black text-md font-bold text-center max-w-xs">{event_name} at {event_venue}<br />{event_date}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Ticket Name</span>
                        <h2 className="text-black text-md font-bold text-center">{name}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Ticket Price</span>
                        <h2 className="text-black text-md font-bold text-center">£{price}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Customer</span>
                        <h2 className="text-black text-md font-bold text-center">{billing_first_name} {billing_last_name}</h2>
                    </div>
                    {/* 
                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Email</span>
                        <h2 className="text-black text-md font-bold text-center">{billing_email}</h2>
                    </div> */}

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Status</span>
                        <h2 className={clsx(
                            "text-md font-bold text-center",
                            status === "completed" ? "text-green-500" : "text-red-500"
                        )}>{capitalize(status)}</h2>
                    </div>

                </div>

                <hr className="my-6 opacity-55" />

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Order</span>
                        <h2 className="text-black text-md font-bold text-center">#{order_id}-{order_item_id}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Order Date</span>
                        <h2 className="text-black text-md font-bold text-center">{formatDate(date_created_gmt)}</h2>
                    </div>

                    {/* 
                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Ticket Start</span>
                        <h2 className="text-black text-md font-bold text-center">{formatDate(ticket_date_start)}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Ticket End</span>
                        <h2 className="text-black text-md font-bold text-center">{formatDate(ticket_date_end)}</h2>
                    </div> */}

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Special Display?</span>
                        <h2 className="text-black text-md font-bold text-center">{concours ? capitalize(concours) : 'No'}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Car Details</span>
                        <h2 className="text-black text-md font-bold text-center">
                            {formatCarDetails(car_make, car_model, car_reg)}
                        </h2>
                    </div>
                </div>

                {/* Action buttons */}
                <div className="controls flex flex-col gap-3 items-center mt-7 w-full">
                    {ticket_scanned_at ? (
                        <ThemeBtn
                            className="bg-white border border-red-600 hover:bg-red-600 hover:text-white w-full text-center text-red-600 uppercase text-lg font-medium"
                            onClick={() => callback(null)}
                        >
                            Continue
                        </ThemeBtn>
                    ) :
                        (
                            <ThemeBtn
                                className='bg-white border border-green-600 hover:bg-green-600 hover:text-white w-full text-center text-green-600 uppercase text-lg font-medium'
                                onClick={() => handleRedeem(order_item_id)}
                                disabled={redeeming.loading}
                                loading={redeeming.loading}
                            >
                                {redeeming.success ? "Redeemed" : "Redeem"}
                            </ThemeBtn>
                        )
                    }
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col w-full mx-auto">
            {renderTicketCard(result)}
        </div>
    );
}
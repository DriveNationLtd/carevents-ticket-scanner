import { redeemTicket } from '@/actions/VerifyScan';
import { ErrorMessage } from '@/shared/ErrorMessage';
import { SuccessMessage } from '@/shared/SuccessMessage';
import { ThemeBtn } from '@/shared/ThemeBtn';
import { TicketScanResponse } from '@/types/event';
import { formatDate } from '@/utils/date';
import { capitalize } from '@/utils/string';
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
        return <div>No results</div>;
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

    const formatCarDetails = (car_make: string | null, car_model: string | null, car_reg: string | null) => {
        if (!car_make || !car_model || !car_reg) {
            return "-";
        }

        let str;

        if (car_make) {
            str = car_make;
        }

        if (car_model) {
            str += ` ${car_model}`;
        }

        if (car_reg) {
            str += ` (${car_reg})`;
        }

        return str;
    }

    const renderTicketCard = (ticket: TicketScanResponse) => {
        const { data, ticket_scanned_at, error, success } = ticket;

        if (ticket.error) {
            return (
                <ErrorMessage message={ticket.error} />
            );
        }

        if (!data || !data.ticket) {
            return null;
        }

        const { meta, name } = data?.ticket;
        const { ticket_date_start, ticket_date_end } = meta;
        const {
            billing_email, billing_first_name, billing_last_name, billing_phone,
            date_created_gmt, line_total, order_id, order_item_id, status,
            payment_method_title
        } = data.ticket_data;

        // specific to car event
        const { car_make, car_model, car_reg, concours } = data.ticket_data

        return (
            <div className="flex flex-col bg-theme-dark p-4 rounded-lg">
                {redeeming.success && <SuccessMessage message={redeeming.message} />}
                {(!redeeming.success && redeeming.message) && <ErrorMessage message={redeeming.message} />}

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Ticket Name</span>
                        <h2 className="text-white text-md font-bold text-center">{name}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Customer</span>
                        <h2 className="text-white text-md font-bold text-center">{billing_first_name} {billing_last_name}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Email</span>
                        <h2 className="text-white text-md font-bold text-center">{billing_email}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Status</span>
                        <h2 className={clsx(
                            "text-md font-bold text-center",
                            status === "completed" ? "text-green-500" : "text-red-500"
                        )}>{capitalize(status)}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Order</span>
                        <h2 className="text-white text-md font-bold text-center">#{order_id}-{order_item_id}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Paid</span>
                        <h2 className="text-white text-md font-bold text-center">£{line_total}</h2>
                    </div>
                </div>

                <hr className="my-6 opacity-55" />

                <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Ticket Start</span>
                        <h2 className="text-white text-md font-bold text-center">{formatDate(ticket_date_start)}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Ticket End</span>
                        <h2 className="text-white text-md font-bold text-center">{formatDate(ticket_date_end)}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Order Date</span>
                        <h2 className="text-white text-md font-bold text-center">{formatDate(date_created_gmt)}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Payment Method</span>
                        <h2 className="text-white text-md font-bold text-center">{payment_method_title}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Special Display?</span>
                        <h2 className="text-white text-md font-bold text-center">{concours ? capitalize(concours) : 'No'}</h2>
                    </div>

                    <div className="flex flex-col items-center justify-center">
                        <span className='text-slate-400 text-xs'>Car Details</span>
                        <h2 className="text-white text-md font-bold text-center">
                            {formatCarDetails(car_make, car_model, car_reg)}
                        </h2>
                    </div>
                </div>


                <div className="controls flex flex-col gap-3 items-center mt-7 w-full">
                    <ThemeBtn className='bg-theme-primary hover:bg-theme-primary/80 text-sm w-full text-center' onClick={() => handleRedeem(order_item_id)} disabled={redeeming.loading} loading={redeeming.loading}>
                        {redeeming.success ? "Redeemed" : "Redeem"}
                    </ThemeBtn>

                    <ThemeBtn className="border border-theme-primary text-sm w-full text-center" onClick={() => callback(null)}>
                        Scan Again
                    </ThemeBtn>
                </div>
            </div>
        );
    };

    return (
        <div className="flex flex-col max-w-lg mx-auto">
            {renderTicketCard(result)}
        </div>
    );
}
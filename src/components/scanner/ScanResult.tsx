import { redeemTicket } from '@/actions/VerifyScan';
import { ThemeBtn } from '@/shared/ThemeBtn';
import { TicketScanResponse } from '@/types/event';
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

    const renderTicketCard = (ticket: TicketScanResponse) => {
        const { data, ticket_scanned_at, error, success } = ticket;

        if (ticket.error) {
            return (<div className="flex flex-col bg-theme-dark p-4 rounded-lg">
                <p className="text-red-500 text-center">
                    {ticket.error}
                </p>
            </div>);
        }

        if (!data || !data.ticket) {
            return null;
        }

        const { meta, name, price, ID } = data?.ticket;
        const { ticket_date_start, ticket_date_end } = meta;
        const { billing_email, billing_first_name, billing_last_name, billing_phone, date_created_gmt, line_total, order_id, order_item_id, status } = data.ticket_data;

        return (
            <div className="flex flex-col bg-theme-dark p-4 rounded-lg">
                {/* message */}
                {error && <p className="text-red-500 text-center">{error}</p>}
                {success && <p className="text-green-500 text-center">{success}</p>}
                {/* message */}
                {redeeming.message && <p className="text-center text-white">{redeeming.message}</p>}

                <h2 className="text-white text-lg font-bold">{name}</h2>
                <p className="text-gray-400">{`Price: ${price}`}</p>
                <p className="text-gray-400">{`Start Date: ${ticket_date_start}`}</p>
                <p className="text-gray-400">{`End Date: ${ticket_date_end}`}</p>
                {/* Include other data as needed */}
                <p className="text-gray-400">{`Billing Email: ${billing_email}`}</p>
                <p className="text-gray-400">{`Billing Name: ${billing_first_name} ${billing_last_name}`}</p>
                <p className="text-gray-400">{`Billing Phone: ${billing_phone}`}</p>
                {/* Include other data as needed */}
                <div className="controls flex justify-between items-center mt-7">
                    <ThemeBtn onClick={() => callback(null)}>
                        Clear
                    </ThemeBtn>
                    <ThemeBtn className='bg-gold' onClick={() => handleRedeem(order_item_id)} disabled={redeeming.loading}>
                        {ticket_scanned_at ? "Redeemed" : "Redeem"}
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
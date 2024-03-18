export interface TicketScanResponse {
    success: boolean;
    error: string;
    data?: TicketScanData;
    order_item_id?: string;
    ticket_scanned_at?: string;
}

export interface TicketScanData {
    event_id: string;
    event: {
        event_name: string;
        event_venue: string;
        event_date: string;
    };
    ticket_id: string;
    order_item_id: string;
    ticket: Ticket;
    ticket_data: Order;
}

interface Ticket {
    ID: string;
    name: string;
    price: string;
    stock: string;
    stock_sold: string;
    stock_status: string;
    product_image: string;
    product_image_thumbnail: string;
    product_status: string;
    visibility: string;
    category_id: string | null;
    meta: {
        ID: string;
        ticket_id: string;
        secondary_email: string;
        upsell_item: string | null;
        upsell_image: string;
        description: string;
        ticket_section: string;
        contact_details_required: string | null;
        car_details_required: string | null;
        concours: string;
        ticket_date_start: string;
        ticket_date_end: string;
        hidden_ticket: string | null;
        secret_code_ticket: string | null;
        secret_code: string;
        display_order: string;
        max_tickets: string;
        limit_per_order: string;
        collection_delivery: string | null;
        collection_information: string | null;
        required_tickets: string | null;
        discount_code: string | null;
    }
}

interface Order {
    ID: string;
    order_id: string;
    ticket_id: string;
    order_item_id: string;
    subtotal: string;
    line_total: string;
    status: string;
    currency: string;
    total_amount: string;
    customer_id: string;
    billing_email: string;
    billing_first_name: string;
    billing_last_name: string;
    billing_phone: string;
    date_created_gmt: string;
    payment_method: string;
    payment_method_title: string;
    order_note: string;
    car_make: string | null;
    car_model: string | null;
    car_reg: string | null;
    concours: string | null;
}

export interface Event {
    id: string;
    ticket_type: string;
    title: string;
    start_date: string;
    end_date: string;
    status: string;
    image: string;
    orders?: {
        total: number;
        scanned: number;
        error?: string;
    }
}

export interface EventsResponse {
    success: boolean;
    isLocal?: boolean;
    error?: string;
    events?: Event[];
    user_id?: string;
    count?: number;
}

export interface SingleEventResponse {
    success: boolean;
    error?: string;
    event?: Event;
}

interface TicketInfo {
    sold: number;
    scanned: number;
    name?: string; // Assuming the "name" property is optional
}

interface TicketData {
    [ticketId: string]: TicketInfo;
}

export interface EventTicketProgressResponse {
    error?: string;
    success?: boolean;
    progress?: TicketData;
}

export interface TicketRedeemResponse {
    success: boolean;
    error?: string;
    ticket_scanned_at?: string;
    order_item_id?: string;
}
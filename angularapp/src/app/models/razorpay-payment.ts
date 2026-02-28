import { Appointment } from "./appointment.model";

export interface RazorpayPayment {
    id?: number;
    paymentId?: string;
    orderId?: string;
    signature?: string;
    currency: string;
    status?: string;
    amount: number;
    createdAt?: string;
    updatedAt?: string;
    appointment: Appointment;
  }
  

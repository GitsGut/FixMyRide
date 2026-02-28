import { Address } from "./address.model";
import { User } from "./user.model";
import { VehicleMaintenance } from "./vehicle-maintenance.model";
import { Vehicle } from "./vehicle.model";

export interface Appointment {
    appointmentId ?: number;
    service : VehicleMaintenance;
    appointmentDate : string;
    status ?: string;
    user: User ;
    slot : string;
    vehicle : Vehicle;
    address : Address;
    paymentType:string;
    paymentStatus?:string ;
} 
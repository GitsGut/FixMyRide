import { User } from "./user.model"
import { VehicleMaintenance } from "./vehicle-maintenance.model"

export interface Feedback {
    feedbackId?:number
    user:User
    service:VehicleMaintenance
    message:string
    rating:number
}

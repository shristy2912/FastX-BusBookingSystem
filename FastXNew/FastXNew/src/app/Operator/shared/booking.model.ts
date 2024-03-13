// export class Booking {
//     BookingId: number;
//     busId: number;
//     scheduleId: number;
//     userId: number;
//     totalSeats: number;
//     seatNumbers: string;
//     totalCost: number;
//     bookingDate: Date;

import { Bus } from "../../User/bus.model";
import { Payment } from "../../User/payment.model";
import { User } from "../../module/admin/services/user.model";
import { Schedule } from "./schedule.model";

  
//   }


export interface Booking {
  bookingId: number;
  busId?: number;
  scheduleId?: number;
  userId?: number;
  totalSeats: number;
  seatNumbers: string;
  totalCost: number;
  bookingDate: Date;

  bus?: Bus; 
  schedule?: Schedule; 
  user?: User; 
  payments?: Payment[];
}
  
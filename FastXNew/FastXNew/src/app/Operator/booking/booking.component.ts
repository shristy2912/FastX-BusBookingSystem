import { Component, OnInit } from '@angular/core';
import { OpServiceService } from '../shared/op-servie.service';


@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrl: './booking.component.css'
})
export class BookingComponent implements OnInit {
  bookingWithBusDetails: any[];

  constructor(private opService: OpServiceService) {}

  ngOnInit(): void {
    
    this.loadBookingWithBusDetails();
  }

  loadBookingWithBusDetails() {
    console.log('Loading booking data...');
    this.opService.getBookingwithBusDetails().subscribe(
      (data: any) => {
        console.log('Received data:', data);
        if (typeof data === 'object' && Array.isArray(data.$values)) {
          this.bookingWithBusDetails = data.$values.map(booking => {
            const processedBooking: any = {
              TotalSeats: booking.TotalSeats || 0,
              TotalCost: booking.TotalCost || 0,
              SeatNumber: booking.SeatNumbers || '',
              BookingDate: booking.BookingDate || new Date(),
              Bus: booking.Bus || {} ,
              User:booking.User||{} 
            };
  
         
            if ('BookingId' in booking) {
              processedBooking.BookingId = booking.BookingId;
            } else {
              processedBooking.BookingId = undefined;
            }
  
            return processedBooking;
          });
          console.log('Processed data:', this.bookingWithBusDetails);
        } else {
          console.error('Invalid data format. Expected an object with $values property as an array.');
        }
      },
      (error) => {
        console.error('Error fetching data:', error);
      }
    );
  }
  
  

  // Delete a seat record.
  // delRecord(BookingId) {
  //   if (confirm("Are you sure?")) {
  //     this.opService.delBooking(BookingId).subscribe(
  //       res => {
  //         alert("This booking is deleted");
  //         this.loadBookingWithBusDetails(); // Reload the data after deletion
  //       },
  //       err => {
  //         alert("Error: " + err);
  //       }
  //     );
  //   }
  // } 
  delRecord(pid){
    if(confirm("Are you sure?")){
      this.opService.delBooking(pid).subscribe(res=>{
        alert("Booking is deleted");
        this.opService.bookingList();
      },
      err=>{alert("error"+err);});
    }
  }
}  
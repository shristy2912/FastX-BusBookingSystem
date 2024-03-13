

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserServicesService } from '../user-services.service';

@Component({
  selector: 'app-final-booking',
  templateUrl: './final-booking.component.html',
  styleUrls: ['./final-booking.component.css'],
})
export class FinalBookingComponent implements OnInit {
  busDetails: any;
  selectedSeat: number;
  ticketPrice: number;
  scheduleDetails: any;

  constructor(private route: ActivatedRoute, private userService: UserServicesService) {}

  ngOnInit(): void {
   
    this.route.queryParams.subscribe((params) => {
      console.log('Received params:', params);
      this.busDetails = params['busDetails'];
      this.selectedSeat = params['selectedSeat'];
      this.ticketPrice = params['ticketPrice'];
     
      if (this.busDetails && this.busDetails.BusId) {
       
        this.userService.getBusAndScheduleDetails(this.busDetails.BusId).subscribe(
          (scheduleData: any) => {
            console.log('Fetched Schedule Details:', scheduleData);
         
            this.scheduleDetails = scheduleData.$values[0];
          },
          (error) => {
            console.error('Error fetching schedule details:', error);
          }
        );
      } else {
        console.error('Invalid busDetails:', this.busDetails);
      }
    });
  }
}

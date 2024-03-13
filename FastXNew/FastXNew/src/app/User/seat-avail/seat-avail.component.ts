// seat-avail.component.ts
import { Component, Input, OnChanges, SimpleChanges, OnInit } from '@angular/core';
import { UserServicesService } from '../user-services.service';

@Component({
  selector: 'app-seat-avail',
  templateUrl: './seat-avail.component.html',
  styleUrls: ['./seat-avail.component.css']
})
export class SeatAvailComponent implements OnChanges, OnInit {
  @Input() selectedSeat: number; // Update to selectedSeat
  @Input() busId: number;
  seatAvailability: any[] = []; // Remove @Input decorator

  constructor(private userService: UserServicesService) {}

  ngOnChanges(changes: SimpleChanges): void {
    console.log('Selected Seat Changes:', this.selectedSeat);

    // Ensure selectedSeat is a number before using it
    if (changes['selectedSeat'] && typeof this.selectedSeat !== 'number') {
      this.selectedSeat = null;
    }

    // Handle other changes as needed
  }

  ngOnInit(): void {
    // Fetch seat availability data when the component is initialized
    this.fetchSeatAvailability();
  }

  fetchSeatAvailability(): void {
    if (this.busId) {
      // Fetch seat availability data based on the provided busId
      this.userService.getSeatsByBusId(this.busId).subscribe(
        (data: any) => {
          console.log('Fetched Seat Availability Data:', data);
          this.seatAvailability = data;
        },
        (error) => {
          console.error('Error fetching seat availability:', error);
        }
      );
    }
  }
}

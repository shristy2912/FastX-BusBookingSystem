// buses-page.component.ts
import { Component, OnInit, ViewChild, ViewContainerRef, ComponentFactoryResolver } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { SeatAvailComponent } from '../seat-avail/seat-avail.component';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-buses-page',
  templateUrl: './buses-page.component.html',
  styleUrls: ['./buses-page.component.css']
})
// buses-page.component.ts

// ...
export class BusesPageComponent implements OnInit {
  routeId: number;
  availableBuses: any[] = [];
  selectedBusId: number;
  availableSeats: any[] = []; // Add this property
  selectedSeat: number; // Add this property

  @ViewChild('seatAvailabilityContainer', { read: ViewContainerRef }) seatAvailabilityContainer: ViewContainerRef;

  constructor(
    private route: ActivatedRoute,
    private userService: UserServicesService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.routeId = +params.get('id');
      this.fetchAvailableBuses();
    });
  }

  showSeatDropdown(bus: any): void {
    // Set showSeatDropdown flag to true for the selected bus
    bus.showSeatDropdown = true;

    // Fetch seat details for the selected bus using the common method
    this.userService.getSeatsByBusId(bus.BusId).subscribe(
      (data: any) => {
        console.log('Fetched Seat Details for Bus ID', bus.BusId, ':', data);
        bus.Seats = data; // Assuming the data structure is similar to what you've provided
      },
      (error) => {
        console.error('Error fetching seat details:', error);
      }
    );
  }

  fetchAvailableBuses(): void {
    this.userService.getBusListByRouteId(this.routeId).subscribe(
      (data: any) => {
        console.log('Received data:', data);
        if (data && data.buses && data.buses.$values) {
          this.availableBuses = data.buses.$values;
        } else {
          console.error('Invalid data structure:', data);
        }
      },
      (error) => {
        console.error('Error fetching available buses:', error);
      }
    );
  }

  checkSeatAvailability(busId: number): void {
    this.userService.getSeatsByBusId(busId).subscribe(
      (seats: any) => {
        console.log('Available seats for bus:', seats);
        // Use the received seat data as needed, for example, display it in the component
      },
      (error) => {
        console.error('Error fetching available seats for bus:', error);
      }
    );
  }

  bookTicket(bus: any, selectedSeat: number): void {
    
    const ticketPrice = 20; 


    const bookingData = {
      busDetails: bus,
      selectedSeat: selectedSeat,
      ticketPrice: ticketPrice,
      // Add other necessary details
    };

    
    this.router.navigate(['/final-booking', bookingData]);
  }
}

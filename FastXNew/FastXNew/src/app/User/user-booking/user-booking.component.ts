// user-booking.component.ts
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from '../user-services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-booking',
  templateUrl: './user-booking.component.html',
  styleUrls: ['./user-booking.component.css']
})

export class UserBookingComponent implements OnInit {
  bookingForm: FormGroup;
  busRoutes: any[] = [];
  selectedBusId: number | null = null; 

  constructor(
    private fb: FormBuilder,
    private busRouteService: UserServicesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadBusRoutes();
  }

  initForm(): void {
    this.bookingForm = this.fb.group({
      route: [null, Validators.required], // Add route control
      origin: ['', Validators.required],
      destination: ['', Validators.required],
      travelDate: ['', Validators.required],
    });
  }

  loadBusRoutes(): void {
    this.busRouteService.getBusRouteList().subscribe((data: any) => {
      this.busRoutes = data.$values;
    });
  }

  onSelectBus(busId: number): void {
  
    this.selectedBusId = busId;
  }

 // user-booking.component.ts

 onSubmit(): void {
  if (this.bookingForm.invalid) {
    return;
  }

  const formData = this.bookingForm.value;
  const selectedRoute = this.busRoutes.find(
    (route) => route.Origin === formData.origin && route.Destination === formData.destination
  );

  if (selectedRoute) {

    this.router.navigate([`/busespage/${selectedRoute.RouteId}`], {
      state: { route: selectedRoute, formData: formData }
    });
  } else {
    console.error('No matching route found for the selected origin and destination.');
  }
}
}
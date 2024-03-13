import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, tap, throwError } from 'rxjs';
import { Route } from '../module/admin/services/route.model';
import { Router } from '@angular/router';
import { Seat } from '../Operator/shared/seat.model';
import { Bus } from './bus.model';

@Injectable({
  providedIn: 'root'
})
export class UserServicesService {
  readonly BppApiUrl = "http://localhost:5030/api/busroutes"; 
  readonly SppApiUrl = "http://localhost:5030/api/seats";
  readonly UppApiUrl = "http://localhost:5030/api/buses";
  readonly ScheduleApiUrl = 'http://localhost:5030/api/schedules';
  public blist: Route[] = [];
  public seats: Seat[] = [];
  public buses: Bus[] = [];
  bppData: Route = new Route();

  constructor(private http: HttpClient, private router: Router) {}

  public getBusRouteList(): Observable<any> {
    return this.http.get<any>(this.BppApiUrl).pipe(
      tap((data) => console.log('Received data:', data)),
      catchError((error) => {
        console.error('Error fetching bus route list:', error);
        return throwError(error);
      })
    );
  }

  public getBusListByRouteId(routeId: number): Observable<any[]> {
    const url = `${this.BppApiUrl}/${routeId}`;  // Corrected the URL
    return this.http.get<any[]>(url);
  }
  
  public checkSeatAvailability(busId: number): void {
    const seatAvailabilityRoute = `/seat-availability/${busId}`;
    this.router.navigate([seatAvailabilityRoute]);
  }

  public getSeatList(): Observable<Seat[]> {
    return this.http.get<Seat[]>(this.SppApiUrl); // Corrected the URL
  }

  // public getSeatsByBusId(busId: number): Observable<Seat[]> {
  //   return this.http.get<Seat[]>(`${this.SppApiUrl}?busId=${busId}`);
  // }

  public getBuses(): Observable<Bus[]> {
    const url = `${this.UppApiUrl}`;
    return this.http.get<Bus[]>(url);
  }
  public getSeatsByBusId(busId: number): Observable<Seat[]> {
    const url = `${this.SppApiUrl}?busId=${busId}`;
    return this.http.get<Seat[]>(url).pipe(
      tap((data) => console.log('Fetched Seat Availability Data:', data)),
      catchError((error) => {
        console.error('Error fetching seat availability:', error);
        return throwError(error);
      })
    );
  }
  public getBusAndScheduleDetails(busId: number): Observable<any> {
    const url = `${this.UppApiUrl}/${busId}/details`; // Adjust the API endpoint based on your backend implementation

    return this.http.get<any>(url).pipe(
      catchError((error) => {
        console.error('Error fetching bus and schedule details:', error);
        return throwError(error);
      })
    );
  }


}

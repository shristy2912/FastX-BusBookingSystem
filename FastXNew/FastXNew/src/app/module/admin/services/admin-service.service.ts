import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map, tap, throwError } from 'rxjs';
import { Operator } from './operator.model';
import { User } from './user.model';
import { Route } from './route.model';
import { Buses } from './buses.model';

@Injectable({
  providedIn: 'root'
})
export class adminService {
  readonly ppApiUrl = "http://localhost:5030/api/busoperators";
  readonly UppApiUrl = "http://localhost:5030/api/users";
  readonly BppApiUrl = "http://localhost:5030/api/busroutes";
  readonly BusApiUrl="http://localhost:5030/api/buses";
  list: Operator[];
  ulist: User[];
  public blist: Route[] = [];
  ppData: Operator = new Operator();
  uppData: User = new User();
  bppData: Route = new Route();
 
  buslist:Buses[];
  bData:Buses=new Buses();
  constructor(private objHttp: HttpClient) {}

  public getOperatorList(): Observable<Operator[]> {
    return this.objHttp.get<any>(this.ppApiUrl).pipe(
      map((response: any) => {
        if (response.$values && Array.isArray(response.$values)) {
          return response.$values as Operator[];
        } else {        
          return response as Operator[];
        }
      })
    );
  }

  public delOperator(id: number): Observable<any> {
    return this.objHttp.delete(`${this.ppApiUrl}/${id}`);
  }

  public getUserList(): Observable<User[]> {
    return this.objHttp.get<User[]>(this.UppApiUrl);
  }

  public delUser(id: number): Observable<any> {
    return this.objHttp.delete(`${this.UppApiUrl}/${id}`);
  }

  public getBusRouteList(): Observable<Route[]> {
    return this.objHttp.get<Route[]>(this.BppApiUrl).pipe(
      tap((data: Route[]) => console.log('Received data:', data)),
      catchError((error) => {
        console.error('Error fetching bus route list:', error);
        return throwError(error);
      })
    );
  }
  public regRoute(): Observable<any> {
    console.log('Request Payload:', this.bppData);
    return this.objHttp.post(this.BppApiUrl, this.bppData);
  }
  

  public updateBusRoute(): Observable<Route> {
    return this.objHttp.put<Route>(`${this.BppApiUrl}/${this.bppData.RouteId}`, this.bppData);
  }

  public delRoute(id: number): Observable<any> {
    return this.objHttp.delete(`${this.BppApiUrl}/${id}`);
  }


  public BusList(){
    // this.objHttp.get(this.BusApiUrl).toPromise().then(res=>{this.buslist=res as Buses[];
    //   console.log("Bus List",this.buslist);},
    //   error => {
    //     console.error('Error fetching Bus list:', error);
    //   }
    //   );
    this.objHttp.get(this.BusApiUrl).toPromise().then(
      (res: any) => {
        // Check if the response data is an array
        if (Array.isArray(res)) {
          this.buslist = res as Buses[];
          console.log("Bus List", this.buslist);
        } else {
         
          this.buslist = Object.values(res) as Buses[];
          console.log("Bus List", this.buslist);
        }
      },
      error => {
        console.error('Error fetching Bus list:', error);
      }
    );
    
  }

}

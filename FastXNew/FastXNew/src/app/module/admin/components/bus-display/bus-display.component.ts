import { Component } from '@angular/core';
import { adminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-display',
  templateUrl: './bus-display.component.html',
  styleUrls: ['./bus-display.component.css']
})
export class DisplayComponent {
  constructor(public srv: adminService) {}

  ngOnInit(): void {
    this.refreshBusRoutes();
  }

  refreshBusRoutes(): void {
    this.srv.getBusRouteList().subscribe(
      (routes) => {
        this.srv.blist = routes;
      },
      (error) => {
        console.error('Error fetching bus routes:', error);
      }
    );
  }

  fillForm(route): void {
    this.srv.bppData = route;
  }

  delRecord(bid): void {
    if (confirm('Are you sure?')) {
      this.srv.delRoute(bid).subscribe(
        (res) => {
          alert('Bus route is deleted');
          this.refreshBusRoutes(); 
        },
        (err) => {
          alert('Error: ' + err);
        }
      );
    }
  }
}

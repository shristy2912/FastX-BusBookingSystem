import { Component } from '@angular/core';
import { BusService } from '../../../../User/bus.service';
import { adminService } from '../../services/admin-service.service';

@Component({
  selector: 'app-buses',
  templateUrl: './buses.component.html',
  styleUrl: './buses.component.css'
})
export class BusesComponent {
constructor(public srv:adminService){}

  ngOnInit():void{
    this.srv.BusList();
  }
}

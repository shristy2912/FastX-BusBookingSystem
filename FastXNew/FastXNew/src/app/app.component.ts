import { Component } from '@angular/core';

import { Router } from '@angular/router';
import { StorageService } from './auth/services/storage/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'FastXFrontend';
  isCustomerLoggedIn:boolean=StorageService.isUserLoggedIn();
  isAdminLoggedIn:boolean=StorageService.isAdminLoggedIn();
  isOperatorLoggedIn:boolean=StorageService.isOperatorLoggedIn();

  constructor(private router:Router) {
   
  }
  ngOnInit(){
    this.router.events.subscribe(event=>{
      if(event.constructor.name==="NavigationEnd"){
        this.isAdminLoggedIn= StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn=StorageService.isUserLoggedIn();
        this.isOperatorLoggedIn=StorageService.isOperatorLoggedIn();
      }
    })
  }

  // logout(){
  //   StorageService.logout();
  //   this.router.navigateByUrl("/login");
  // }
}

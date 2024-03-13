import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserServicesService } from '../user-services.service';
import { Payment } from '../payment.model';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent {
  paymentMethod: string = '';
  accountDetails: string = '';
  paymentDate: Date = new Date();
  transactionStatus: string = 'Success'; // Assuming default transaction status

  totalPrice: number; // Assuming totalPrice is calculated elsewhere in the component

  constructor(private userService: UserServicesService, private router: Router) {
    this.totalPrice = 1000; // Assign the totalPrice value accordingly
  }

  submitPayment(): void {
    // Simulate payment success
    alert('Payment successful!');
    
    // Navigate to the user dashboard
    this.router.navigateByUrl('/userdash');
  }
}
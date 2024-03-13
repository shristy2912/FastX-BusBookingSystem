import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './navbarComponent/home/home.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { LoginComponent } from './auth/components/login/login.component';

import { AdminDashboardComponent } from './module/admin/components/admin-dashboard/admin-dashboard.component';
import { OperatorAccountComponent } from './module/admin/components/operator-acc/operator-acc.component';
import { UserAccountComponent } from './module/admin/components/user-acc/user-acc.component';
import { RouteComponent } from './module/admin/components/bus-routes/bus-routes.component';
import { SeatComponent } from './Operator/seat/seat.component';
import { BookingComponent } from './Operator/booking/booking.component';
import { ScheduleComponent } from './Operator/bus-schedule/bus-schedule.component';
import { NavOpComponent } from './Operator/nav-op/nav-op.component';

import { UserDashboardComponent } from './User/user-dashboard/user-dashboard.component';
import { UserBookingComponent } from './User/user-booking/user-booking.component';

import { BusesPageComponent } from './User/buses-page/buses-page.component';
import { SeatAvailComponent } from './User/seat-avail/seat-avail.component';
import { FinalBookingComponent } from './User/final-booking/final-booking.component';
import { AboutComponent } from './navbarComponent/about/about.component';
import { ContactComponent } from './navbarComponent/contact/contact.component';
import { OperatorDashboardComponent } from './Operator/operator-dashboard/operator-dashboard.component';
import { BusesComponent } from './module/admin/components/buses/buses.component';
import { PaymentComponent } from './User/payment/payment.component';
import { MybookingComponent } from './User/mybooking/mybooking.component';



const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "home", component: HomeComponent },
  { path: "signup", component: SignupComponent },
  { path: "login", component: LoginComponent },
 {path:"about",component:AboutComponent},
 {path:"contact",component:ContactComponent},
  {path:"seat",component:SeatComponent},
  {path:"booking",component:BookingComponent},
  {path:"schedule",component:ScheduleComponent},
  { path: "navop", component: NavOpComponent },
  {path:"userdash",component:UserDashboardComponent},
  {path:"userbooking",component:UserBookingComponent},
 {path:"op-dashboard",component:OperatorDashboardComponent},
  { path: "busespage/:id", component: BusesPageComponent },
  { path: 'final-booking', component: FinalBookingComponent },
  {path:"seat-availability/:busId",component:SeatAvailComponent},
  {path:"user",component:UserAccountComponent},
  {path:"buses",component:BusesComponent},
  {path:'payment',component:PaymentComponent},
{path:'mybooking',component:MybookingComponent},
  {
    path: "admin",
    component: AdminDashboardComponent,
    children: [
      { path: "adOperator", component: OperatorAccountComponent },
      { path: "adUser", component: UserAccountComponent },
      { path: "route", component: RouteComponent },
     
    ],
  },
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

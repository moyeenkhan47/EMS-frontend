import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewDetailsComponent } from './view-details/view-details.component';

@NgModule({
  declarations: [
    AdminLoginComponent,
    EmployeeRegisterComponent,
    EmployeeListComponent,
    ViewDetailsComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule ,
    FormsModule
  ]
})
export class AdminModule { }

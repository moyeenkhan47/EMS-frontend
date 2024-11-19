import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';  
import { ReactiveFormsModule } from '@angular/forms';  // Import ReactiveFormsModule
import { FormsModule } from '@angular/forms';

import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';


@NgModule({
  declarations: [
    EmployeeDashboardComponent,
    EmployeeLoginComponent,
    EmployeeDetailsComponent,
    EmployeeSearchComponent,
    EmployeeUpdateComponent,
  
  ],
  imports: [
    CommonModule,
    EmployeeRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  ]
})
export class EmployeeModule { }

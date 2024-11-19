import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { CommonModule } from '@angular/common'; 
import { EmployeeRegisterComponent } from './employee-register/employee-register.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { ViewDetailsComponent } from './view-details/view-details.component';
import { AuthGuard } from '../_authenticate/auth-guard';

const routes: Routes = [
  { path: 'login', component: AdminLoginComponent },
  { path: 'register', component: EmployeeRegisterComponent,canActivate:[AuthGuard] },
  { path: 'getAll', component: EmployeeListComponent,canActivate:[AuthGuard] },
  { path: 'details/:id', component: ViewDetailsComponent,canActivate:[AuthGuard] },
  // You can add more routes for the admin module here
];

@NgModule({
  imports: [RouterModule.forChild(routes),
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule { }

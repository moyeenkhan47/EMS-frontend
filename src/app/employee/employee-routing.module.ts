import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeDashboardComponent } from './employee-dashboard/employee-dashboard.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { EmployeeLoginComponent } from './employee-login/employee-login.component';
import { EmployeeSearchComponent } from './employee-search/employee-search.component';
import { EmployeeUpdateComponent } from './employee-update/employee-update.component';
import { AuthGuard } from '../_authenticate/auth-guard';

const routes: Routes = [
  { path: 'dashboard', component: EmployeeDashboardComponent ,canActivate:[AuthGuard]},
  { path: 'register', component: EmployeeDetailsComponent,canActivate:[AuthGuard] },
  { path: 'login', component: EmployeeLoginComponent,canActivate:[AuthGuard] },
  { path: 'search', component: EmployeeSearchComponent,canActivate:[AuthGuard] },
  { path: 'update/:id', component: EmployeeUpdateComponent ,canActivate:[AuthGuard]},
  // Catch-all route for unknown paths
 // { path: '**', redirectTo: 'employee/login' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EmployeeRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: 'admin', loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule) },
  { path: 'employee', loadChildren: () => import('./employee/employee.module').then(e => e.EmployeeModule) },
  { path: 'leave', loadChildren: () => import('./leave/leave.module').then(m => m.LeaveModule) },
  { path: 'exit', loadChildren: () => import('./exit/exit.module').then(e => e.ExitModule) },   
  //{ path: '', redirectTo: '/admin/login', pathMatch: 'full' }, // Redirect to admin login by default
 // { path: '**', redirectTo: '/admin/login' } // Handle invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

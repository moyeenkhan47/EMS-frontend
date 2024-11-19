import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AuthGuard } from '../_authenticate/auth-guard';
import { AllLeaveComponent } from './all-leave/all-leave.component';

const routes: Routes = [
  { path: 'leave-management', component: LeaveManagementComponent,canActivate:[AuthGuard] },
  { path: 'all', component: AllLeaveComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LeaveRoutingModule { }

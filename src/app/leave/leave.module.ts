import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LeaveRoutingModule } from './leave-routing.module';
import { LeaveManagementComponent } from './leave-management/leave-management.component';
import { AllLeaveComponent } from './all-leave/all-leave.component';


@NgModule({
  declarations: [
    LeaveManagementComponent,
    AllLeaveComponent,
  ],
  imports: [
    CommonModule,
    LeaveRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  
})
export class LeaveModule { }

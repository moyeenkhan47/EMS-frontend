import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/_service/leave.service';
import { LeaveModel } from 'src/app/models/leave-model';

@Component({
  selector: 'app-all-leave',
  templateUrl: './all-leave.component.html',
  styleUrls: ['./all-leave.component.css']
})
export class AllLeaveComponent implements OnInit {
  leave: LeaveModel = new LeaveModel(0, '', '','', new Date(), new Date(), 'Pending');  // New leave request
  leaves: LeaveModel[] = [];  // List of leave requests

  constructor(private leaveService: LeaveService) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  // Load all leave requests from the service
  loadLeaveRequests(): void {
    this.leaveService.getLeaves().subscribe((data) => {
      this.leaves = data;  // Store the leave requests in the array
    });
  }


  // Update the leave status (Approve/Reject)
  updateStatus(leave: LeaveModel, status: string): void {
    leave.status = status;  // Update the status locally
    this.leaveService.updateLeaveStatus(leave).subscribe((updatedLeave) => {
      // Update the leave in the list with the new status
      const index = this.leaves.findIndex(l => l.id === updatedLeave.id);
      if (index !== -1) {
        this.leaves[index] = updatedLeave;
      }
    });
  }
}

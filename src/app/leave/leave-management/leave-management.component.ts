import { Component, OnInit } from '@angular/core';
import { LeaveService } from 'src/app/_service/leave.service';
import { LeaveModel } from 'src/app/models/leave-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-leave-management',
  templateUrl: './leave-management.component.html',
  styleUrls: ['./leave-management.component.css']
})
export class LeaveManagementComponent implements OnInit {
   emails =  localStorage.getItem('username');
  leave: LeaveModel = new LeaveModel(0, '', this.emails,'', new Date(), new Date(), 'Pending');  // New leave request
  leaves: LeaveModel[] = [];  // List of leave requests
  leaveStatus: string = ''; // Current leave status
  activeSection: string = 'request';  // Active section ('request', 'myLeave', 'leaveTracker')

  constructor(private leaveService: LeaveService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadLeaveRequests();
  }

  // Load all leave requests for the logged-in employee from the service
  loadLeaveRequests(): void {
    const loggedInUsername = localStorage.getItem('username');  // Retrieve username from localStorage

    if (loggedInUsername) {
      this.leaveService.getLeaves().subscribe((data: LeaveModel[]) => {
        console.log(data);
        // Filter leaves for the logged-in employee
        this.leaves = data.filter(leave => leave.email === loggedInUsername);
      });
    }
  }

  // Submit a new leave request
  submitLeave(): void {
    this.leaveService.submitLeaveRequest(this.leave).subscribe((newLeave: LeaveModel) => {
      // Add the new leave to the list and reset the form
      this.leaves.push(newLeave);
      this.leave = new LeaveModel(0, '','', '', new Date(), new Date(), 'Pending');
    });

    setTimeout(() => {
      // Simulate different outcomes
      const statuses = ['Pending', 'Approved', 'Rejected'];
      this.leaveStatus = statuses[Math.floor(Math.random() * statuses.length)];
    }, 2000); 
  }

  // Show the selected section (request, myLeave, leaveTracker)
  showSection(section: string): void {
    this.activeSection = section;
  }

  // Update the leave status (Approve/Reject)
  updateStatus(leave: LeaveModel, status: string): void {
    leave.status = status;  // Update the status locally
    this.leaveService.updateLeaveStatus(leave).subscribe((updatedLeave: LeaveModel) => {
      // Update the leave in the list with the new status
      const index = this.leaves.findIndex(l => l.id === updatedLeave.id);
      if (index !== -1) {
        this.leaves[index] = updatedLeave;
      }
    });
  }

  navigateToDashboard(): void {
    this.router.navigate(['employee/dashboard']);  // Navigate to the dashboard route
  }
}

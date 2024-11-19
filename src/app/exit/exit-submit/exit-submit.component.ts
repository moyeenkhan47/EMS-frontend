import { Component, OnInit } from '@angular/core';
import { ExitService } from 'src/app/_service/exit.service';
import { EmployeeService } from 'src/app/_service/employee.service';

@Component({
  selector: 'app-exit-submit',
  templateUrl: './exit-submit.component.html',
  styleUrls: ['./exit-submit.component.css']
})
export class ExitSubmitComponent implements OnInit {
  employee: any = null; // Using 'any' to hold the employee object
  exitReason: string = '';
  exitDate: string = '';
  isSubmitting: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(
    private exitRequestService: ExitService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    const employeeId = localStorage.getItem('employeeId');
    
    if (employeeId) {
      // Fetch the list of employees
      this.employeeService.getAllEmployees().subscribe({
        next: (employees: any[]) => {
          // Find the employee in the list using the ID from localStorage
          this.employee = employees.find((emp: any) => emp.employeeId === +employeeId) || null;
        },
        error: (err: any) => {
          console.error('Error fetching employee details', err);
          this.errorMessage = 'Failed to load employee details. Please try again later.';
        }
      });
    }
  }

  submitExitRequest(): void {
    if (!this.exitReason || !this.exitDate || !this.employee) {
      this.errorMessage = 'Please provide all required information.';
      return;
    }

    this.isSubmitting = true;
    const exitRequest = {
      employeeId: this.employee.id,
      exitReason: this.exitReason,
      exitDate: this.exitDate
    };

    this.exitRequestService.submitExitDetails(exitRequest).subscribe({
      next: () => {
        this.isSubmitting = false;
        this.successMessage = 'Exit request submitted successfully!';
        this.errorMessage = '';
      },
      error: (err: any) => {
        this.isSubmitting = false;
        this.errorMessage = 'Failed to submit exit request. Please try again.';
        this.successMessage = '';
        console.error('Error submitting exit request', err);
      }
    });
  }
}

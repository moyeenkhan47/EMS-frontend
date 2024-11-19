import { Component, OnInit } from '@angular/core';
import { ExitService } from 'src/app/_service/exit.service';
import { EmployeeService } from 'src/app/_service/employee.service';

@Component({
  selector: 'app-exit-employee',
  templateUrl: './exit-employee.component.html',
  styleUrls: ['./exit-employee.component.css']
})
export class ExitEmployeeComponent implements OnInit {
  employees: any[] = [];
  exitedEmployees: any[] = [];
  exitEmployeeId: number | null = null;
  exitReason: string = '';
  exitDate: string = '';
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private exitEmployeeService: ExitService,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.fetchAllEmployees();
  }

  // Fetch all employees
  fetchAllEmployees(): void {
    this.employeeService.getAllEmployees().subscribe({
      next: (response) => {
        this.employees = response;
      },
      error: (err) => {
        console.error('Error fetching employees:', err);
      }
    });
  }

  // Mark employee for exit
  markForExit(employeeId: any, employmentStatus: any): void {
    this.employeeService.markForExit(employeeId, employmentStatus).subscribe({
      next: () => {
        this.successMessage = `Employee with ID ${employeeId} marked as ${employmentStatus}.`;
        this.errorMessage = '';
        this.fetchAllEmployees(); // Refresh the list to reflect changes
      },
      error: (err) => {
        this.errorMessage = 'Failed to update employment type for the employee.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }

  // Submit exit details
  submitExitDetails(): void {
    if (!this.exitEmployeeId || !this.exitReason || !this.exitDate) {
      this.errorMessage = 'Please provide all required fields.';
      this.successMessage = '';
      return;
    }

    const exitDetails = {
      employeeId: this.exitEmployeeId,
      exitReason: this.exitReason,
      exitDate: this.exitDate
    };

    this.exitEmployeeService.submitExitDetails(exitDetails).subscribe({
      next: () => {
        this.successMessage = 'Exit details submitted successfully.';
        this.errorMessage = '';
        this.fetchAllEmployees(); // Refresh the list
      },
      error: (err) => {
        this.errorMessage = 'Failed to submit exit details.';
        this.successMessage = '';
        console.error(err);
      }
    });
  }

  // Fetch exited employees
  fetchExitedEmployees(): void {
    this.exitEmployeeService.getExitedEmployees().subscribe({
      next: (response) => {
        this.exitedEmployees = response;
      },
      error: (err) => {
        console.error('Error fetching exited employees:', err);
      }
    });
  }
}

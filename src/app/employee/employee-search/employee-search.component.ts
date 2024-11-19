import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/_service/employee.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  searchForm!: FormGroup; // Reactive form group for the search
  employeeDetails: any; // To store employee details
  errorMessage!: string; // To show error messages

  constructor(private fb: FormBuilder, 
    private employeeService: EmployeeService,
  private router: Router) {}

  ngOnInit() {
    // Initialize form with employeeId control
    this.searchForm = this.fb.group({
      employeeId: ['', Validators.required] // employeeId is required
    });
  }

  // This method is called on input change
  onSearchChange() {
    const employeeId = this.searchForm.controls['employeeId'].value;
    if (employeeId) {
      this.searchEmployeeById(employeeId);
    }
  }

  // Method to fetch employee details based on employeeId
  searchEmployeeById(employeeId: string) {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data) => {
        this.employeeDetails = data;
        this.errorMessage = ''; // Clear previous error if employee found
      },
      (error) => {
        this.errorMessage = 'Employee not found. Please try again.';
        this.employeeDetails = null; // Clear employee details if not found
      }
    );
  }
  navigateToEmployeeList() {
    this.router.navigate(['employee/dashboard']);
  }
}

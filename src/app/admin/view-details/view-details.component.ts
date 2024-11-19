import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/_service/employee.service'; // Import the service for API calls
import { ActivatedRoute, Router } from '@angular/router';  // To get the employee ID from route and navigate
import { Location } from '@angular/common';
@Component({
  selector: 'app-view-details',
  templateUrl: './view-details.component.html',
  styleUrls: ['./view-details.component.css']
})
export class ViewDetailsComponent implements OnInit {

  employeeDetails: any = {};  // Object to hold employee details
  errorMessage: string = '';  // To show error if employee not found

  constructor(
    private employeeService: EmployeeService,  // Inject the employee service
    private route: ActivatedRoute,  // To access route parameters (employee ID)
    private router: Router,  // To navigate back to the employee list
    private location: Location
  ) {}

  ngOnInit(): void {
    const employeeId = this.route.snapshot.paramMap.get('id');  // Get employee ID from the route
    if (employeeId) {
      this.getEmployeeDetails(employeeId);  // Fetch employee details
    } else {
      this.errorMessage = 'Invalid Employee ID';
    }
  }

  // Method to fetch employee details by ID
  getEmployeeDetails(employeeId: string): void {
    this.employeeService.getEmployeeById(employeeId).subscribe(
      (data) => {
        this.employeeDetails = data;  // Assign the employee details
      },
      (error) => {
        this.errorMessage = 'Employee details not found';
      }
    );
  }
   // Navigate to update form with the selected employee ID
   updateEmployee(employeeId: string): void {
    this.router.navigate([`/employee/update`, employeeId]);
  }


  // Navigate back to employee list
 
  navigateBack(): void {
    this.location.back();
  }
}

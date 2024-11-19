import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployeeService } from 'src/app/_service/employee.service';
import { AdminService } from 'src/app/_service/admin.service';
import { AuthService } from 'src/app/_authenticate/auth-service';
import { HttpErrorResponse } from '@angular/common/http';

interface Employee {
  employeeId: string;
  fullName: string;
  email: string;
  register: boolean;
}

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[] = []; // Original list of employees
  filteredEmployees: Employee[] = []; // Filtered list based on search
  searchQuery: string = ''; // Search query input
  errorMessage: string = '';
  isLoading: boolean = true;
Math: any;

  constructor(
    private router: Router,
    private employeeService: EmployeeService,
    private adminService: AdminService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  // Fetch the list of employees
  loadEmployees(): void {
    this.isLoading = true;
    this.adminService.getEmployees().subscribe(
      (data: Employee[]) => {
        this.employees = data;
        this.filteredEmployees = data; // Initialize the filtered list
        this.isLoading = false;
        
        const employeeIds = this.employees.map(employee => employee.employeeId); // Assuming employeeId is the field name
        localStorage.setItem('employeeIds', JSON.stringify(employeeIds)); // Save as JSON string
      },
      (error: HttpErrorResponse) => {
        this.isLoading = false;
        this.errorMessage = error.status === 0 ? 'No Internet Connection or Server is down!' : `Error: ${error.message}`;
      }
    );
  }

  // Filter employees based on the search query
  filterEmployees(): void {
    const query = this.searchQuery ? this.searchQuery.toLowerCase() : '';
  
    this.filteredEmployees = this.employees.filter(employee => {
      const employeeId = employee.employeeId ? employee.employeeId.toLowerCase() : '';
      const fullName = employee.fullName ? employee.fullName.toLowerCase() : '';
  
      return employeeId.includes(query) || fullName.includes(query);
    });
  }

  // Navigate to the employee registration page
  navigateToRegister(): void {
    this.router.navigate(['/admin/register']);
  }

  // Navigate to leave management
  navigateLeaveManagement(): void {
    this.router.navigate(['leave/all']);
  }
  navigateEmployeeExit(): void {
    this.router.navigate(['exit/all']);
  }


  // Logout action
  logout(): void {
    this.authService.removeToken();
    this.router.navigate(['admin/login']);
  }

  // Delete an employee
  deleteEmployee(employeeId: string): void {
    if (confirm('Are you sure you want to delete this employee?')) {
      this.employeeService.deleteEmployee(employeeId).subscribe(
        () => this.loadEmployees(),
        (error: HttpErrorResponse) => {
          console.error('Error deleting employee:', error);
          this.errorMessage = `Error deleting employee: ${error.message}`;
        }
      );
    }
  }

  // Download ID proof for an employee
  downloadIdProof(employeeId: string): void {
    this.employeeService.getIdProof(employeeId).subscribe(
      (file: Blob) => {
        const fileUrl = window.URL.createObjectURL(file);
        const link = document.createElement('a');
        link.href = fileUrl;
        link.download = `idProof_${employeeId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(fileUrl);
      },
      (error: HttpErrorResponse) => {
        console.error('Error downloading ID Proof:', error);
        this.errorMessage = 'Error downloading ID Proof. Please try again later.';
      }
    );
  }
  currentPage: number = 1; // Current page number
itemsPerPage: number = 10; // Number of items per page

// Method to get paginated employees
get paginatedEmployees(): any[] {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  return this.filteredEmployees.slice(startIndex, endIndex);
}

// Change page
changePage(page: number): void {
  this.currentPage = page;
}
}

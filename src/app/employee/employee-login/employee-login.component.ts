import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_service/admin.service';
import {  HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-login',
  templateUrl: './employee-login.component.html',
  styleUrls: ['./employee-login.component.css']
})
export class EmployeeLoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }

    const { username, password } = this.loginForm.value;
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Pass `username` (or `email` depending on what the backend expects)
  this.adminService.loginEmployee(username, password).subscribe({
    next: (response: any) => {
      console.log(response);

      // Assuming the login response contains the employeeId
      if (response && response.employeeId) {
        localStorage.setItem('employeeId', response.employeeId.toString());
      }
      localStorage.setItem('username', username); 

      // Navigate to the employee dashboard
      this.router.navigate(['employee/dashboard']);
    },
      error: (err: HttpErrorResponse) => {
        console.error('Error during login:', err);
        if (err.status === 401) {
          this.errorMessage = 'Invalid username or password.';
        } else {
          this.errorMessage = 'Login failed. Please try again later.';
        }
      }
    });
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_service/admin.service';
import { Router } from '@angular/router';  // Import Router for navigation

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private router: Router  // Inject Router service
  ) {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return; // Prevent submission if the form is invalid
    }
  
    const { username, password } = this.loginForm.value;
  
    this.adminService.adminLogin(username, password).subscribe({
      next: (response: any) => {
        console.log(response); // Log the raw response
  
        // If response is a string, try parsing it as JSON; otherwise, assume it's already an object
        let parsedResponse;
        try {
          parsedResponse = typeof response === 'string' ? JSON.parse(response) : response;
        } catch (error) {
          console.error('Error parsing response:', error);
          return;
        }
  
        const jwtToken = parsedResponse.jwtToken;
  
        if (jwtToken) {
          if (localStorage.getItem('token')) {
            localStorage.removeItem('token');
          }
          localStorage.setItem('token', jwtToken);
          this.router.navigate(['admin/getAll']);
        } else {
          console.log("jwtToken not found in response");
        }
      },
      error: (err) => {
        console.error('Error during login:', err); // Handle login error
      }
    });
  }
  
  navigateToEmployeeList() {
    this.router.navigate(['admin/getAll']);
  }
}

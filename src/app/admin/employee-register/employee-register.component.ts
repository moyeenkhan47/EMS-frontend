import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AdminService } from 'src/app/_service/admin.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-employee-register',
  templateUrl: './employee-register.component.html',
  styleUrls: ['./employee-register.component.css']
})
export class EmployeeRegisterComponent implements OnInit {
  registrationForm!: FormGroup;  // Add non-null assertion operator `!`

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,  // Inject AdminService
    private router: Router
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = this.registrationForm.value;
      this.adminService.registerEmployee(formData).subscribe(
        (response) => {
          console.log('Registration successful', response);
          // Navigate to the login page or employee dashboard after successful registration
          this.router.navigate(['/admin/getAll']);
        },
        (error) => {
          console.log('Registration failed', error);
        }
      );
    } else {
      console.log('Form is invalid');
    }
  }
  navigateToEmployeeList() {
    this.router.navigate(['admin/getAll']);
  }
}

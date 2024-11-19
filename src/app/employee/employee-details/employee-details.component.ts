import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/_service/employee.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  registrationForm!: FormGroup;
  empPhoto: File | null = null;
  idProof: File | null = null;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private employeeService: EmployeeService
  ) {}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      country: [''],
      dateOfBirth: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: ['', Validators.required],
      jobTitle: [''],
      dateOfJoining: ['', Validators.required],
      employmentType: ['FULL_TIME'],
      employmentStatus: ['ACTIVE']
    });
  }

  onFileChange(event: Event, controlName: string): void {
    const input = event.target as HTMLInputElement;
    if (input?.files && input.files.length > 0) {
      const file = input.files[0];
      if (controlName === 'empPhoto') this.empPhoto = file;
      else if (controlName === 'idProof') this.idProof = file;
    }
  }

  onSubmit(): void {
    if (this.registrationForm.valid) {
      const formData = new FormData();
      const formValues = this.registrationForm.value;

      // Append form values
      Object.keys(formValues).forEach((key) => {
        formData.append(key, formValues[key]);
      });

      // Append files if available
      if (this.empPhoto) formData.append('empPhoto', this.empPhoto);
      if (this.idProof) formData.append('idProof', this.idProof);

      // Submit the form data
      this.employeeService.detailsRegisterEmployee(formData).subscribe(
        (response: any) => {
          this.router.navigate(['employee/dashboard']);
          console.log('Employee registered successfully', response);
          this.registrationForm.reset();
          this.empPhoto = null;
          this.idProof = null;
        },
        (error: HttpErrorResponse) => {
          console.error('Error during employee registration', error.message);
        }
      );
    }
  }
  navigateToEmployeeDashboard() {
    this.router.navigate(['employee/dashboard']);
  }
}

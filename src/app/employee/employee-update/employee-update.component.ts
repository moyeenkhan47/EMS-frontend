import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/_service/employee.service';

@Component({
  selector: 'app-employee-update',
  templateUrl: './employee-update.component.html',
  styleUrls: ['./employee-update.component.css']
})
export class EmployeeUpdateComponent implements OnInit {
  updateForm: FormGroup;
  employeeId: string;
  empPhoto: File | null = null;
  idProof: File | null = null;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private employeeService: EmployeeService
  ) {
    this.updateForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      address: [''],
      country: [''],
      dateOfBirth: [''],
      email: ['', [Validators.required, Validators.email]],
      phoneNumber: [''],
      jobTitle: [''],
      dateOfJoining: [''],
      employmentType: [''],
      employmentStatus: ['']
    });
    this.employeeId = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnInit() {
    this.loadEmployeeData();
  }

  loadEmployeeData() {
    this.employeeService.getEmployeeById(this.employeeId).subscribe((data) => {
      this.updateForm.patchValue(data);
    });
  }

  onFileChange(event: any, field: string) {
    const file = event.target.files[0];
    if (field === 'empPhoto') this.empPhoto = file;
    if (field === 'idProof') this.idProof = file;
  }

  onSubmit() {
    // Create FormData object for file upload
    const formData = new FormData();
    formData.append('firstName', this.updateForm.get('firstName')!.value);
    formData.append('lastName', this.updateForm.get('lastName')!.value);
    formData.append('address', this.updateForm.get('address')!.value);
    formData.append('country', this.updateForm.get('country')!.value);
    formData.append('dateOfBirth', this.updateForm.get('dateOfBirth')!.value);
    formData.append('email', this.updateForm.get('email')!.value);
    formData.append('phoneNumber', this.updateForm.get('phoneNumber')!.value);
    formData.append('jobTitle', this.updateForm.get('jobTitle')!.value);
    formData.append('dateOfJoining', this.updateForm.get('dateOfJoining')!.value);
    formData.append('employmentType', this.updateForm.get('employmentType')!.value);
    formData.append('employmentStatus', this.updateForm.get('employmentStatus')!.value);

    // Append files if they are selected
    if (this.empPhoto) formData.append('empPhoto', this.empPhoto);
    if (this.idProof) formData.append('idProof', this.idProof);

    // Call service to update employee details
    this.employeeService.updateEmployee(this.employeeId, formData).subscribe(
      () => {
        this.router.navigate(['/admin/getAll']);
      },
      (error) => {
        console.error('Error updating employee:', error);
      }
    );
  }

  navigateToEmployeeList() {
    this.router.navigate(['/admin/getAll']);
  }
}

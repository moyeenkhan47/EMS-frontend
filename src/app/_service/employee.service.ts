import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  private apiUrl = 'http://localhost:8089/api/employee';

  constructor(private http: HttpClient) {}

  // Register employee with file data
  detailsRegisterEmployee(formData: FormData): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, formData);
  }

  // Get employee by ID
  getEmployeeById(employeeId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${employeeId}`);
  }

  // Get all employees
  getAllEmployees(): Observable<any> {
    return this.http.get(`${this.apiUrl}`);
  }

  // Delete employee
  deleteEmployee(employeeId: string, email?: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${employeeId}`);
  }

  // Update employee details
  updateEmployee(employeeId: string, employeeData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${employeeId}`, employeeData);
  }

  // Get ID proof as a file
  getIdProof(employeeId: string): Observable<Blob> {
    return this.http.get<Blob>(`${this.apiUrl}/${employeeId}/idProof`, { responseType: 'blob' as 'json' });
  }
  markForExit(employeeId: string, employmentStatus: string): Observable<void> {
    const payload = { employmentStatus }; // Sending employmentType in the request body
    return this.http.put<void>(`${this.apiUrl}/markForExit/${employeeId}`, payload);
  }
}

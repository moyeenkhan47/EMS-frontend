import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  private apiUrl = 'http://localhost:8089/api/admin';

  constructor(private http: HttpClient) {}

  // Admin login method (no authorization required)
  adminLogin(username: string, password: string): Observable<any> {
    const loginData = { username, password };
    return this.http.post(`${this.apiUrl}/authunticate`, loginData, { responseType: 'json' });
  }

  // Login employee method
  loginEmployee(username: string, password: string): Observable<any> {
    const body = { email: username, password };
    return this.http.post(`${this.apiUrl}/login`, body, { responseType: 'text' });
  }

  // Register employee method
  registerEmployee(employeeData: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, employeeData);
  }

  // Get all employees method
  getEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/all`);
  }

  // Get employee by ID method
  getEmployeeById(employeeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${employeeId}`);
  }
}

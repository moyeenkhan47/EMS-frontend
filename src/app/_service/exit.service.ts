import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExitService {
  private apiUrl = 'http://localhost:8089/api/employee'; // Adjust base URL if necessary

  constructor(private http: HttpClient) {}

  // Fetch all employees
  getAllEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}`);
  }

  // Mark employees for exit
  markForExit(employeeIds: number[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/exit`, employeeIds);
  }

  // Submit exit details
  submitExitDetails(exitDetails: any): Observable<void> {
    return this.http.post<void>(`${this.apiUrl}/exit-details`, exitDetails);
  }

  // Fetch exited employees
  getExitedEmployees(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/exited`);
  }
}

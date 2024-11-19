import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { LeaveModel } from '../models/leave-model';

@Injectable({
  providedIn: 'root'
})
export class LeaveService {

  private apiUrl = 'http://localhost:8089/api/leaves';  // Replace with your API URL

  constructor(private http: HttpClient) {}

  // Get all leave requests
  getLeaves(): Observable<LeaveModel[]> {
    return this.http.get<LeaveModel[]>(`${this.apiUrl}/all`);
  }

  // Submit a new leave request
  submitLeaveRequest(leave: LeaveModel): Observable<LeaveModel> {
    return this.http.post<LeaveModel>(`${this.apiUrl}`, leave);
  }
  updateLeaveStatus(leave: LeaveModel): Observable<LeaveModel> {
    return this.http.put<LeaveModel>(`${this.apiUrl}/${leave.id}`, leave);
  }
}

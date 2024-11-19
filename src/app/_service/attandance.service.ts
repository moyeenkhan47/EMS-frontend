import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs'; // Use environment URL
import { AttendanceModel } from '../models/attandance-model'; // Import AttendanceModel

@Injectable({
  providedIn: 'root',
})
export class AttendanceService {
  private apiUrl = 'http://localhost:8089/api/attandance';

  constructor(private http: HttpClient) {}

  // Get all attendance records
  getAttendance(): Observable<AttendanceModel[]> {
    return this.http.get<AttendanceModel[]>(`${this.apiUrl}/all`);
  }
}

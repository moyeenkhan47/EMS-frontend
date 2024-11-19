// src/app/models/leave.model.ts

export class LeaveModel {
    id: number;
    employeeName: string;
    email:any;
    leaveType: string;
    startDate: Date;
    endDate: Date;
    status: string;
  
    constructor(id: number, employeeName: string, email:any, leaveType: string, startDate: Date, endDate: Date, status: string) {
      this.id = id;
      this.employeeName = employeeName;
      this.email=email;
      this.leaveType = leaveType; 
      this.leaveType = leaveType;
      this.startDate = startDate;
      this.endDate = endDate;
      this.status = status;
    }
  }

  
  
export class AttendanceModel {
    constructor(
      public date: Date,
      public employeeName: string,
      public status: string // E.g., 'Present', 'Absent'
    ) {}
  }
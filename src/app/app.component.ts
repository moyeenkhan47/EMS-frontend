import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  employees = [
    { id: 1, name: 'John Doe', dateOfBirth: '1990-01-15', department: 'HR' },
    { id: 2, name: 'Jane Smith', dateOfBirth: '1985-03-22', department: 'Finance' },
    // Add more employee data or retrieve from a service
  ];

  ngOnInit() {
    // Fetch employee data if using a service
  }

  viewEmployee(id: number) {
    console.log('View employee with ID:', id);
    // Add logic to view or edit employee details
  }
}

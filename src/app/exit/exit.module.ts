import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { HttpClientModule } from '@angular/common/http';
import { ExitRoutingModule } from './exit-routing.module';
import { ExitEmployeeComponent } from './exit-employee/exit-employee.component';
import { ExitSubmitComponent } from './exit-submit/exit-submit.component';


@NgModule({
  declarations: [
    ExitEmployeeComponent,
    ExitSubmitComponent
  ],
  imports: [
    CommonModule,
    ExitRoutingModule,
    FormsModule,
    HttpClientModule
  ]
})
export class ExitModule { }

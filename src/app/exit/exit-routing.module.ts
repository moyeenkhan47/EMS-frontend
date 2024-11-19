import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ExitEmployeeComponent } from './exit-employee/exit-employee.component';
import { AuthGuard } from '../_authenticate/auth-guard';
import { ExitSubmitComponent } from './exit-submit/exit-submit.component';

const routes: Routes = [
  { path: 'all', component: ExitEmployeeComponent,canActivate:[AuthGuard] },
  { path: 'submit', component: ExitSubmitComponent,canActivate:[AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExitRoutingModule { }

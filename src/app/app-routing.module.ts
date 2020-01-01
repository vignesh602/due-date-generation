import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';


const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'holidays', component: HolidaysListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

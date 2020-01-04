import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { GenerateDueDateComponent } from './generate-due-date/generate-due-date.component';


const routes: Routes = [
  // { path: '', component: DashboardComponent },
  { path: 'holidays', component: HolidaysListComponent },
  { path: 'due-date-generationn', component: GenerateDueDateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

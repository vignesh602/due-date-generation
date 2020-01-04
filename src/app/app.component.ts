import { Component } from '@angular/core';
import { Service } from './service/service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'due-date-generation';

  constructor(
    public service: Service
  ) {
    this.service.selectedWeeklyOff = {};
    this.service.selectedWeeklyOff['SATURDAY'] = true;
    this.service.selectedWeeklyOff['SUNDAY'] = true;
  }
}

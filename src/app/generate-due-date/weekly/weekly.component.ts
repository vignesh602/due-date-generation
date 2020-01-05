import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Service } from 'src/app/service/service';
import { getDay, weekData } from 'src/app/utils/staticData_and_functions';

@Component({
  selector: 'app-weekly',
  templateUrl: './weekly.component.html',
  styleUrls: ['./weekly.component.scss']
})
export class WeeklyComponent implements OnInit {

  @Input() weeklyForm: FormGroup;
  @Output() outputdueDates: EventEmitter<any> = new EventEmitter<any>();

  weekData = weekData;
  constructor(
    public service: Service
  ) { }

  ngOnInit() {
    this.weeklyForm.get('week').setValue(this.weekData)
  }

  submitForm() {
    let formValue = _.cloneDeep(this.weeklyForm.value);
    let dueDates = [];
    let startDate: Date = formValue.startDate;
    let holidayList = [];
    this.service.holidaysList.subscribe((res) => holidayList = res).unsubscribe();
    if (formValue.endDateType === 'endDate') {
      let endDate: Date = formValue.endDate;
      dueDates = this.service.generateDueDatesWeekly(startDate, endDate, holidayList, formValue.week);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      dueDates = this.service.generateByOccurenceWeekly(startDate, endAfter, holidayList, formValue.week)
    } else if (formValue.endDateType === 'onGoing'){
      dueDates = this.service.generateByOccurenceWeekly(startDate, 200, holidayList, formValue.week)
    }
    this.outputdueDates.emit(dueDates);
  }
}

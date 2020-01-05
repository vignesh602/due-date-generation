import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Service } from 'src/app/service/service';
import { getDay, getMonth, monthData } from 'src/app/utils/staticData_and_functions';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit {

  @Input() monthlyForm: FormGroup;
  @Output() outputdueDates: EventEmitter<any> = new EventEmitter<any>();

  monthData = monthData;

  constructor(
    public service: Service
  ) { }

  ngOnInit() {
    this.monthlyForm.get('month').setValue(this.monthData);
  }

  submitForm() {
    let formValue = _.cloneDeep(this.monthlyForm.value);
    let dueDates = [];
    let startDate: Date = formValue.startDate;
    let holidayList = [];
    this.service.holidaysList.subscribe((res) => holidayList = res).unsubscribe();
    if (formValue.endDateType === 'endDate') {
      let endDate: Date = formValue.endDate;
      dueDates = this.service.generateDueDatesMonthly(startDate, endDate, holidayList, formValue.month, formValue.day);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      let endDate = _.cloneDeep(startDate);
      endDate.setDate(endDate.getDate() + endAfter);
      dueDates = this.service.generateByOccurenceMonthly(startDate, endAfter, holidayList, formValue.month, formValue.day)
    } else if (formValue.endDateType === 'onGoing') {
      dueDates = this.service.generateByOccurenceMonthly(startDate, 200, holidayList, formValue.month, formValue.day)
    }
    this.outputdueDates.emit(dueDates);
  }

}

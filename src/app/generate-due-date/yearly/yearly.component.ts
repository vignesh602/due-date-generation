import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { monthData, getDay, getMonth, getMonthNumber } from 'src/app/utils/staticData_and_functions';
import { Service } from 'src/app/service/service';
import * as _ from 'lodash';

@Component({
  selector: 'app-yearly',
  templateUrl: './yearly.component.html',
  styleUrls: ['./yearly.component.scss']
})
export class YearlyComponent implements OnInit {

  @Input() yearlyForm: FormGroup;
  @Output() outputdueDates: EventEmitter<any> = new EventEmitter<any>();

  monthData = monthData;

  constructor(
    public service: Service
  ) { }

  ngOnInit() {
  }

  submitForm() {
    let formValue = _.cloneDeep(this.yearlyForm.value);
    let dueDates = [];
    let startDate: Date = formValue.startDate;
    let holidayList = [];
    this.service.holidaysList.subscribe((res) => holidayList = res).unsubscribe();
    if (formValue.endDateType === 'endDate') {
      let endDate: Date = formValue.endDate;
      dueDates = this.service.generateDueDatesYearly(startDate, endDate, holidayList, formValue.month, formValue.day);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      let endDate = _.cloneDeep(startDate);
      endDate.setDate(endDate.getDate() + endAfter);
      dueDates = this.service.generateByOccurenceYearly(startDate, endAfter, holidayList, formValue.month, formValue.day)
    } else if (formValue.endDateType === 'onGoing'){
      dueDates = this.service.generateByOccurenceYearly(startDate, 200, holidayList, formValue.month, formValue.day)
    }
    this.outputdueDates.emit(dueDates);
  }

}

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
      dueDates = this.generateDueDates(startDate, endDate, holidayList, formValue.month, formValue.day);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      let endDate = _.cloneDeep(startDate);
      endDate.setDate(endDate.getDate() + endAfter);
      dueDates = this.generateByOccurence(startDate, endAfter, holidayList, formValue.month, formValue.day)
    } else {

    }
    console.log(dueDates)
    this.outputdueDates.emit(dueDates);
  }

  generateDueDates(startDate: Date, endDate: Date, holidayList, month, day) {
    let dueDates = [];
    let requiredDate = new Date(startDate.getFullYear(), getMonthNumber(month), day);
    if(requiredDate < startDate) requiredDate.setFullYear(requiredDate.getFullYear() + 1);
    console.log(requiredDate, endDate, month, day)
    for (let sd = requiredDate; sd <= endDate; sd.setFullYear(sd.getFullYear() + 1)) {
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        month == getMonth(sd.getMonth()) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurence(startDate: Date, occurence, holidayList, month, day) {
    let count = 1;
    let sd = new Date(startDate.getFullYear(), getMonthNumber(month), day);
    let dueDates = [];
    if(sd < startDate) sd.setFullYear(sd.getFullYear() + 1)
    while (count <= occurence) {
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        month == getMonth(sd.getMonth()) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setFullYear(sd.getFullYear() + 1);
    }
    return dueDates;
  }

}

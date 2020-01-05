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
      dueDates = this.generateDueDates(startDate, endDate, holidayList, formValue.month, formValue.day);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      let endDate = _.cloneDeep(startDate);
      endDate.setDate(endDate.getDate() + endAfter);
      dueDates = this.generateByOccurence(startDate, endAfter, holidayList, formValue.month, formValue.day)
    } else {

    }
    this.outputdueDates.emit(dueDates);
  }

  generateDueDates(startDate: Date, endDate: Date, holidayList, month, day) {
    let dueDates = [];
    let requiredDate = new Date(startDate.getFullYear(), startDate.getMonth(), day);
    if (requiredDate < startDate) requiredDate.setMonth(requiredDate.getMonth() + 1);
    for (let sd = requiredDate; sd <= endDate; sd.setMonth(sd.getMonth() + 1)) {
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        (month.findIndex((item) => item.checked === true && item.value === getMonth(sd.getMonth())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurence(startDate: Date, occurence, holidayList, month, day) {
    let count = 1;
    let sd = new Date(startDate.getFullYear(), startDate.getMonth(), day);
    let dueDates = [];
    if (sd < startDate) sd.setMonth(sd.getMonth() + 1);
    while (count <= occurence) {
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        (month.findIndex((item) => item.checked === true && item.value === getMonth(sd.getMonth())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setMonth(sd.getMonth() + 1);
    }
    return dueDates;
  }

}

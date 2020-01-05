import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import * as _ from 'lodash';
import { Service } from 'src/app/service/service';
import { getDay, getMonth } from 'src/app/utils/staticData_and_functions';

@Component({
  selector: 'app-monthly',
  templateUrl: './monthly.component.html',
  styleUrls: ['./monthly.component.scss']
})
export class MonthlyComponent implements OnInit {

  @Input()
  monthlyForm: FormGroup;
  monthData = [
    { label: 'Jan', value: 'January' },
    { label: 'Feb', value: 'February' },
    { label: 'Mar', value: 'March' },
    { label: 'Apr', value: 'April' },
    { label: 'May', value: 'May' },
    { label: 'Jun', value: 'June' },
    { label: 'Jul', value: 'July' },
    { label: 'Aug', value: 'August' },
    { label: 'Sep', value: 'September' },
    { label: 'Oct', value: 'October' },
    { label: 'Nov', value: 'November' },
    { label: 'Dec', value: 'December' },

  ]

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
      console.log(formValue.week)
      dueDates = this.generateDueDates(startDate, endDate, holidayList, formValue.month, formValue.day);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      let endDate = _.cloneDeep(startDate);
      endDate.setDate(endDate.getDate() + endAfter);
      dueDates = this.generateByOccurence(startDate, endAfter, holidayList, formValue.month, formValue.day)
    } else {

    }
    console.log(dueDates)
  }

  generateDueDates(startDate: Date, endDate: Date, holidayList, month, day) {
    let dueDates = [];
    let requiredDate = new Date(startDate.getFullYear(), startDate.getMonth(), day);
    console.log(requiredDate, endDate)
    for (let sd = requiredDate; sd <= endDate; sd.setMonth(sd.getMonth() + 1)) {
      console.log(month.findIndex((item) => item.checked === true && item.value === getMonth(sd.getMonth())))
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
    while (count <= occurence) {
      console.log(count, occurence)
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

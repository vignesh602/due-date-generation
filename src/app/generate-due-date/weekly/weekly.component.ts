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
      dueDates = this.generateDueDates(startDate, endDate, holidayList, formValue.week);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      // let endDate = _.cloneDeep(startDate);
      // endDate.setDate(endDate.getDate() + endAfter);
      dueDates = this.generateByOccurence(startDate, endAfter, holidayList, formValue.week)
      // dueDates = this.generateDueDates(startDate, endDate, holidayList, formValue.week);
    } else {

    }
    this.outputdueDates.emit(dueDates);
  }

  generateDueDates(startDate: Date, endDate: Date, holidayList, week) {
    let dueDates = [];
    for (let sd = startDate; sd <= endDate; sd.setDate(sd.getDate() + 1)) {
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        (week.findIndex((item) => item.checked === true && item.value.toUpperCase() === getDay(sd.getDay())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurence(startDate: Date, occurence, holidayList, week) {
    let count = 1;
    let sd = startDate;
    let dueDates = [];
    while (count <= occurence) {
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        (week.findIndex((item) => item.checked === true && item.value.toUpperCase() === getDay(sd.getDay())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setDate(sd.getDate() + 1);
    }
    return dueDates;
  }

}

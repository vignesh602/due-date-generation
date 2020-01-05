import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from '../service/service';
import { getDay } from '../utils/staticData_and_functions';
import * as _ from 'lodash';

@Component({
  selector: 'app-generate-due-date',
  templateUrl: './generate-due-date.component.html',
  styleUrls: ['./generate-due-date.component.scss']
})
export class GenerateDueDateComponent implements OnInit {

  frequency = ['DAILY', 'WEEKLY', 'MONTHLY', 'YEARLY', 'ONE TIME'];
  dailyForm: FormGroup;
  weeklyForm: FormGroup;
  monthlyForm: FormGroup;
  yearlyForm: FormGroup;
  oneTimeForm: FormGroup;
  currentDate = new Date();

  constructor(
    public service: Service,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForms();
    this.dailyForm.get('startDate').setValue(this.currentDate);
  }

  createForms() {
    this.dailyForm = this.fb.group({
      startDate: [null],
      endDateType: [null],
      endDate: [null],
      endAfter: [null],
      onGoing: [null]
    });
    this.weeklyForm = this.fb.group({
      week: [null],
      startDate: [this.currentDate],
      endDateType: [null],
      endDate: [null],
      endAfter: [null],
      onGoing: [null]
    });
    this.monthlyForm = this.fb.group({
      month: [null],
      day: [null],
      startDate: [this.currentDate],
      endDateType: [null],
      endDate: [null],
      endAfter: [null],
      onGoing: [null]
    })
  }

  submitForm() {
    console.log(this.dailyForm.value);
    let formValue = _.cloneDeep(this.dailyForm.value);
    let dueDates = [];
    let startDate: Date = formValue.startDate;
    let holidayList = [];
    this.service.holidaysList.subscribe((res) => holidayList = res).unsubscribe();
    if (formValue.endDateType === 'endDate') {
      let endDate: Date = formValue.endDate;
      dueDates = this.generateDueDates(startDate, endDate, holidayList);
    } else if (formValue.endDateType === 'occurence') {
      let endAfter = formValue.endAfter;
      let endDate = _.cloneDeep(startDate);
      endDate.setDate(endDate.getDate() + endAfter);
      dueDates = this.generateByOccurence(startDate, endAfter, holidayList);
    } else {

    }
    console.log(dueDates)
  }

  generateDueDates(startDate: Date, endDate: Date, holidayList) {
    let dueDates = [];
    for (let sd = startDate; sd <= endDate; sd.setDate(sd.getDate() + 1)) {
      console.log((holidayList.findIndex((value) => value.date.getDate() !== sd.getDate() && value.date.getMonth() !== sd.getMonth())))
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurence(startDate: Date, occurence, holidayList) {
    let count = 1;
    let sd = startDate;
    let dueDates = [];
    while (count <= occurence) {
      console.log(count, occurence)
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setDate(sd.getDate() + 1);
    }
    return dueDates;
  }
}

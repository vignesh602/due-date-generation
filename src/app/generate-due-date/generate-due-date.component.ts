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
  isDisplayDates = false;
  selectedFormData: any;
  dueDatesDisplay = [];
  tabIndex = 0;
  isModalVisible = false
  weeklyOff: any;
  holidayList = [];

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
    });
    this.yearlyForm = this.fb.group({
      month: [null],
      day: [null],
      startDate: [this.currentDate],
      endDateType: [null],
      endDate: [null],
      endAfter: [null],
      onGoing: [null]
    });
    this.oneTimeForm = this.fb.group({
      startDate: [this.currentDate]
    });
  }

  submitForm() {
    this.dueDatesDisplay = [];
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
    this.outputdueDates(dueDates, 'daily')
  }

  generateDueDates(startDate: Date, endDate: Date, holidayList) {
    let dueDates = [];
    for (let sd = startDate; sd <= endDate; sd.setDate(sd.getDate() + 1)) {
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
      if (!this.service.selectedWeeklyOff[getDay(sd.getDay())] &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setDate(sd.getDate() + 1);
    }
    return dueDates;
  }

  submitOneTimeForm() {
    let formValue = this.oneTimeForm.value
    let dueDates = [];
    dueDates.push(formValue.startDate);
    this.outputdueDates(dueDates, 'oneTime');
  }

  goBack() {
    this.isDisplayDates = false;
  }

  outputdueDates(data, type?) {
    console.log(data);
    switch (type) {
      case 'daily':
        this.selectedFormData = this.dailyForm.value;
        this.selectedFormData.frequency = 'DAILY'
        break;
      case 'weekly':
        this.selectedFormData = _.cloneDeep(this.weeklyForm.value);
        this.selectedFormData.frequency = 'WEEKLY';
        console.log(this.selectedFormData)
        this.selectedFormData.statement = `Every `
        this.selectedFormData.week.forEach((el: any) => {
          if(el.checked) {
            this.selectedFormData.statement = this.selectedFormData.statement + el.value + ' ';
          }
        })
        break;
      case 'monthly':
        this.selectedFormData = this.monthlyForm.value;
        this.selectedFormData.frequency = 'MONTHLY'
        this.selectedFormData.statement = `${this.selectedFormData.day} of `
        this.selectedFormData.month.forEach((el: any) => {
          if(el.checked) {
            this.selectedFormData.statement = this.selectedFormData.statement + el.value + ' ';
          }
        })
        break;
      case 'yearly':
        this.selectedFormData = this.yearlyForm.value;
        this.selectedFormData.frequency = 'YEARLY'
        this.selectedFormData.statement = `${this.selectedFormData.day} of ${this.selectedFormData.month}`;
        break;
      case 'oneTime':
        this.selectedFormData = this.oneTimeForm.value;
        this.selectedFormData.frequency = 'ONE TIME'
        break;
    }
    this.dueDatesDisplay = data;
    this.isDisplayDates = true;
  }

  tabChange(tabInfo) {
    console.log(tabInfo);
    this.tabIndex = tabInfo.index;
    console.log(this.tabIndex)
  }

  openHolidaysModal() {
    this.weeklyOff = this.service.selectedWeeklyOff;
    this.service.holidaysList.subscribe((res) => this.holidayList = res).unsubscribe();
    this.isModalVisible = true;
  }

  handleCancel() {
    this.isModalVisible = false;
  }
}

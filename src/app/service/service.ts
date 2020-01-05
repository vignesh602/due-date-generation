import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';
import { getDay, getMonth, getMonthNumber } from '../utils/staticData_and_functions';


@Injectable()
export class Service {

  selectedWeeklyOff: any = {};
  public holidaysList: Subject<any> = new BehaviorSubject<any>([]);
  constructor() { }


  /* ****** Generate due dates for daily frequency****** */
  generateDueDatesDaily(startDate: Date, endDate: Date, holidayList) {
    let dueDates = [];
    for (let sd = startDate; sd <= endDate; sd.setDate(sd.getDate() + 1)) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurenceDaily(startDate: Date, occurence, holidayList) {
    let count = 1;
    let sd = startDate;
    let dueDates = [];
    while (count <= occurence) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setDate(sd.getDate() + 1);
    }
    return dueDates;
  }

  /* ****** Generate due dates for weekly frequency****** */
  generateDueDatesWeekly(startDate: Date, endDate: Date, holidayList, week) {
    let dueDates = [];
    for (let sd = startDate; sd <= endDate; sd.setDate(sd.getDate() + 1)) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
        (week.findIndex((item) => item.checked === true && item.value.toUpperCase() === getDay(sd.getDay())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurenceWeekly(startDate: Date, occurence, holidayList, week) {
    let count = 1;
    let sd = startDate;
    let dueDates = [];
    while (count <= occurence) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
        (week.findIndex((item) => item.checked === true && item.value.toUpperCase() === getDay(sd.getDay())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setDate(sd.getDate() + 1);
    }
    return dueDates;
  }

  /* ****** Generate due dates for Monthly frequency****** */
  generateDueDatesMonthly(startDate: Date, endDate: Date, holidayList, month, day) {
    let dueDates = [];
    let requiredDate = new Date(startDate.getFullYear(), startDate.getMonth(), day);
    if (requiredDate < startDate) requiredDate.setMonth(requiredDate.getMonth() + 1);
    for (let sd = requiredDate; sd <= endDate; sd.setMonth(sd.getMonth() + 1)) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
        (month.findIndex((item) => item.checked === true && item.value === getMonth(sd.getMonth())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurenceMonthly(startDate: Date, occurence, holidayList, month, day) {
    let count = 1;
    let sd = new Date(startDate.getFullYear(), startDate.getMonth(), day);
    let dueDates = [];
    if (sd < startDate) sd.setMonth(sd.getMonth() + 1);
    while (count <= occurence) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
        (month.findIndex((item) => item.checked === true && item.value === getMonth(sd.getMonth())) !== -1) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        count++;
        dueDates.push(new Date(sd));
      }
      sd.setMonth(sd.getMonth() + 1);
    }
    return dueDates;
  }

/* ****** Generate due dates for Yearly frequency****** */
  generateDueDatesYearly(startDate: Date, endDate: Date, holidayList, month, day) {
    let dueDates = [];
    let requiredDate = new Date(startDate.getFullYear(), getMonthNumber(month), day);
    if(requiredDate < startDate) requiredDate.setFullYear(requiredDate.getFullYear() + 1);
    for (let sd = requiredDate; sd <= endDate; sd.setFullYear(sd.getFullYear() + 1)) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
        month == getMonth(sd.getMonth()) &&
        (holidayList.findIndex((value) => value.date.getDate() === sd.getDate() && value.date.getMonth() === sd.getMonth())) < 0) {
        dueDates.push(new Date(sd));
      }
    }
    return dueDates;
  }

  generateByOccurenceYearly(startDate: Date, occurence, holidayList, month, day) {
    let count = 1;
    let sd = new Date(startDate.getFullYear(), getMonthNumber(month), day);
    let dueDates = [];
    if(sd < startDate) sd.setFullYear(sd.getFullYear() + 1)
    while (count <= occurence) {
      if (!this.selectedWeeklyOff[getDay(sd.getDay())] &&
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
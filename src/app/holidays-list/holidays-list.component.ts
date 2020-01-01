import { Component, OnInit, isDevMode } from '@angular/core';
import { Service } from '../service/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { getDay } from '../utils/staticData_and_functions';
import * as _ from 'lodash';

@Component({
  selector: 'app-holidays-list',
  templateUrl: './holidays-list.component.html',
  styleUrls: ['./holidays-list.component.scss']
})
export class HolidaysListComponent implements OnInit {

  weekList = [
    { name: 'MONDAY', active: false },
    { name: 'TUESDAY', active: false },
    { name: 'WEDNESDAY', active: false },
    { name: 'THURSDAY', active: false },
    { name: 'FRIDAY', active: false },
    { name: 'SATURDAY', active: false },
    { name: 'SUNDAY', active: false },
  ];
  holidaysList = [];
  isModalVisible = false;
  holidayForm: FormGroup;

  constructor(
    public service: Service,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.weekList.forEach((element: any) => {
      if (element.name === 'SATURDAY' || element.name === 'SUNDAY') {
        this.service.selectedWeeklyOff[element.name] = true;
        element.active = true;
      }
    });
    this.service.holidaysList.subscribe((res: any) => {
      this.holidaysList = res;
      console.log(res)
    });
    this.initHolidayForm();
  }

  selectWeek(item) {
    let result = this.weekList.filter((el: any) => el.name === item.name)[0];
    result.active = !result.active;
    console.log(result);
    if (result.active) this.service.selectedWeeklyOff[result.name] = true;
    else delete this.service.selectedWeeklyOff[result.name];
  }

  openModal() {
    this.holidayForm.reset();
    this.isModalVisible = true;
  }

  initHolidayForm() {
    this.holidayForm = this.fb.group({
      holidayName: [null, Validators.required],
      date: [null, Validators.required],
      day: [null, Validators.required]
    })
  }

  onChange(date: Date) {
    console.log(date.getUTCDay(), getDay(date.getDay()));
    this.holidayForm.get('day').setValue(getDay(date.getDay()));
  }

  addHoliday() {
    let list = _.cloneDeep(this.holidaysList);
    list.push(this.holidayForm.value);
    this.service.holidaysList.next(list);
    this.isModalVisible = false;
    console.log(this.service.holidaysList)
  }

  handleCancel() {
    this.isModalVisible = false;
  }
}

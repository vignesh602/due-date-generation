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
      if (this.service.selectedWeeklyOff[element.name]) {
        element.active = true;
      }
    });
    this.service.holidaysList.subscribe((res: any) => {
      this.holidaysList = res;
    });
    this.initHolidayForm();
  }

  selectWeek(item) {
    let result = this.weekList.filter((el: any) => el.name === item.name)[0];
    result.active = !result.active;
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
    this.holidayForm.get('day').setValue(getDay(date.getDay()));
  }

  addHoliday() {
    let list = _.cloneDeep(this.holidaysList);
    list.push(this.holidayForm.value);
    this.service.holidaysList.next(list);
    this.isModalVisible = false;
  }

  handleCancel() {
    this.isModalVisible = false;
  }
}

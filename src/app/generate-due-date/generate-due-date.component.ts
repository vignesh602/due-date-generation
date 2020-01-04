import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Service } from '../service/service';

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

  constructor(
    public service: Service,
    public fb: FormBuilder
  ) { }

  ngOnInit() {
    this.createForms();
  }

  createForms() {
    this.dailyForm = this.fb.group({
      startDate : [null],
      endDateType: [null],
      endDate: [null],
      endAfter: [null],
      onGoing: [null]
    })
  }

  submitForm() {
    console.log(this.dailyForm.value);
    let formValue = this.dailyForm.value;
    if(formValue.endDateType === 'endDate') {
      
    } else if(formValue.endDateType === 'occurence') {

    } else {

    }
  }
}

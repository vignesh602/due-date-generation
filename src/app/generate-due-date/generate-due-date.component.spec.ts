import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GenerateDueDateComponent } from './generate-due-date.component';

describe('GenerateDueDateComponent', () => {
  let component: GenerateDueDateComponent;
  let fixture: ComponentFixture<GenerateDueDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GenerateDueDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GenerateDueDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

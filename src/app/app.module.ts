import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

/** config angular i18n **/
import { NgZorroAntdModule, NZ_I18N, en_US } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';
import { HolidaysListComponent } from './holidays-list/holidays-list.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Service } from './service/service';
import { GenerateDueDateComponent } from './generate-due-date/generate-due-date.component';
import { WeeklyComponent } from './generate-due-date/weekly/weekly.component';
import { MonthlyComponent } from './generate-due-date/monthly/monthly.component';
import { YearlyComponent } from './generate-due-date/yearly/yearly.component';
registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    HolidaysListComponent,
    DashboardComponent,
    GenerateDueDateComponent,
    WeeklyComponent,
    MonthlyComponent,
    YearlyComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: NZ_I18N, useValue: en_US },
    Service
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

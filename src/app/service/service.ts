import { Injectable } from "@angular/core";
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable()
export class Service {

  selectedWeeklyOff: any = {};
  public holidaysList: Subject<any> = new BehaviorSubject<any>([]);
  constructor() {}


}
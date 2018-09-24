import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { AboutService } from '../pages/about/about.service';
@Injectable()
export class CommonService {

  private logHistory_: string[] = [];
  // Observable boolean sources
  private httpEvent = new Subject<boolean>();
  public getDigitalTime: string = new Date().toISOString();

  // Observable boolean streams
  httpEventRunning$ = this.httpEvent.asObservable();

  tabChanged = new Subject<any>();
  tabChangeEvent = this.tabChanged.asObservable();

  // Service message commands
  emitHttpEvent(mission: boolean) {
    this.httpEvent.next(mission);
  }

  tabChange(indexNumber: number) {
    switch (indexNumber) {
      case 0:

        break;
      case 1:
        // About tab / Download tab
        this.aboutService.readFiles();
        break;
      case 2:
        break;

      default:
        break;
    }
  }

  constructor(private sanitizer: DomSanitizer, private aboutService: AboutService) {
    setInterval(() => {
      this.startTimer();
    });
  }
  /*
   ** Add the log of application http and other process to logHistory_
   * */
  log(message: any) {
    this.logHistory_.push(`${new Date().toISOString()}: ${message}`);
  }

  /*
   ** Return the log of application http and other process added in log history
   * */
  getLog(): string[] {
    return this.logHistory_;
  }

  getDateFromId(_id: any): Date {

    const timestamp = _id.toString().substring(0, 8);

    return new Date(parseInt(timestamp, 16) * 1000);
  }
  /**
   * Use to start timer, just subscribe to getDigitalTime to get frequent time updates.
   */
  private startTimer() {
    this.getDigitalTime = moment().format('LTS');
  }

  public sanitizeUrl(data: any, type?: string): any {
    return data ? this.sanitizer.bypassSecurityTrustUrl(data) : '';
    
  }

  public ObjectToString(obj: object) {
    return Object.keys(obj).map((value, index, array) => {
      return `${value}=${obj[value]}`;
    }).join('&');
  }

  public getBase64Data(data): Promise<any> {
    return new Promise((resolve, reject) => {
      if (data.target) {
        const file = new FileReader();
        file.onload = (event: any) => {
          resolve(event['target']['result']);
        };
        file.readAsDataURL(data.target.files[0]);
      } else {
        reject(null);
      }
    });
  }
}
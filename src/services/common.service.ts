import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';
import * as moment from 'moment';
import { DomSanitizer } from '@angular/platform-browser';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';

import { ToastService } from '../services/toast.service';
import { DownloadService } from '../pages/download/download.service';
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
        break;
      case 2:
        // About tab / Download tab
        this.downloadService.readFiles();
        break;

      default:
        break;
    }
  }

  constructor(private sanitizer: DomSanitizer, private downloadService: DownloadService,
    private fileTransfer: FileTransfer, private filePath: FilePath, private file: File,
    private toast: ToastService) {
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

  savePhoto(imageUrl: string, postFix: string) {
    return new Promise((resolve, reject) => {
      const imageFile = this.fileTransfer.create();
      const imageFileName = imageUrl.substring(imageUrl.indexOf('com/') + 4, imageUrl.indexOf('?')) + `_${postFix}_.jpg`;
      const imageFilePath = this.file.externalDataDirectory + '/Downloads/' + imageFileName;


      imageFile.download(imageUrl, imageFilePath).then((done) => {
        this.toast.displayMsg(`File: ${imageFileName} saved to ${imageFilePath} folder`);
        resolve();
      }).catch((err) => {
        this.toast.displayMsg(`Got some error.`);
        reject(err);
      });
    });
  }
}
import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpCallService } from '../../http-services/http-call.service';
import { PhotoOrderBy, SwitchCase } from '../../models/PhotosParams';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { ToastService } from '../../services/toast.service';
import { PermissionsService } from '../../services/permissions.service';
import { HomeService } from './home.service';
import { Content } from 'ionic-angular';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, AfterViewInit {
  pageTitle = 'splashun';
  latest = PhotoOrderBy;
  photosList = [];

  pageNumber = 1;

  searchTerm = '';

  @ViewChild(Content) content: Content;


  constructor(public navCtrl: NavController, private http: HttpCallService,
    private fileTransfer: FileTransfer, private filePath: FilePath, private file: File,
    private toast: ToastService, private permissionService: PermissionsService, private homeService: HomeService) {

  }

  ngOnInit() {
  }
  ngAfterViewInit() {
    //
    this.content.ionScrollEnd.subscribe((data) => {
      console.log(data);
    })
  }

  private getAccess() {
    let meReturn = this.permissionService.checkPersmission().then((ok) => {
      this.toast.displayMsg(ok);
      return ok;
    }).catch((err) => {
      this.toast.displayMsg(err);
      console.log(err);
      return err;
    });
    return meReturn;
  }

  getPhotos() {
    this.http.getPhotoList({
      order_by: this.latest.Latest,
      per_page: 10,
      page: 1
    }).subscribe(
      (data) => {
        if (data['body']) {
          this.photosList = data['body'];
          console.log(this.photosList)
        }
      }, (err) => {
        console.log(err);
      });
  }

  savePhoto(imageUrl: string, postFix: string) {
    const imageFile = this.fileTransfer.create();
    const imageFileName = imageUrl.substring(imageUrl.indexOf('com/') + 4, imageUrl.indexOf('?')) + `_${postFix}_.jpg`;
    const imageFilePath = this.file.externalDataDirectory + '/Downloads/' + imageFileName;


    imageFile.download(imageUrl, imageFilePath).then((done) => {
      this.toast.displayMsg(`File: ${imageFileName} saved to ${imageFilePath} folder`);
    }).catch((err) => {
      this.toast.displayMsg(`Got some error.`);
      console.log(err);
    });

  }
}
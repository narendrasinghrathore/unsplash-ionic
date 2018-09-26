import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { HttpCallService } from '../../http-services/http-call.service';
import { PhotoOrderBy, SwitchCase } from '../../models/PhotosParams';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { ToastService } from '../../services/toast.service';
import { PermissionsService } from '../../services/permissions.service';
import { HomeService } from './home.service';
import { Content } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage implements OnInit, OnDestroy {
 
  @ViewChild(Content) content: Content;
  pageTitle = 'splashun';
  latest = PhotoOrderBy;
  photosList = [];

  initEvent : Subscription;



  pageNumber = 1;

  searchTerm = '';


  constructor(public navCtrl: NavController, private http: HttpCallService,
    private fileTransfer: FileTransfer, private filePath: FilePath, private file: File,
    private toast: ToastService, private permissionService: PermissionsService, private homeService: HomeService) {

    // this.initEvent = this.homeService.componentInitEvent.subscribe(() => {
    //   this.scrollToTop();
    // });

  }

  scrollToTop() {
    this.content.scrollToTop();
  }

  ngOnInit() {
    this.getPhotos();
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
        }
      }, (err) => {
        console.log(err);
      });
  }

  savePhoto(imageUrl: string, postFix: string, fab: FabContainer) {
    fab.close();
    this.homeService.saveFile(imageUrl, postFix);
  }

  closeFab(fab: FabContainer) {
    this.homeService.showInfo(`Blur event on Fab called.`);
  }


  ngOnDestroy(): void {
    this.initEvent.unsubscribe();
  }
}
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NavController, FabContainer } from 'ionic-angular';
import { HttpCallService } from '../../http-services/http-call.service';
import { PhotoOrderBy } from '../../models/PhotosParams';
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
  orderByEnum = PhotoOrderBy
  photosList = [];

  initEvent: Subscription;



  pageNumber = 1;

  searchTerm = '';

  orderByOptions = [];

  selectedOption: PhotoOrderBy;
  selectOptions: any;

  constructor(public navCtrl: NavController, private http: HttpCallService,
    private fileTransfer: FileTransfer, private filePath: FilePath, private file: File,
    private toast: ToastService, private permissionService: PermissionsService, private homeService: HomeService) {

    this.orderByOptions.push(this.orderByEnum.Latest);
    this.orderByOptions.push(this.orderByEnum.Oldest);
    this.orderByOptions.push(this.orderByEnum.Popular);
    this.selectedOption = this.orderByEnum.Latest;

    this.selectOptions = {
      title: 'Order By'
    };
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

  getPhotos(pageNumber: number = 1, callback?: any) {
    this.http.getPhotoList({
      order_by: this.selectedOption,
      per_page: 10,
      page: pageNumber
    }).subscribe(
      (data) => {
        if (data['type'] === 4) {
          let list = data['body'];
          if (pageNumber === 1) {
            this.photosList = list;
          }
          if (pageNumber > 1) {
            callback ? callback(list) : null;
          }
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

  doInfinite(event) {
    this.pageNumber++;
    this.getPhotos(this.pageNumber, (list) => {
      event.complete();
      this.photosList.push(...list);
    });

  }


  ngOnDestroy(): void {
    this.initEvent.unsubscribe();
  }

  onOrderBy(value: any) {
    this.selectedOption = value;
    this.photosList = [];
    this.getPhotos(1);
  }
}
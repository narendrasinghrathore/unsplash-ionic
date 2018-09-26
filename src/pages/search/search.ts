import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpCallService } from '../../http-services/http-call.service';
import { PhotoOrderBy, SwitchCase } from '../../models/PhotosParams';
import { GetPhotos } from '../../models/GetPhotos';
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { ToastService } from '../../services/toast.service';
import { PermissionsService } from '../../services/permissions.service';
import { SearchService } from './search.service';
import { SearchPhotos } from '../../models/SearchPhotos';
import { Content } from 'ionic-angular';
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {
  pageTitle = 'splashun';
  searchList = [];

  pageNumber = 1;

  searchTerm = '';

  @ViewChild(Content) content: Content;


  constructor(public navCtrl: NavController, private http: HttpCallService,
    private toast: ToastService, private permissionService: PermissionsService, private searchService: SearchService) {

  }

  savePhoto(imageUrl: string, postFix: string) {
    this.searchService.saveFile(imageUrl, postFix);
  }

  searchImage(pageNumber: number = 1, callback?: any) {
    console.log('pageNumber', pageNumber);
    let term = 'Abstract';
    term = this.searchTerm.length > 0 ? this.searchTerm : term;

    this.searchService.searchImages({
      page: pageNumber,
      per_page: 5,
      query: term
    }).subscribe((data) => {
      if (data['type'] === 4) {

        let list = data['body']['results'];
        if (pageNumber > 1) {
          callback ? callback(list) : null;
        }
        if (pageNumber === 1) {
          this.searchList = list;
        }
      }
    });
  }

  clearText() {
  }

  clearResult() {
    this.searchList = [];
    this.searchTerm = '';
    this.pageNumber = 1;
  }

  doInfinite(event) {
    this.pageNumber++;
    this.searchImage(this.pageNumber, (list) => {
      event.complete();
      this.searchList.push(...list);
      console.log('Event complete: ', this.searchList);
    });

  }
}
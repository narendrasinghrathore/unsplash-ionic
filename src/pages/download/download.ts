import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Entry } from '@ionic-native/file';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { DownloadService } from './download.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastService } from '../../services/toast.service';
import { ItemSliding } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { File } from '@ionic-native/file';
@Component({
  selector: 'page-download',
  templateUrl: 'download.html'
})
export class DownloadPage implements OnDestroy {
  getFiles$: Subscription;
  totalItemsCount = 0;

  ngOnDestroy(): void {
    this.getFiles$.unsubscribe();
  }

  list: Entry[];

  constructor(public navCtrl: NavController, private photoViewer: PhotoViewer,
    private downloadService: DownloadService, private toast: ToastService, private commonService: CommonService,
    private file: File) {
    this.getFiles$ = this.downloadService.readFileEvent.subscribe((data) => {
      let tempData = data.reverse();
      this.list = tempData;
      this.totalItemsCount = this.list.length;
    });
  }
  showImage(item: Entry) {
    console.log(item);
    this.photoViewer.show(item.nativeURL, item.name, { share: true });
  }

  deleteItem(item: Entry, index: number, slider: ItemSliding) {
    this.toast
      .confirmAction(`Delete ${item.name}`, `Confirm Delete`, ['Yes', 'No'])
      .then((ok) => {
        if (ok == 1) {
          this.downloadService.deleteFile(item, (ok) => {
            this.toast.displayMsg(`File deleted.`);

          }, (err) => {
            this.toast.displayMsg(`Unable to find file, please restart app.`);
          });
        }
      }, (cancel) => {
      });
    slider.close();

  }

}

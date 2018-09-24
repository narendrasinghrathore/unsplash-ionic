import { Component, OnDestroy } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Entry } from '@ionic-native/file';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AboutService } from './about.service';
import { Subscription } from 'rxjs/Subscription';
import { ToastService } from '../../services/toast.service';
import { ItemSliding } from 'ionic-angular';
import { CommonService } from '../../services/common.service';
import { File } from '@ionic-native/file';
@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage implements OnDestroy {
  getFiles$: Subscription;
  totalItemsCount = 0;

  ngOnDestroy(): void {
    this.getFiles$.unsubscribe();
  }

  list: Entry[];

  constructor(public navCtrl: NavController, private photoViewer: PhotoViewer,
    private aboutService: AboutService, private toast: ToastService, private commonService: CommonService,
    private file: File) {
    this.getFiles$ = this.aboutService.readFileEvent.subscribe((data) => {
      let tempData = data.reverse();
      // tempData.map((item) => {
      //   item['dataURL'] = this.commonService.sanitizeUrl(
      //     this.file.resolveLocalFilesystemUrl(item.nativeURL).then((fl) => {
      //       return fl.toInternalURL();
      //     })
      //   );
      //   console.log(item['dataURL']);
      // });
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
          this.aboutService.deleteFile(item, (ok) => {
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

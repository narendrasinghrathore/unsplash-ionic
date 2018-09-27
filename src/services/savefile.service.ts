import { Injectable } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { ToastService } from '../services/toast.service';
import { AnimationLoaderService } from './animation-loader.service';
@Injectable()
export class SaveFileService {
    constructor(private fileTransfer: FileTransfer, private file: File,
        private toast: ToastService, private loadingCtrl: AnimationLoaderService) {
    }
    savePhoto(imageUrl: string, postFix: string) {
        this.loadingCtrl.spin(`<div class="spinner">  
        <div class="double-bounce1"></div>
        <div class="double-bounce2"></div>
      </div>`);
        return new Promise((resolve, reject) => {
            const imageFile = this.fileTransfer.create();
            const imageFileName = imageUrl.substring(imageUrl.indexOf('com/') + 4, imageUrl.indexOf('?')) + `_${postFix}_.jpg`;
            const imageFilePath = this.file.externalDataDirectory + '/Downloads/' + imageFileName;


            imageFile.download(imageUrl, imageFilePath).then(() => {
                this.toast.displayMsg(`File: ${imageFileName} saved to ${imageFilePath} folder`);
                this.loadingCtrl.stop();
                resolve();
            }).catch((err) => {
                this.toast.displayMsg(`Got some error.`);
                this.loadingCtrl.stop();
                reject(err);
            });
        });
    }
}
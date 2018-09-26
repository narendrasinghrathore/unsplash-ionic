import { Injectable } from '@angular/core';
import { FileTransfer } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';

import { ToastService } from '../services/toast.service';
@Injectable()
export class SaveFileService {
    constructor(private fileTransfer: FileTransfer, private file: File,
        private toast: ToastService) {
    }
    savePhoto(imageUrl: string, postFix: string) {
        return new Promise((resolve, reject) => {
            const imageFile = this.fileTransfer.create();
            const imageFileName = imageUrl.substring(imageUrl.indexOf('com/') + 4, imageUrl.indexOf('?')) + `_${postFix}_.jpg`;
            const imageFilePath = this.file.externalDataDirectory + '/Downloads/' + imageFileName;


            imageFile.download(imageUrl, imageFilePath).then(() => {
                this.toast.displayMsg(`File: ${imageFileName} saved to ${imageFilePath} folder`);
                resolve();
            }).catch((err) => {
                this.toast.displayMsg(`Got some error.`);
                reject(err);
            });
        });
    }
}
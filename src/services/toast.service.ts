import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';
import { Dialogs } from '@ionic-native/dialogs';
@Injectable()
export class ToastService {
    constructor(private toastCtrl: ToastController, private dialog: Dialogs) {

    }

    displayMsg(msg: string) {
        let toast = this.toastCtrl.create({
            message: msg,
            duration: 3000,
            position: 'bottom'
        });

        toast.onDidDismiss(() => {
            console.log('Dismissed toast');
        });

        toast.present();
    }

    confirmAction(message: string, title: string, buttonLabels: string[]) {
        return this.dialog.confirm(
            message,
            title,
            buttonLabels
        );
    }

}
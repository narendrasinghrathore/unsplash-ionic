import { Injectable } from "@angular/core";
// import { AndroidPermissions } from "@ionic-native/android-permissions";
import { Diagnostic } from '@ionic-native/diagnostic';

@Injectable()
export class PermissionsService {
    /**
     *
     */
    constructor(private diag: Diagnostic) {
        // , private androidPermissions: AndroidPermissions
    }

    checkPersmission(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.diag.getExternalStorageAuthorizationStatus()
                .then(
                    (yes) => {
                        resolve(yes);
                    },
                    (no) => {
                        reject(no);
                    }

                ).catch((err) => {
                    reject(err);
                });
        });
    }

    requestPermission(): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            this.diag.requestExternalStorageAuthorization()
                .then(
                    (yes) => {
                        console.log('Permission granted ', yes);
                        // this.androidPermissions
                        //     .requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
                        //     .then(result => {
                        //         if (result.hasPermission) {
                        //             console.log('Android permission  ', result);
                        //             resolve(result);
                        //         }
                        //     }).catch((err) => {
                        //         console.log('Android permission error: ', err);
                        //         reject(err);
                        //     });
                        resolve(yes);
                    }, (no) => {
                        console.log('Permission reason ', no);
                        reject(no);
                    }).catch((err) => {
                        console.log('Permission error ', err);
                        reject(err);
                    });
        });
    }
}
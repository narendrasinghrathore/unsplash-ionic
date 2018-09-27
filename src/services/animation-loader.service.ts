import { Injectable } from '@angular/core';
import { LoadingController, Loading } from 'ionic-angular';
import { IfObservable } from 'rxjs/observable/IfObservable';
@Injectable()
export class AnimationLoaderService {
    /**
     *
     */
    loader: Loading;
    constructor(private loaderCtrl: LoadingController) {


    }

    spin(content?: string) {
        if (content === undefined) {
            content = `<img src="../assets/imgs/loader.gif" width="50" />`;
        }
        this.loader = this.loaderCtrl.create({
            content,
            spinner: 'hide'
        });
        this.loader.present();
    }

    stop(){
        this.loader.dismissAll();
    }



}
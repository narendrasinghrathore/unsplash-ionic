import { NgModule, ErrorHandler, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import {AuthInterceptor} from '../auth/auth-interceptor.service';


import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { AboutPage } from '../pages/about/about';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { CommonService } from '../services/common.service';
import { HttpCustomService } from '../http-services/http.service';
import { AuthenticationService } from '../auth/auth.service';
import { HttpCallService } from '../http-services/http-call.service';
import { Environment } from '../services/constant.service';


/**
 * Ionic cordova plugin import
 */
import { FileTransfer } from '@ionic-native/file-transfer';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { ToastService } from '../services/toast.service';

import { Diagnostic } from '@ionic-native/diagnostic';
import { PermissionsService } from '../services/permissions.service';
import { PhotoViewer } from '@ionic-native/photo-viewer';
import { AboutService } from '../pages/about/about.service';
import { Dialogs } from '@ionic-native/dialogs';

@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    ContactPage,
    HomePage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    Environment,
    AuthenticationService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },    
    CommonService,
    HttpCustomService,
    HttpCallService,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    ToastService,
    AboutService,
    FilePath,
    FileTransfer,
    File,
    Diagnostic,
    PermissionsService,
    PhotoViewer,
    Dialogs
  ]
})
export class AppModule {}

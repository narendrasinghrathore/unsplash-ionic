import { NgModule, ErrorHandler, forwardRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { HttpClientModule } from '@angular/common/http';

import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../auth/auth-interceptor.service';


import { IonicApp, IonicModule, IonicErrorHandler, Content } from 'ionic-angular';
import { MyApp } from './app.component';

import { DownloadPage } from '../pages/download/download';
import { ContactPage } from '../pages/contact/contact';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { SearchPage } from '../pages/search/search';

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
import { DownloadService } from '../pages/download/download.service';
import { Dialogs } from '@ionic-native/dialogs';
import { HomeService } from '../pages/home/home.service';
import { SearchService } from '../pages/search/search.service';

@NgModule({
  declarations: [
    MyApp,
    DownloadPage,
    ContactPage,
    HomePage,
    TabsPage,
    SearchPage
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
    DownloadPage,
    ContactPage,
    HomePage,
    SearchPage,
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
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    ToastService,
    DownloadService,
    FilePath,
    FileTransfer,
    File,
    Diagnostic,
    PermissionsService,
    PhotoViewer,
    Dialogs,
    HomeService,
    Content,
    SearchService
  ]
})
export class AppModule { }

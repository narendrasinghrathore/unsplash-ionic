import { Injectable } from '@angular/core';
import { HttpCallService } from '../../http-services/http-call.service';
import { SearchPhotos } from '../../models/SearchPhotos';
import { Observable } from 'rxjs/Observable';
import { SearchParam } from '../../models/SearchParams';
import { ToastService } from '../../services/toast.service';
import { SaveFileService } from '../../services/savefile.service';
import { Subject } from 'rxjs/Subject';
@Injectable()
export class HomeService {

    componentInit$ = new Subject<any>();

    componentInitEvent = this.componentInit$.asObservable();
    /**
     *
     */
    constructor(private http: HttpCallService,
        private toast: ToastService, private saveFileService: SaveFileService) {


    }

    tabEvent(){
        this.componentInit$.next();
    }

    searchImages(term: SearchParam): Observable<SearchPhotos> {
        return this.http.searchPhotos(term);
    }

    saveFile(imageUrl: string, postFix: string) {
        this.saveFileService.savePhoto(imageUrl, postFix);
    }

    showInfo(msg: string){
        this.toast.displayMsg(msg);
    }

}
import { Injectable } from '@angular/core';
import { HttpCallService } from '../../http-services/http-call.service';
import { SearchPhotos } from '../../models/SearchPhotos';
import { Observable } from 'rxjs/Observable';
import { SearchParam } from '../../models/SearchParams';
import { CommonService } from '../../services/common.service';
@Injectable()
export class SearchService {
    /**
     *
     */
    constructor(private http: HttpCallService, private commonService: CommonService) {


    }

    searchImages(term: SearchParam): Observable<SearchPhotos> {
        return this.http.searchPhotos(term);
    }

    saveFile(imageUrl: string, postFix: string) {
        this.commonService.savePhoto(imageUrl, postFix);
    }

}
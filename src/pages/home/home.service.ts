import { Injectable } from '@angular/core';
import { HttpCallService } from '../../http-services/http-call.service';
import { SearchPhotos } from '../../models/SearchPhotos';
import { Observable } from 'rxjs/Observable';
import { SearchParam } from '../../models/SearchParams';
@Injectable()
export class HomeService {
    /**
     *
     */
    constructor(private http: HttpCallService) {


    }

    searchImages(term: SearchParam): Observable<SearchPhotos> {
        return this.http.searchPhotos(term);
    }

}
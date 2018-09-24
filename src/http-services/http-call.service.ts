import { Injectable, OnInit } from '@angular/core';
import { HttpCustomService } from '../http-services/http.service';
import { Environment } from '../services/constant.service';
import { Observable } from 'rxjs/Observable';
import { GetPhotos } from '../models/GetPhotos';
import { SearchPhotos } from '../models/SearchPhotos';
import { CommonService } from '../services/common.service';
import { PhotosParam } from '../models/PhotosParams';
import { of } from 'rxjs/observable/of';
@Injectable()
export class HttpCallService implements OnInit {
    basePhotoUrl: string;
    randomPhotos: string;
    photoSearch: string;



    constructor(private httpService: HttpCustomService, private commonService: CommonService, private env: Environment) {
        this.buildUrl();

    }

    ngOnInit(): void {

    }
    /**
     * Build url's
     */
    buildUrl() {
        this.basePhotoUrl = this.env.unsplashApi['url'];
        this.randomPhotos = this.basePhotoUrl + 'photos?';
        this.photoSearch = this.basePhotoUrl + 'search/photos?';
    }



    /**
     * Return list of photos of type GetPhotos ../models/GetPhotos
     * @param data '?page=1&per_page=20&order_by=popular'
     */
    getPhotoList(data: PhotosParam): Observable<GetPhotos> {
        let url = this.randomPhotos;
        console.log(this.randomPhotos, this.photoSearch)
        if (data) {
            url += this.commonService.ObjectToString(data);
        }
        console.log(url);
        // return of();
        return this.httpService.http({
            method: 'GET',
            url
        });
    }

    /**
     * query	Search terms.
     * page	Page number to retrieve. (Optional; default: 1)
     * per_page	Number of items per page. (Optional; default: 10)
     * collections	Collection ID(‘s) to narrow search. If multiple, comma-separated.
     * orientation	Filter search results by photo orientation. Valid values are landscape, portrait, and squarish
     * * @param term '?page=1&query=office&per_page=20'
     */
    searchPhotos(term: SearchPhotos): Observable<SearchPhotos> {
        let url = this.photoSearch;
        if (term) {
            url += this.commonService.ObjectToString(term);
        }
        return this.httpService.http({
            method: 'GET',
            url
        });
    }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { catchError, tap, finalize } from 'rxjs/operators';
// import { of } from 'rxjs/observable/of';
// import { CommonService } from '../services/common.service';  
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { HttpErrorResponse } from '@angular/common/http';
import { AnimationLoaderService } from '../services/animation-loader.service'
@Injectable()
export class HttpCustomService {

  constructor(private httpClient: HttpClient, public loadingCtrl: AnimationLoaderService) {

  }

  http(config: any): Observable<any> {
    this.loadingCtrl.spin();
    const req = new HttpRequest(config.method, config.url, config.body);
    return this.httpClient.request(req).pipe(
      tap(data => { }),
      catchError((err) => this.handleError(err)),
      finalize(() => {
        this.loadingCtrl.stop();
      })
    );
  }
  httpFileUpload(req: any): Observable<any> {
    return this.httpClient.request(req).pipe(
      tap(data => { }),
      catchError((err) => this.handleError(err))
    );
  }
  public log(message: string) {
    // this.commonService.log('HttpService log: ' + message);
  }
  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  // private handleError<T> (operation = 'operation', result?: T) {
  //   return (error: any): Observable<T> => {
  //
  //     // TODO: send the error to remote logging infrastructure
  //     console.error(error); // log to console instead
  //
  //     // TODO: better job of transforming error for user consumption
  //     this.log(`${operation} failed: ${error.message}`);
  //
  //     // Let the app keep running by returning an empty result.
  //     return of(result as T);
  //   };
  // }

  private handleError(error: HttpErrorResponse) {

    if (error.status === 401) {

    }
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      // console.error('An error occurred:', error.error.message);
      // this.log(`Url: ${error.url}, ${error.error.message}`);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      // this.log(`Url: ${error.url}, ${error.error.message}`);
    }

    // return an ErrorObservable with a user-facing error message
    return new ErrorObservable(error.error.message);
  }
}

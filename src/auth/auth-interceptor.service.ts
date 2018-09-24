import {Injectable} from '@angular/core';
import {HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/do';
import {AuthenticationService} from './auth.service';
/*Notice the RxJS do() operator—it adds a side effect to an Observable without affecting the values on the stream. Here, it detects the HttpResponse event and logs the time the request took.*/
@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  // private common:any;

  constructor(private authService:AuthenticationService) {
    // this.common = commonService;
  }

  intercept(req:HttpRequest<any>, next:HttpHandler):Observable<HttpEvent<any>> {
    // this.common.emitHttpEvent(true);
    const started = Date.now();
    const loginUrl = req.url.indexOf('login');
    let authReq = req.clone();

    let httpOptions = {
      headers: new HttpHeaders({
        'X-Requested-By': "WEB edYvC5uE2CU8baIlSm+gL9Xu3xY",
        'X-Requested-For':"user"
      })
    };
    // Get the auth header from the service.
    const authHeader = this.authService.getAuthorizationHeader();
    if (loginUrl === -1) {
      // Clone the request to add the new header.
      httpOptions = {
        headers: new HttpHeaders({
          'Accept-Version': 'v1',
          'Authorization': authHeader
        })
      };
    }
    authReq = req.clone(httpOptions);

    // Pass on the cloned request instead of the original request.
    return next.handle(authReq).do(event => {
      if (event instanceof HttpResponse) {
        const elapsed = Date.now() - started;
        // this.common.emitHttpEvent(false);
        // this.common.log(`Request success for ${req.urlWithParams} took ${elapsed} ms.`);
      }
    }, (error) => {
      // this.common.emitHttpEvent(false);
      const elapsed = Date.now() - started;
      // this.common.log(`Request success for ${req.urlWithParams} took ${elapsed} ms.`);

    }, () => {
      //complete
    });
  }
}

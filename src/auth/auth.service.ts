import { Injectable } from '@angular/core';
import {Environment} from '../services/constant.service';
/** The @Injectable() decorator tells Angular that this service might itself have injected dependencies. It doesn't have dependencies
 ** now but it will soon. Whether it does or it doesn't, it's good practice to keep the decorator.
 **/
@Injectable()
export class AuthenticationService {

  constructor(private env: Environment) { }

  getAuthorizationHeader(): string {

    return 'Client-ID ' + this.env.unsplashApi['accessKey'];

  }
}

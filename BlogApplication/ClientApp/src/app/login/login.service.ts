import { HttpClient } from '@angular/common/http';
import { ControllerService } from './../services/controller.service';
import { Injectable } from '@angular/core';
import { Login } from '../models';

@Injectable()
export class LoginService extends ControllerService {
  constructor(http: HttpClient) {
    super('Authentication', http);
  }

  authentication(login: Login) {
    return this.post('', login);
  }
}

import {Injectable} from '@angular/core';

@Injectable()
export class AuthService {

  private credentials = {
    login: 'admin',
    password: 'admin'
  };
  private isUserLoggedIn = false;

// fake login
  login(login, password) {
    return new Promise((resolve, reject) => {
      if (login === this.credentials.login && password === this.credentials.password) {
        this.isUserLoggedIn = true;
        resolve();
      } else {
        reject();
      }
    });
  }


  isLoggedIn() {
    return this.isUserLoggedIn;
  }

}

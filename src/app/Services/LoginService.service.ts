import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  auth: any;
  constructor(private authService: AngularFireAuth) {}

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password).then(
        (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }

  signUpUser(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password)
      .then( (data) => resolve(data),
        (error) => reject(error)
      );
    });
  }
  
  getUserAuth() {
    return this.authService.authState.pipe(map((auth) => auth));
  }
  logOut(){
    this.authService.signOut()
  }
}

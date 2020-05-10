import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/app/Services/LoginService.service';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  email: string;
  password: string;

  constructor(
    private router: Router,
    private loginService: LoginService,
    private flashMessages: FlashMessagesService
  ) {}

  ngOnInit() {
    this.loginService.getUserAuth().subscribe((auth) => {
      if (auth) {
        this.router.navigate(['/']);
      }
    });
  }
  signUp() {
    this.loginService
      .signUpUser(this.email, this.password)
      .then((response) => {
        this.router.navigate(['/']);
      })
      .catch((error) => {
        this.flashMessages.show(error.message, {
          cssClass: 'alert-danger',
          timeout: 4000,
        });
      });
  }
}

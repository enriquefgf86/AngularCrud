import { Component, OnInit } from '@angular/core';
import { LoginService } from 'src/app/Services/LoginService.service';
import { Router } from '@angular/router';
import { ConfigurationService } from 'src/app/Services/ConfigurationServices.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  isLoggedIn: boolean;
  loggedUser: string;
  allowRegister: boolean;

  constructor(
    private loginService: LoginService,
    private router: Router,
    private configurationService: ConfigurationService
  ) {}

  ngOnInit() {
    this.loginService.getUserAuth().subscribe((auth) => {
      if (auth) {
        this.isLoggedIn = true;
        this.loggedUser = auth.email;
      } else {
        this.isLoggedIn = false;
      }
    });

    this.configurationService.getConfiguration().subscribe((configuration) => {
      this.allowRegister = configuration.allowRegister;
    });
  }

  logOut() {
    this.loginService.logOut();
    this.isLoggedIn = false;
    this.router.navigate(['/login']);
  }
}

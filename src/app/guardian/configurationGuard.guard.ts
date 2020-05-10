import { CanActivate, Router } from '@angular/router';
import { ConfigurationService } from '../Services/ConfigurationServices.service';
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class ConfigurationGuard implements CanActivate {
  constructor(
    private router: Router,
    private afAuth: AngularFireAuth,
    private configurationService: ConfigurationService
  ) {}

  canActivate(): Observable<boolean> {
    return this.configurationService.getConfiguration().pipe(
      map((configuration) => {
        if (configuration.allowRegister) {
          return true;
        } else {
          this.router.navigate(['/']);
          return false;
        }
      })
    );
  }
}

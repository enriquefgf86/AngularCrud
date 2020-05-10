import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ClientsComponent } from './components/clients/clients.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { TableroComponent } from './components/tablero/tablero.component';
import { EndPageComponent } from './components/end-page/end-page.component';

import { environment } from '../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { FlashMessagesModule } from 'angular2-flash-messages';
import { FormsModule } from '@angular/forms';
import { ClientService } from './Services/clientServices.service';
import { LoginService } from './Services/LoginService.service';
import { AuthGuardian } from './guardian/auth.guard';
import { ConfigurationService } from './Services/ConfigurationServices.service';
import { ConfigurationGuard } from './guardian/configurationGuard.guard';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ClientsComponent,
    ConfigurationComponent,
    EditClientComponent,
    LoginComponent,
    SignupComponent,
    NotFoundComponent,
    TableroComponent,
    EndPageComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firestore, 'ControlClients'),
    AngularFirestoreModule,
    FormsModule,
    AngularFireAuthModule,
    FlashMessagesModule.forRoot(),
  ],
  providers: [ClientService,
              LoginService,
              AuthGuardian,
               ConfigurationService,
               ConfigurationGuard,
              // {provide: FirestoreSettingsToken,useValue:{}}
              ],
  bootstrap: [AppComponent],
})
export class AppModule {}

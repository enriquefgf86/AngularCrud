import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TableroComponent } from './components/tablero/tablero.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { ConfigurationComponent } from './components/configuration/configuration.component';
import { EditClientComponent } from './components/edit-client/edit-client.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuardian } from './guardian/auth.guard';
import { ConfigurationGuard } from './guardian/configurationGuard.guard';

const routes: Routes = [
  { path: '', component: TableroComponent, canActivate: [AuthGuardian] },
  { path: 'login', component: LoginComponent },
  {
    path: 'signup',
    component: SignupComponent,
    canActivate: [ConfigurationGuard],
  },
  {
    path: 'configuration',
    component: ConfigurationComponent,
    canActivate: [AuthGuardian],
  },
  {
    path: 'edit/client/:id',
    component: EditClientComponent,
    canActivate: [AuthGuardian],
  },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { ForgetPasswordComponent } from './forget-password/forget-password.component';
// import { LoginComponent } from './login/login.component';
// import { GoogleAuthenticatorComponent } from 'src/app/google-authenticator/google-authenticator.component';

const routes: Routes = [
// { path: 'login', component: LoginComponent },
  //{ path: 'forget-password', component: ForgetPasswordComponent },
  { path: 'areas', loadChildren: () => import('./areas/areas.module').then(m => m.AreasModule), pathMatch: "prefix" },
  { path: '', redirectTo: "login", pathMatch: "full" },
  { path: '', redirectTo: 'areas', pathMatch: 'full' }, 
  { path: '**', redirectTo: 'areas' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

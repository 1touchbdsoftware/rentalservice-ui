import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { PrimaryHeaderComponent } from './primary-layout/primary-header.component';
import { FreeTrialComponent } from './free-trial/free-trial.component';
import { BuyNowComponent } from './buy-now/buy-now.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'primary-header', component: PrimaryHeaderComponent },
  { path: 'free-trial', component: FreeTrialComponent },
  { path: 'buy-now', component: BuyNowComponent },
  
  { path: '', redirectTo: 'primary-header', pathMatch: 'full' },
  { path: '', component: PrimaryHeaderComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
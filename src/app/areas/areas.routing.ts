import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../shared/services/auth.guard';
import { AreasComponent } from './areas.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';


const routes: Routes = [
  {
    path: '',
    component: AreasComponent,
    children: [
      { path: '', redirectTo: "dashboard", pathMatch: "full" },
      // { path: 'common-dashboard', component: CommonDashboardComponent, canActivate: [AuthGuard] },
      // { path: "dashboard", component: DashboardComponent, canActivate: [AuthGuard] },
      { path: "unauthorized", component: UnauthorizedComponent },
   
      { path: 'onesupport', loadChildren: () => import('./one_support/one-support.module').then(m => m.OneSupportModule), pathMatch: 'prefix', },
      { path: '**', component: PageNotFoundComponent },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class AreasRoutingModule { }

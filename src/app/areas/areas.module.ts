import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { provideCharts } from 'ng2-charts';  // Import provideCharts
import { AreasComponent } from './areas.component';
import { AreasRoutingModule } from './areas.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { NgxPaginationModule } from 'ngx-pagination';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AreasHttpService } from './areas.http.service';
import { CustomModalService } from '../shared/services/custom-modal.service';
import { UserService } from '../shared/services/user.service';
import { AppHeaderComponent } from './layout-container/app-header.component';
import { AppNavbarComponent } from './layout-container/app-navbar.component';
import { CommonInterceptor } from '../shared/http-service/common.interceptor';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { UtilityService } from '../shared/services/utility.service';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelect2Module } from 'ng-select2';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { FullCalendarModule } from '@fullcalendar/angular';
import { TypeaheadModule } from 'ngx-bootstrap/typeahead';
import { OneSupportModule } from './one_support/one-support.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CommonDashboardComponent } from './common-dashboard/common-dashboard.component';
import { DashboardPopupComponent } from './common-dashboard/dashboard-popup/dashboard-popup.component';

@NgModule({
  declarations: [
    AreasComponent,
    UnauthorizedComponent,
    PageNotFoundComponent,
    AppHeaderComponent,
    AppNavbarComponent,
    DashboardComponent,
    CommonDashboardComponent,
    DashboardPopupComponent

  ],
  imports: [
    OneSupportModule,
    CommonModule,
    HttpClientModule,
    AreasRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    FullCalendarModule,
    BsDatepickerModule,
    NgSelect2Module,
    MatSnackBarModule,
    MatChipsModule,
    MatCardModule,
    NgxPaginationModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatSelectModule,
    TypeaheadModule.forRoot(),
  ],
  exports: [MatExpansionModule],
  providers: [
    UserService,
    UtilityService,
    AreasHttpService,
    CustomModalService,
    { provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor, multi: true },
    provideCharts(),  // Default configuration
  ],
})
export class AreasModule {}



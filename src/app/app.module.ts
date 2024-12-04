import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { JwtModule } from '@auth0/angular-jwt';
import { ToastrModule } from 'ngx-toastr';
import { AppRoutingModule } from './app.routes';
import { AreasModule } from './areas/areas.module';
import { NgbAlertModule, NgbCarouselModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { UtilityService } from './shared/services/utility.service';
import { UserService } from './shared/services/user.service';
import { LoginComponent } from './login/login.component';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}

@NgModule({
  declarations: [
  //  AppComponent,
   // LoginComponent, // Declare components here
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    AppRoutingModule, // Import AppRoutingModule
    ToastrModule.forRoot(),
    AreasModule,
    NgbAlertModule,
    NgbCarouselModule,
    NgbModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['http://localhost:5000/api'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [UserService, UtilityService],
 // bootstrap: [AppComponent],
})
export class AppModule {}

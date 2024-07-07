import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthenticationModule,
    RouterModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutsModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

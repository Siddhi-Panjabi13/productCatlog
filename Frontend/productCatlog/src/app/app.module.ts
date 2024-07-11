import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthenticationModule } from './authentication/authentication.module';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {  HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { LayoutsModule } from './layouts/layouts.module';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';
import { ProductsModule } from './pages/products/products.module';
import { ExtrapagesModule } from './extrapages/extrapages.module';

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
    LayoutsModule,
    FormsModule,
    ProductsModule,
    ExtrapagesModule
  ],
  providers: [
    { provide:HTTP_INTERCEPTORS, useClass:AuthInterceptor , multi: true }
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { UserModule } from './user/user.module';
import { CategoriesModule } from './categories/categories.module';
import { ProductsModule } from './products/products.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PagesRoutingModule,
    UserModule,
    CategoriesModule,
    ProductsModule
  ]
})
export class PagesModule { }

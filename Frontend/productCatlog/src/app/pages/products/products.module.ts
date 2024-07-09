import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ViewProductComponent } from './view-product/view-product.component';
import { AddProductComponent } from './add-product/add-product.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ProductCardComponent } from './view-products/product-card/product-card.component';


@NgModule({
  declarations: [
    ViewProductComponent,
    AddProductComponent,
    ViewProductsComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    ReactiveFormsModule
  ]
})
export class ProductsModule { }

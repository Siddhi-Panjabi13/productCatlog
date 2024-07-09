import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';

const routes: Routes = [
  {path:'addProduct', component:AddProductComponent},
  {path:'getProducts', component:ViewProductsComponent},
  {path:'updateProduct/:id', component:AddProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddProductComponent } from './add-product/add-product.component';
import { ViewProductsComponent } from './view-products/view-products.component';
import { ViewProductComponent } from './view-product/view-product.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {path:'addProduct', component:AddProductComponent, canActivate:[authGuard,RoleGuard],
    data: { roles: ['Admin']}},
  {path:'getProducts', component:ViewProductsComponent, canActivate:[authGuard]},
  {path:'updateProduct/:id', component:AddProductComponent,canActivate:[authGuard,RoleGuard],
    data:{roles:['Admin']}
  },
  {path:'viewProduct/:id', component:ViewProductComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProductsRoutingModule { }
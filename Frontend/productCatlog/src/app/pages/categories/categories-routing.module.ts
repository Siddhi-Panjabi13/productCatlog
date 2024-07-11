import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';
import { authGuard } from 'src/app/core/guards/auth.guard';
import { RoleGuard } from 'src/app/core/guards/role.guard';

const routes: Routes = [
  {path:'',redirectTo:'viewCategory', pathMatch:'full'},
  {path:'addCategory',component:AddCategoriesComponent,canActivate:[authGuard,RoleGuard],
    data: { roles: ['Admin'] }
  },
  {path:'viewCategory',component:ViewCategoriesComponent, canActivate:[authGuard,RoleGuard],
    data: { roles: ['Admin']}}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

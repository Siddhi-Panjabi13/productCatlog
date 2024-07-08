import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ViewCategoriesComponent } from './view-categories/view-categories.component';

const routes: Routes = [
  {path:'',redirectTo:'viewCategory', pathMatch:'full'},
  {path:'addCategory',component:AddCategoriesComponent},
  {path:'viewCategory',component:ViewCategoriesComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CategoriesRoutingModule { }

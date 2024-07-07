import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './layouts/layout/layout.component';

const routes: Routes = [
  {path:'', redirectTo:'auth', pathMatch:'full'},
  {path:'auth',
  loadChildren: () => import('./authentication/authentication.module').then(m => m.AuthenticationModule)},
  {path:'layouts', component:LayoutComponent,
    children: [
      { path: '', loadChildren: () => import('./pages/pages.module').then(m => m.PagesModule) },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

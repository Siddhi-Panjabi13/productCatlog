import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { authGuard } from 'src/app/core/guards/auth.guard';

const routes: Routes = [
  {path:'', redirectTo:'profile', pathMatch:'full'},
  {path:'profile',component:ProfileComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }

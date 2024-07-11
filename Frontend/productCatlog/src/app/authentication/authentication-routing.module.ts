import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { loginGuard } from '../core/guards/login.guard';
import { authGuard } from '../core/guards/auth.guard';

const routes: Routes = [
  {path:'',redirectTo:'signup', pathMatch:'full'},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent, canActivate:[loginGuard]},
  {path:'layouts/edituser/:id',component:SignupComponent, canActivate:[authGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthenticationRoutingModule { }

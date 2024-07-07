import { Component } from '@angular/core';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private userService:UserService,private router:Router){}
  signout(){
    this.userService.clearLocalStorage();
    this.router.navigate(['/auth/login'])
  }
}

import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent {
  constructor(private router:Router,private userService:UserService) {}

  goBack() {
    this.userService.clearLocalStorage();
    this.router.navigate(['/auth/login']);
  }
}

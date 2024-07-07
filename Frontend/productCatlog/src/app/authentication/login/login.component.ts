import { Component } from '@angular/core';
import { Validators,FormGroup,FormBuilder, FormControl } from '@angular/forms';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router
  ) {
    this.loginForm = this.fb.group({
      userName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
    });
  }
  login() {
    this.userService.loginUser(this.loginForm.value).subscribe(
      (response) => {
        console.log(response,'resp');
        
        this.userService.setToken(response.token);
        this.userService.setRole(response.role);
        Swal.fire('Good job!', `${response.message}`, 'success');

        this.loginForm.reset();
        setTimeout(()=>{
          this.route.navigate(['/layouts']);
        }, 3000)
        
      },
      (error: HttpErrorResponse) => {
        console.log(error);
        Swal.fire('Oh no!', `${error.error.message}`, 'error');
      }
    );
  }
  get data() {
    return this.loginForm.controls;
  }
}

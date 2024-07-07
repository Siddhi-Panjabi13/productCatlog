import { Component } from '@angular/core';
import { Validators,FormGroup,FormBuilder,FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {
  registrationForm!: FormGroup;
  userId = this.activatedRoute.snapshot.paramMap.get('id') as string;
  isUpdate: boolean = false;
  isSubmit: boolean = true;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private activatedRoute: ActivatedRoute
  ) {
    this.registrationForm = this.fb.group({
      userName: new FormControl('', [
        Validators.required,
        Validators.minLength(2),
        Validators.pattern(/^[a-zA-Z ]+$/),
      ]),
    });

    if (this.isSubmit) {
      this.registrationForm.addControl(
        'password',
        new FormControl('', [
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,}$/
          ),
        ])
      ),
      this.registrationForm.addControl('role',
        new FormControl('',[
          Validators.required
        ])
      );
    }
  }

  ngOnInit() {
    if (this.userId) {
      this.isUpdate = true;
      this.isSubmit = false;
      this.getUserById();
    }
  }

  registerUser() {
    if (this.registrationForm.valid) {
      console.log(this.registrationForm.value);
      if (this.isSubmit) {
        this.userService.createUser(this.registrationForm.value).subscribe(
          (response) => {
            Swal.fire('Good Job', 'User Registered successfully', 'success');
            this.registrationForm.reset();
            this.route.navigate(['login']);
          },
          (error) => {
            Swal.fire('Registration Failed!', error.error.message, 'error');
          }
        );
      } else {
        this.userService.editUser(this.registrationForm.value, this.userId).subscribe(
          (response) => {
            Swal.fire('Good Job', 'User updated successfully', 'success');
            this.registrationForm.reset();
            this.route.navigate(['/layouts/user/profile']);
          },
          (error) => {
            Swal.fire('Updation Failed!', error.error.message, 'error');
          }
        );
      }
    } else {
      Swal.fire('Registration Failed!', 'Fill all the fields', 'error');
    }
  }

  get data() {
    return this.registrationForm.controls;
  }

  getUserById() {
    this.userService.getUserById(this.userId).subscribe({
      next: (response: any) => {
        console.log(this.userId)
        console.log(response);
        this.registrationForm.patchValue({
          userName: response.userName,
        });

        if (!this.isSubmit) {
          this.registrationForm.removeControl('password');
          this.registrationForm.removeControl('role');
        }
      },
    });
  }
}

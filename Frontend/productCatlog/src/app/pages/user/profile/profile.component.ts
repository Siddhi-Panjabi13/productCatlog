import { Component } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { UserService } from 'src/app/core/services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent {
  constructor(private userService:UserService,private router:Router){}
  userid!:any;
  userName!:string;
  role!:string;
 ngOnInit(){
  this.userService.getLoggedInUser().subscribe((response)=>{
    // console.log(response)
    this.userid=response._id;
    this.userName=response.userName;
    this.role=response.role;
  },
(error:HttpErrorResponse)=>{
  console.log(error.error);
Swal.fire('Oh no',`${error.error}`,'error');
})
 }
deleteProfile(){
  this.userService.deleteUser(this.userid).subscribe(
    (response)=>{
      this.userService.clearLocalStorage()
      Swal.fire('Good Job','Profile deleted successfully','success');
      this.router.navigate(['/auth/signup'])

    },(error:HttpErrorResponse)=>{
      Swal.fire('Oops','Unable to delete the profile','error');
    }
  );
}

}

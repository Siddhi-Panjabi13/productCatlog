import { CanActivateFn } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService);
  const router=inject(Router)
  const token = userService.getToken();
    try {
      if (token) {
        return true;
      }  else {
        Swal.fire('Oops','Login Required','error');
        router.navigate(['auth/login'])
        return false;
      }
    } catch (error) {
      return false;
    }
};

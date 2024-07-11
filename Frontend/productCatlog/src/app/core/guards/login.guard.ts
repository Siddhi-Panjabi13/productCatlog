import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { UserService } from '../services/user.service';
import { Location } from '@angular/common';

export const loginGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService)
  const location=inject(Location)
  const token=userService.getToken();
  if (token) {
    location.back()
    return false;
  } else {
    return true;
  }
};

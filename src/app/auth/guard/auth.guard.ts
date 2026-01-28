import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../AuthServices/auth.service';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);
  

  if (authService.isLoggedIn()) {
    return true;
  }

  return router.createUrlTree(['/login']);
};


/*
  Verifica si el usuario ya tiene una sesion iniciada.
*/
export const guestGuard: CanActivateFn = (route, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.isLoggedIn()) {
    return router.createUrlTree(['/inicio']);
  }

  return true;
};


export const onlyAdmin: CanActivateFn = (routes,state) =>{
   const authService = inject(AuthService);
   const router = inject(Router);

   const rolesJson = authService.getRoles();
   if (rolesJson) {
     const roles: string[] = JSON.parse(rolesJson);
     if (roles.includes('ROLE_ADMIN')) {
       return true;
     }
   }

   return router.createUrlTree(['/login']);
}

import { inject } from '@angular/core';
import { Router, ActivatedRouteSnapshot } from '@angular/router';
import { PermissionService } from '../services/permission.service';

export const permissionGuard = (route: ActivatedRouteSnapshot) => {
  const permissionService = inject(PermissionService);
  const router = inject(Router);
  
  const requiredPermission = route.data['permission'];

  if (permissionService.hasPermission(requiredPermission)) {
    return true;
  }

  // Redirect to unauthorized page
  router.navigate(['/unauthorized']);
  return false;
};

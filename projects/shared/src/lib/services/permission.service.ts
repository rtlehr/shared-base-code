import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private userPermissions = new BehaviorSubject<string[]>([]); // Observable permissions

  setUserPermissions(permissions: string[]) {
    this.userPermissions.next(permissions); // Update permissions
  }

  hasPermission(permission: string): boolean {
    return this.userPermissions.getValue().includes(permission); 
  }

  getPermissions() {
    return this.userPermissions.asObservable(); // Allow components to reactively update
  }

  getPermissionsArray() {
    return this.userPermissions.value; // Allow components to reactively update
  }

} 

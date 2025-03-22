import { Directive, Input, TemplateRef, ViewContainerRef, inject } from '@angular/core';
import { PermissionService } from '../services/permission.service';
import { Subscription } from 'rxjs';

@Directive({
  selector: '[appHasPermission]',
  standalone: true, // ✅ Makes this directive standalone
})
export class HasPermissionDirective {
  private permissionService = inject(PermissionService); // ✅ Inject service without a constructor
  private viewContainer = inject(ViewContainerRef);
  private templateRef = inject(TemplateRef<any>);
  private permissionSub: Subscription | undefined;
  private requiredPermission: string = '';

  @Input() set appHasPermission(permission: string) {
    this.requiredPermission = permission;
    this.updateView();

    // Subscribe to permission changes dynamically
    this.permissionSub = this.permissionService.getPermissions().subscribe(() => {
      this.updateView();
    });
  }

  private updateView() {
    if (this.permissionService.hasPermission(this.requiredPermission)) {
      this.viewContainer.createEmbeddedView(this.templateRef);
    } else {
      this.viewContainer.clear();
    }
  }

  ngOnDestroy() {
    this.permissionSub?.unsubscribe();
  }
}

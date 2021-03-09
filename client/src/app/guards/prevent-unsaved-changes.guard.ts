// Libs
import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

// Services
import { ConfirmService } from '../services/confirm.service';

// Components
import { MemberEditComponent } from '../members/member-edit/member-edit.component';

@Injectable({
  providedIn: 'root',
})
export class PreventUnsavedChangesGuard implements CanDeactivate<unknown> {
  constructor(private confirmService: ConfirmService) {}

  canDeactivate(component: MemberEditComponent): Observable<boolean> | boolean {
    if (component.editForm.dirty) {
      return this.confirmService.confirm();
    }

    return true;
  }
}

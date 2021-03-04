// Libs
import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

// Models
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-roles-modal',
  templateUrl: './roles-modal.component.html',
  styleUrls: ['./roles-modal.component.css'],
})
export class RolesModalComponent implements OnInit {
  @Input() updateSelectedRoles = new EventEmitter();
  user: User;
  roles: any[] = [];

  constructor(public bsModalRef: BsModalRef) {}

  ngOnInit(): void {}

  updateRoles(): void {
    this.updateSelectedRoles.emit(this.roles);
    this.bsModalRef.hide();
  }
}

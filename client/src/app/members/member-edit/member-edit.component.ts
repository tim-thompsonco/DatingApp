// libs
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

// models
import { Member } from 'src/app/models/member';
import { User } from 'src/app/models/user';

// services
import { AccountService } from 'src/app/services/account.service';
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css'],
})
export class MemberEditComponent implements OnInit {
  member: Member;
  user: User;

  constructor(
    private accountService: AccountService,
    private memberService: MembersService
  ) {
    this.accountService.currentUser$
      .pipe(take(1))
      .subscribe((user) => (this.user = user));
  }

  ngOnInit(): void {
    this.loadMember();
  }

  loadMember(): void {
    this.memberService
      .getMember(this.user.userName)
      .subscribe((member) => (this.member = member));
  }
}

// libs
import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';

// models
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';
import { AccountService } from 'src/app/services/account.service';

// services
import { MembersService } from 'src/app/services/members.service';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css'],
})
export class MemberListComponent implements OnInit {
  members: Member[];
  pagination: Pagination;
  userParams: UserParams;
  user: User;
  genderList = [
    { value: 'male', display: 'Male' },
    { value: 'female', display: 'Female' },
  ];

  constructor(
    private memberService: MembersService,
    private accountService: AccountService
  ) {
    this.accountService.currentUser$.pipe(take(1)).subscribe((user) => {
      this.user = user;
      this.userParams = new UserParams(user);
    });
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.getMembers(this.userParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters(): void {
    this.userParams = new UserParams(this.user);
    this.loadMembers();
  }

  pageChanged(event: any): void {
    this.userParams.pageNumber = event.page;
    this.loadMembers();
  }
}

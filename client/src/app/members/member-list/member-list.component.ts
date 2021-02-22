// libs
import { Component, OnInit } from '@angular/core';

// models
import { Member } from 'src/app/models/member';
import { Pagination } from 'src/app/models/pagination';
import { User } from 'src/app/models/user';
import { UserParams } from 'src/app/models/userParams';

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

  constructor(private memberService: MembersService) {
    this.userParams = this.memberService.getUserParams();
  }

  ngOnInit(): void {
    this.loadMembers();
  }

  loadMembers(): void {
    this.memberService.setUserParams(this.userParams);

    this.memberService.getMembers(this.userParams).subscribe((response) => {
      this.members = response.result;
      this.pagination = response.pagination;
    });
  }

  resetFilters(): void {
    this.userParams = this.memberService.resetUserParams();
    this.loadMembers();
  }

  pageChanged(event: any): void {
    this.userParams.pageNumber = event.page;
    this.memberService.setUserParams(this.userParams);
    this.loadMembers();
  }
}

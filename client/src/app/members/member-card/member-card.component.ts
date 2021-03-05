// Libs
import { Component, Input, OnInit } from '@angular/core';

// Models
import { Member } from 'src/app/models/member';

// Services
import { ToastrService } from 'ngx-toastr';
import { MembersService } from 'src/app/services/members.service';
import { PresenceService } from 'src/app/services/presence.service';

@Component({
  selector: 'app-member-card',
  templateUrl: './member-card.component.html',
  styleUrls: ['./member-card.component.css'],
})
export class MemberCardComponent implements OnInit {
  @Input() member: Member;

  constructor(
    private memberService: MembersService,
    private toastr: ToastrService,
    public presence: PresenceService
  ) {}

  ngOnInit(): void {}

  addLike(member: Member): void {
    this.memberService.addLike(member.username).subscribe(() => {
      this.toastr.success(`You have liked ${member.knownAs}`);
    });
  }
}

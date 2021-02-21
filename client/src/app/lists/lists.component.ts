// libs
import { Component, OnInit } from '@angular/core';

// models
import { Member } from '../models/member';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
})
export class ListsComponent implements OnInit {
  members: Partial<Member[]>;
  predicate = 'liked';

  constructor(private memberService: MembersService) {}

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(): void {
    this.memberService.getLikes(this.predicate).subscribe((response) => {
      console.log(response);

      this.members = response;
    });
  }
}

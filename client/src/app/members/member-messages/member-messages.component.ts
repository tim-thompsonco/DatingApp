// Libs
import { Component, Input, OnInit } from '@angular/core';

// Models
import { Message } from 'src/app/models/message';

// Services
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-member-messages',
  templateUrl: './member-messages.component.html',
  styleUrls: ['./member-messages.component.css'],
})
export class MemberMessagesComponent implements OnInit {
  @Input() messages: Message[];

  constructor() {}

  ngOnInit(): void {}
}

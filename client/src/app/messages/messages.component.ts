// Libs
import { Component, OnInit } from '@angular/core';

// Models
import { Message } from '../models/message';
import { Pagination } from '../models/pagination';

// Services
import { ConfirmService } from '../services/confirm.service';
import { MessageService } from '../services/message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css'],
})
export class MessagesComponent implements OnInit {
  messages: Message[];
  pagination: Pagination;
  container = 'Unread';
  pageNumber = 1;
  pageSize = 5;
  loading = false;

  constructor(
    private messageService: MessageService,
    private confirmService: ConfirmService
  ) {}

  ngOnInit(): void {
    this.loadMessages();
  }

  loadMessages(): void {
    this.loading = true;
    this.messageService
      .getMessages(this.pageNumber, this.pageSize, this.container)
      .subscribe((response) => {
        this.messages = response.result;
        this.pagination = response.pagination;
        this.loading = false;
      });
  }

  deleteMessage(id: number): void {
    this.confirmService
      .confirm('Confirm delete message', 'This cannot be undone')
      .subscribe((result) => {
        if (result) {
          this.messageService.deleteMessage(id).subscribe(() => {
            this.messages.splice(
              this.messages.findIndex((message) => message.id === id),
              1
            );
          });
        }
      });
  }

  pageChanged(event: any): void {
    this.pageNumber = event.page;
    this.loadMessages();
  }
}

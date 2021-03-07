// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject, Observable } from 'rxjs';
import { take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// Models
import { Message } from '../models/message';
import { PaginatedResult } from '../models/pagination';
import { User } from '../models/user';

// Helpers
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;
  hubUrl = environment.hubUrl;
  private hubConnection: HubConnection;
  private messageThreadSource = new BehaviorSubject<Message[]>([]);
  messageThread$ = this.messageThreadSource.asObservable();

  constructor(private http: HttpClient) {}

  createHubConnection(user: User, otherUsername: string): void {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(`${this.hubUrl}message?user=${otherUsername}`, {
        accessTokenFactory: () => user.token,
      })
      .withAutomaticReconnect()
      .build();

    this.hubConnection.start().catch((error) => console.log(error));

    this.hubConnection.on('ReceiveMessageThread', (messages) => {
      this.messageThreadSource.next(messages);
    });

    this.hubConnection.on('NewMessage', (message) => {
      this.messageThread$.pipe(take(1)).subscribe((messages) => {
        this.messageThreadSource.next([...messages, message]);
      });
    });
  }

  stopHubConnection(): void {
    if (this.hubConnection) {
      this.hubConnection.stop();
    }
  }

  getMessages(
    pageNumber: number,
    pageSize: number,
    container
  ): Observable<PaginatedResult<Message[]>> {
    let params = getPaginationHeaders(pageNumber, pageSize);
    params = params.append('Container', container);

    return getPaginatedResult<Message[]>(
      `${this.baseUrl}messages`,
      params,
      this.http
    );
  }

  getMessageThread(username: string): Observable<Message[]> {
    return this.http.get<Message[]>(
      `${this.baseUrl}messages/thread/${username}`
    );
  }

  async sendMessage(username: string, content: string): Promise<any> {
    return this.hubConnection
      .invoke('SendMessage', { recipientUsername: username, content })
      .catch((error) => console.log(error));
  }

  deleteMessage(id: number): Observable<object> {
    return this.http.delete(`${this.baseUrl}messages/${id}`);
  }
}

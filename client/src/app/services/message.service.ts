// Libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Models
import { Message } from '../models/message';
import { PaginatedResult } from '../models/pagination';

// Helpers
import { getPaginatedResult, getPaginationHeaders } from './paginationHelper';

@Injectable({
  providedIn: 'root',
})
export class MessageService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

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

  sendMessage(username: string, content: string): Observable<Message> {
    return this.http.post<Message>(`${this.baseUrl}messages`, {
      recipientUsername: username,
      content,
    });
  }

  deleteMessage(id: number): Observable<object> {
    return this.http.delete(`${this.baseUrl}messages/${id}`);
  }
}

// libs
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// models
import { Member } from '../models/member';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];

  constructor(private http: HttpClient) {}

  getMembers(): Observable<Member[]> {
    if (this.members.length > 0) {
      return of(this.members);
    }

    return this.http.get<Member[]>(`${this.baseUrl}users`).pipe(
      map((members) => {
        this.members = members;

        return members;
      })
    );
  }

  getMember(username: string): Observable<Member> {
    const member = this.members.find((user) => user.username === username);

    if (member !== undefined) {
      return of(member);
    }

    return this.http.get<Member>(`${this.baseUrl}users/${username}`);
  }

  updateMember(member: Member): Observable<void> {
    return this.http.put(`${this.baseUrl}users`, member).pipe(
      map(() => {
        const index = this.members.indexOf(member);

        this.members[index] = member;
      })
    );
  }

  setMainPhoto(photoId: number): Observable<object> {
    return this.http.put(`${this.baseUrl}users/set-main-photo/${photoId}`, {});
  }
}

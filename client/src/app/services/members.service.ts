// libs
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { of, pipe } from 'rxjs';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

// models
import { Member } from '../models/member';
import { PaginatedResult } from '../models/pagination';
import { UserParams } from '../models/userParams';

@Injectable({
  providedIn: 'root',
})
export class MembersService {
  baseUrl = environment.apiUrl;
  members: Member[] = [];
  memberCache = new Map();

  constructor(private http: HttpClient) {}

  getMembers(userParams: UserParams): Observable<PaginatedResult<Member[]>> {
    const cacheKey = Object.values(userParams).join('-');
    const cacheResponse = this.memberCache.get(cacheKey);

    if (cacheResponse) {
      return of(cacheResponse);
    }

    let params = this.getPaginationHeaders(
      userParams.pageNumber,
      userParams.pageSize
    );

    params = params.append('minAge', userParams.minAge.toString());
    params = params.append('maxAge', userParams.maxAge.toString());
    params = params.append('gender', userParams.gender);
    params = params.append('orderBy', userParams.orderBy);

    return this.getPaginatedResult<Member[]>(
      `${this.baseUrl}users`,
      params
    ).pipe(
      map((response) => {
        this.memberCache.set(cacheKey, response);

        return response;
      })
    );
  }

  private getPaginationHeaders(
    pageNumber: number,
    pageSize: number
  ): HttpParams {
    let params = new HttpParams();

    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());

    return params;
  }

  private getPaginatedResult<T>(url, params): Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http
      .get<T>(url, {
        observe: 'response',
        params,
      })
      .pipe(
        map((response) => {
          paginatedResult.result = response.body;

          if (response.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(
              response.headers.get('Pagination')
            );
          }

          return paginatedResult;
        })
      );
  }

  getMember(username: string): Observable<Member> {
    const member = [...this.memberCache.values()]
      .reduce((arr, elem) => arr.concat(elem.result), [])
      .find((cachedMember: Member) => cachedMember.username === username);

    if (member) {
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

  deletePhoto(photoId: number): Observable<object> {
    return this.http.delete(`${this.baseUrl}users/delete-photo/${photoId}`);
  }
}

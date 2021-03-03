import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
// Libs
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

// Models
import { User } from '../models/user';

@Injectable({
  providedIn: 'root',
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getUsersWithRoles(): Observable<Partial<User[]>> {
    return this.http.get<Partial<User[]>>(
      `${this.baseUrl}admin/users-with-roles`
    );
  }
}

import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { JwtService } from './jwt.service';
import { BehaviorSubject, Observable, ReplaySubject, distinctUntilChanged, map, shareReplay, tap } from 'rxjs';
import { User } from '../models/user.model';
import { Auth } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser = this.currentUserSubject
    .asObservable()
    .pipe(distinctUntilChanged());

  public isAuthenticated = this.currentUser.pipe(map((user) => !!user));

  constructor(
    private apiService: ApiService,
    private jwtService: JwtService
  ) { }

  getCurrentUser(): Observable<User> {
    return this.apiService.get<User>("/auth/me").pipe(
      tap({
        next: (user) => {
          const userData = {
            ...user,
            token: this.jwtService.getToken()
          }
          this.setAuth(userData)
        },
        error: () => this.purgeAuth(),
      }),
      shareReplay(1)
    );
  }

  purgeAuth() {
    this.jwtService.destroyToken();
    this.currentUserSubject.next(null);
  }

  setAuth(user: User) {
    console.log(user)
    if (user.token) {
      this.jwtService.saveToken(user.token);
      this.currentUserSubject.next(user);
    }
  }

  attemptAuth(credentials: Auth): Observable<boolean> {
    return this.apiService.post<{ authToken: "string" }, Auth>(`/auth/login`, { ...credentials })
      .pipe(map(
        data => {
          const userData = {
            username: credentials.username,
            token: data.authToken
          }
          this.setAuth(userData);
          return true;
        }
      ));
  }
}

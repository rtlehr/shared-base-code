import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

interface User {
  email: string;
  password: string;
  accessLevel: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Ensure this path is correct; the file should be in the "src/assets" folder.
  private usersUrl = 'assets/JSON/users.json';

  constructor(private http: HttpClient) {}

  login(credentials: { email: string; password: string }): Observable<any> {
    return this.http.get<User[]>(this.usersUrl).pipe(
      map(users => {
        console.log('Loaded users:', users);
        console.log('Entered credentials:', credentials);

        const normalizedEmail = credentials.email.toLowerCase().trim();
        const user = users.find(u =>
          u.email.toLowerCase().trim() === normalizedEmail &&
          u.password === credentials.password
        );

        if (user) {

          return { token: 'fake-jwt-token', user };

        }
        throw new Error('Invalid email or password');
      }),
      catchError(error => {
        console.error('Error during login:', error);
        return throwError(() => error);
      })
    );
  }
}

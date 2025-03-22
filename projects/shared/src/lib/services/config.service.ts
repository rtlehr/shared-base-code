// src/app/config.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ConfigService {
  private configData: any;

  constructor(private http: HttpClient) {}

  loadConfig(): Observable<any> {
    return this.http.get('/assets/config/config.json').pipe(
      catchError((error) => {
        console.error('Failed to load config.json:', error);
        return of({}); // Fallback to an empty object if loading fails
      })
    );
  }

  setConfig(data: any): void {
    this.configData = data;
  }

  getConfig(): any {
    return this.configData;
  }
}

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class JsonDataService {
  private dataSubject = new BehaviorSubject<any | null>(null);
  data$ = this.dataSubject.asObservable();

  constructor(private http: HttpClient) {}

  loadData(jsonPath: string): Observable<any> {
    return this.http.get(jsonPath).pipe(
      tap(data => this.dataSubject.next(data))
    );
  }

  getData(): any {
    return this.dataSubject.value;
  }

  getItemByKey(key: string, value: any): any {
    return this.dataSubject.value?.find((item: any) => item[key] === value);
  }
}

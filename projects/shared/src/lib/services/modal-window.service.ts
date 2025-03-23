import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalWindowService {
  private actionSource = new Subject<any>(); // ✅ Accepts windowInfo object
  actionTriggered$ = this.actionSource.asObservable();

  openModalWindow(windowInfo: any) {
    console.log('--- ModalWindowService: Emitting windowInfo', windowInfo);
    this.actionSource.next(windowInfo);
  }
}

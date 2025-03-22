import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})

export class ModalWindowService {

    private actionSource = new Subject<void>();

    actionTriggered$ = this.actionSource.asObservable();

    openModalWindow(windowInfo: any) {

      console.log("openModalWindow from Modal Service");

      this.actionSource.next(windowInfo);

    }

}

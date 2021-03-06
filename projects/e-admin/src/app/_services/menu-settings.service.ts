import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MenuSettingsService {
  private openStatus = new BehaviorSubject<boolean>(true);
  currentOSt = this.openStatus.asObservable();

  changeStatusMenu(val: boolean): void {
    val = !val;
    this.openStatus.next(val);
  }

  get windowRef(): Window & typeof globalThis {
    return window;
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {
  private openSatus = new BehaviorSubject<boolean>(true);
  currentOSt = this.openSatus.asObservable();

  millisToTime = function(ms): string {
    const x = ms / 1000;
    const seconds = Math.floor(x % 60);
    // x /= 60;
    // let minutes = Math.floor(x % 60);
    // x /= 60;
    // let hours = Math.floor(x % 24);
    // x /= 24;
    // let days = Math.floor(x);
    const msg = `Recibido ${seconds === 0 ? x : seconds} seg. aprox.`;
    return msg;
  };
}

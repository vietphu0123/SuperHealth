import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private dataSubject = new BehaviorSubject<any>('');

  getData() {
    return this.dataSubject.asObservable();
  }

  sendData(data: string) {
    this.dataSubject.next(data);
  }
}

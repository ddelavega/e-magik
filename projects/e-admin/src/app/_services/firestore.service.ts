import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(public database: AngularFirestore) {

  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).update(data);
  }

  getId() {
    return this.database.createId();
  }

  getCollection<T>(path: string) {

    const collection = this.database.collection<T>(path);
    return collection.valueChanges();
  }

  // private openStatus = new BehaviorSubject<boolean>(true);
  // currentOSt = this.openStatus.asObservable();

  // changeStatusMenu(val: boolean): void {
  //   val = !val;
  //   this.openStatus.next(val);
  // }

  // get windowRef(): Window & typeof globalThis {
  //   return window;
  // }
}
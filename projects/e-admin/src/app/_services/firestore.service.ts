import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(
    public database: AngularFirestore
  ) {

  }

  createDoc(data: any, path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).set(data);
  }

  getDoc<T>(path: string, id: string) {
    const collection = this.database.collection<T>(path);
    return collection.doc(id).valueChanges();
  }

  deleteDoc(path: string, id: string) {
    const collection = this.database.collection(path);
    return collection.doc(id).delete();
  }

  updateDoc(data: any, path: string, id: string) {

    // const userRef: AngularFirestoreDocument<any> = this.afs.doc(
    //   `users/${user.uid}`
    // );
    // const userData: User = {
    //   uid: user.uid,
    //   email: user.email,
    //   // displayName: user.displayName,
    //   // photoURL: user.photoURL,
    //   emailVerified: user.emailVerified,
    // };
    // return userRef.set(userData, {
    //   merge: true,
    // });


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
  getCollectionQuery<T>(path: string, parametro: string, condicion: any, busqueda: string) {

    const collection = this.database.collection<T>(path, ref => ref.where(parametro, condicion, busqueda));

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

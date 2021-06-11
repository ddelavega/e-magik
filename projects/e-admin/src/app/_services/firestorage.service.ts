import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/storage';
import { BehaviorSubject } from 'rxjs';
import { finalize, first, materialize } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(
    public angularFireStorage: AngularFireStorage
  ) { }

  uploadImage(file: any, path: string, name: string) {
    return new Promise(resolve => {
      const filePath = path + '/' + name;
      const ref = this.angularFireStorage.ref(filePath);
      const task = ref.put(file);
      task.snapshotChanges()
        .pipe(first(),
          finalize(() => {
            ref.getDownloadURL().subscribe(res => {
              const getDownloadURL = res;
              resolve(getDownloadURL);
              return;
            });
          })
        );
    })
  }

  // async deleteImage(url: string) {
  //   let pictureRef = this.angularFireStorage.refFromURL(url);
  //   console.log(pictureRef);
  //   await pictureRef.delete().subscribe(res => {
  //     alert('ya se borro');
  //     console.log('se elimino', url, res);
  //     return;
  //   })
  // }

  // const deleteFromFirebase = (url) => {
  //     //1.
  //   let pictureRef = this.angularFireStorage.refFromURL(url);
  //     //2.
  //     pictureRef.delete()
  //       .then(() => {
  //         //3.
  //         setImages(allImages.filter((image) => image !== url));
  //         alert("Picture is deleted successfully!");
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
}

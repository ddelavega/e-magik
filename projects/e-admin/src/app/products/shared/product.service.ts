import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable, from, throwError, merge } from 'rxjs';
import { map, tap, switchMap, first, take } from 'rxjs/operators';
import { Product } from './product.model';
import { ActivatedRoute, Router } from '@angular/router';
// import { firestore } from 'firebase/app';
import { ImageMetadata } from '../../files/shared/image-metadata';
import { HttpClient } from '@angular/common/http';
import { FileService } from '../../files/shared/file-service';
// import { ToastrService } from 'ngx-toastr';

const collectionPath = 'products';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // product: Product;
  // producto: Observable<Product>;
  // product: Observable<Product>;
  // alumno: any[];
  // products: Observable<Product[]>;
  // estadoChange = false;

  constructor(
    private db: AngularFirestore,
    private fs: FileService,
    private router: Router,
    private http: HttpClient,
    // private toastrService: ToastrService,
    private activatedRoute: ActivatedRoute
  ) { }
  // ,private fs: FileService

  // getProducts(): Observable<Product[]> {
  //   return this.db
  //     .collection<Product>(collectionPath)
  //     .snapshotChanges()
  //     .pipe(
  //       map(actions => {
  //         return actions.map(a => {
  //           const data = a.payload.doc.data() as Product;
  //           const id = a.payload.doc.id;
  //           return { id, ...data };
  //         });
  //       })
  //     );
  // }

  getProduct(id: string): Observable<Product> {
    const productsDocuments = this.db.doc<Product>('products/' + id);
    return productsDocuments.snapshotChanges().pipe(
      map(changes => {
        const data = changes.payload.data();
        data.id = changes.payload.id;
        data.id = id;
        return { id, ...data };
      })
    );
  }


  getProducts(): Observable<Product[]> {
    return this.db
      .collection<Product>(collectionPath)
      // This will return an Observable
      .snapshotChanges()
      .pipe(
        map(actions => {
          // actions is an array of DocumentChangeAction
          return actions.map(action => {
            const data = action.payload.doc.data() as Product;
            return {
              id: action.payload.doc.id,
              name: data.name,
              pictureId: data.pictureId,
              apellido: data.apellido,
              location: data.location,
              hasDriverLicense: data.hasDriverLicense,
              datos: {
                xname: data.datos.xname,
                xotro: data.datos.xotro,
                totalClases: data.datos.totalClases
              }
            };
          });
        })
      );
  }

  deleteProduct(id: string): Observable<Product> {
    return this.db.doc<Product>(collectionPath + '/' + id)
      .get()
      .pipe(
        first(),
        tap(productDocument => {
        }),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            throw new Error('Product not found');
          } else {
            return from(
              this.db.doc<Product>(collectionPath + '/' + id)
                .delete()
            ).pipe(
              map(() => {
                const data = productDocument.data() as Product;
                data.id = productDocument.id;
                return data;
              })
            );
          }
        })
      );
    /*return Observable.create(obs => {
      this.db.doc<Product>('products/' + id)
        .delete()
        .then(() => obs.next())
        .catch(err => obs.error(err))
        .finally(() => obs.complete());
    });*/
    /*return this.db.doc<Product>('products/' + id)
      .delete();*/
  }


  // addProductWithImage(product: Product, imageMeta: ImageMetadata): Observable<Product> {
  //     if (imageMeta && imageMeta.fileMeta &&
  //       imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
  //       (imageMeta.imageBlob || imageMeta.base64Image)) {

  //         return this.fs.uploadImage(imageMeta)
  //         .pipe(
  //           switchMap(numetadata => {
  //             product.pictureId = numetadata.id;
  //             return this.addProduct(product);
  //           })
  //           );
  //         } else {
  //           throw Error('You need better metadata');
  //         }
  // }

  // private addProduct(product: Product): Observable<Product> {
  //   return from(
  //     this.db.collection<Product>('products').add({
  //       name: product.name,
  //       apellido: product.apellido,
  //       pictureId: product.pictureId,
  //       url: product.url,
  //       location: product.location,
  //       hasDriverLicense: product.hasDriverLicense,
  //       datos: {
  //         xname: product.datos.xname,
  //         xotro: product.datos.xotro,
  //       }
  //     })
  //   ).pipe(
  //     map(productRef => {
  //       product.id = productRef.id;
  //       return product;
  //     })
  //   );
  // }

  addProductWithImage(product: Product, imageMeta: ImageMetadata): Observable<Product> {
    if (imageMeta && imageMeta.fileMeta
      && imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
      (imageMeta.imageBlob || imageMeta.base64Image)) {
      const endPointUrl =
        'https://us-central1-meister-argentina.cloudfunctions.net/products';
      const productToSend: any = {
        name: product.name,
        apellido: product.apellido,
        location: product.location,
        hasDriverLicense: product.hasDriverLicense,
        datos: {
          xname: product.datos.xname,
          xotro: product.datos.xotro,
          totalClases: product.datos.totalClases,
        },
        image: {
          base64: imageMeta.base64Image,
          name: imageMeta.fileMeta.name,
          type: imageMeta.fileMeta.type,
          size: imageMeta.fileMeta.size
        }
      };
      console.log('productToSend');
      console.log(productToSend);
      // this.toastrService.success('Producto subido!', 'Producto: ' + productToSend.name + '');
      return this.http.post<Product>(endPointUrl, productToSend);

      // TODO: break lines in textarea to save description

      /*return this.fs.uploadImage(imageMeta)
        .pipe(
          switchMap(metadata => {
            product.pictureId = metadata.id;
            return this.addProduct(product);
          }),
          catchError((err, caught) => {
            return throwError(err);
          })
        );*/
    } else {
      return throwError('You need better metadata');
    }
  }

  private addProduct(product: Product): Observable<Product> {
    return from(
      this.db.collection('products').add(
        {
          name: product.name,
          pictureId: product.pictureId,
          apellido: product.apellido,
          url: product.url,
          location: product.location,
          hasDriverLicense: product.hasDriverLicense,
          datos: {
            xname: product.datos.xname,
            xotro: product.datos.xotro,
            totalClases: product.datos.totalClases
          }
        }
      )
    ).pipe(
      map(productRef => {
        product.id = productRef.id;
        return product;
      })
    );
  }


  // addProductWithImage(product: Product, imageMeta: ImageMetadata)
  //   : Observable<Product> {
  //     if (imageMeta && imageMeta.fileMeta &&
  //       imageMeta.fileMeta.name && imageMeta.fileMeta.type &&
  //       (imageMeta.imageBlob || imageMeta.base64Image)) {

  //         return this.fs.uploadImage(imageMeta)
  //         .pipe(
  //           switchMap(metadata => {
  //             product.pictureId = metadata.id;
  //             return this.addProduct(product);
  //           })
  //           );
  //         } else {
  //           throw Error('You need better metadata');
  //         }
  // }

  // addProduct(product: Product): Observable<Product> {
  //   return from(
  //     this.db.collection<Product>('products').add({
  //       datos: {
  //         name: product.datos.name,
  //         otro: product.datos.otro
  //       }
  //       // pictureId: product. pictureId,
  //       // url: ;
  //     })
  //   ).pipe(
  //     map(productRef => {
  //       product.id = productRef.id;
  //       return product;
  //     })
  //   );
  // }

  // add10Products() {
  //   for (let i = 1; i < 10; i++) {
  //     this.db
  //       .collection<Product>('products')
  //       .add({ datos: { name: 'william' + i, otro: 'wallace' + i } });
  //   }
  // }
  // updClase(id: string, claseId: string, nombre) {
  //   const nome = nombre;
  //   const initialData = this.getClase(claseId);
  //   console.log('initialData' + initialData);
  //   const updateNested = this.db.collection<any>('clases').doc('CNKcj2q2XOP3b7kb3ffm')
  //   .collection('2019').doc('Fg1TK1pf3f3Vscjxtc6Q').set({
  //     cl1126020801: {
  //         alumno: [id]
  //       }
  //     }, {merge: true});
  //   // .ref.update({
  //   //   cl1126020801: {
  //   //       alumno: [id]
  //   //     }
  //   //   });
  //   console.log('updated sup');
  //     // .update({
  //     //   cl1126020800: {
  //     //     alumno  : id
  //     //   }
  //     // });
  //     // .ref.update({ cl1126020801: .arrayUnion(id)})
  // }
  // this.AngularFirestoreObj.doc('document-path') .ref.update({ arrayField: firebase.firestore.FieldValue.arrayUnion(new_Item)})
  //   this.db.collection(<collectionName>).doc(<docID>).update({
  //   answers: firestore.FieldValue.arrayUnion(<AnswersObject>)
  // });

  // const initialData = {
  //     name: 'Frank',
  //     age: 12,
  //     favorites: {
  //       food: 'Pizza',
  //       color: 'Blue',
  //       subject: 'recess'
  //     }
  //   };

  // ...
  // updProduct(id: string) {

  // const updateNested = this.db.collection('products').doc(id)
  // .update({ datos: { name: 'william' + i, otro: 'wallace' } });
  // }

  // // MAS ACORDE PERO CARGA EN LOOP
  // filterBy(id: string): Observable<Product> {
  //   const productsDocuments = this.db.doc<Product>('products/' + id);
  //   return productsDocuments.snapshotChanges().pipe(
  //     first(),
  //     map(changes => {
  //       if (changes.payload.exists) {

  //         const data = changes.payload.data();
  //         data.id = changes.payload.id;
  //         data.id = id;
  //         console.log('Filtra esta mierda' + data.id + ' ' + data.datos.name);

  //         return { id, ...data };
  //       }
  //     })
  //   );
  // }

  filterBy(id: string): Observable<Product> {
    return this.db
      .doc<Product>('products/' + id)
      .get()
      .pipe(
        first(),
        switchMap(productDocument => {
          if (!productDocument || !productDocument.data()) {
            console.log('Este ID no se encuentra en DB');
            // this.router.navigate(['/products/']);
            // this.productDocument,
            // undefined

            throw new Error('No se encuentra el producto');
            // debugger;
          } else {
            return from(this.db.doc<Product>('products/' + id).get()).pipe(
              map(() => {
                const data = productDocument.data() as Product;
                data.id = productDocument.id;
                console.log(
                  'ID registrado en DB ' + data.id + ' ' + data.datos.xname
                );

                // this.router.navigate(['product/' + id]);
                // DEBERIA REGISTRAR EL INGRESO Y VOLVER A CARGAR EL INGRESO
                // VOLVER A ESCANEAR O DIRECCIONAR A EXITO Y VOLVER

                return data;
              })
            );
          }
        })
      );
  }
  //       existData(id: string) {
  //         return this.db

  // const userRef: AngularFirestoreDocument = this.afs.doc(users/${user.uid});
  // userRef.valueChanges().subscribe(res=>{
  // if(res){
  // // do your perform
  // }
  // } );

  // this.db.doc<Product>('products/' + id)
  // .snapshotChanges()
  // .do(d => d.payload.exists);
  // }

  // filterBy(id: string): Observable<Product> {
  //   return this.db
  //     .doc<Product>('products/' + id)
  //     .get()
  //     .pipe(
  //       first(),
  //       switchMap(productDocument => {
  //         if (!productDocument || !productDocument.data()) {
  //           console.log('No esta esta mierda');
  //           // this.router.navigate(['/products/']);

  //           throw new Error('Product not Found');
  //           // debugger;
  //         } else {
  //           return from(this.db.doc<Product>('products/' + id).get()).pipe(
  //             map(() => {
  //               const data = productDocument.data() as Product;
  //               console.log('Filtra esta mierda' + data.id + ' ' + data.datos.name);
  //               data.id = productDocument.id;
  //               return data;
  //             })
  //             );
  //           }
  //         })
  //         );
  //       }

  // filterBy(id: string): Observable<Product> {
  //   this.db.collection('products', ref => ref.where('id', '==', id )).snapshotChanges();
  //   console.log('id ' + id);

  //   return this.product;
  // }
}

import { shareReplay } from 'rxjs/operators';
// import { firestore } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Product } from '../../_models';
import { FirestoreService } from '../../_services';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-set-productos',
  templateUrl: './set-productos.component.html',
  styleUrls: ['./set-productos.component.sass']
})
export class SetProductosComponent implements OnInit {
  productFormGroup: FormGroup;
  private path = 'productos/';
  producto: Product;
  productos = [];
  isEdit = false;
  isVisible = false;
  loading: any;

  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,

  ) {
    this.productFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      reducedPrice: new FormControl('', Validators.required),
      picture: new FormControl('', Validators.required),

    });
  }


  get name() { return this.productFormGroup.get('name'); }
  get price() { return this.productFormGroup.get('price'); }
  get reducedPrice() { return this.productFormGroup.get('reducedPrice'); }
  get picture() { return this.productFormGroup.get('picture'); }
  get imagen() { return this.productFormGroup.get('imagen'); }



  ngOnInit(): void {
    this.getProductos();
  }
  guardarProducto() {
    this.presentLoading();

    this.producto = {
      id: this.firestoreService.getId(),
      fecha: new Date(),
      ...this.productFormGroup.value
    }
    console.log('producto', this.producto);
    this.firestoreService.createDoc(this.producto, this.path, this.producto.id)
      .then(res => {
        this.loading.dismiss();
        this.presentToast('Guardado con exito');
        this.resetForm();
        this.isVisible = false;
      }).catch(err => {
        this.presentToast('No se ha podido guardar');
      });


  }

  getProductos() {
    this.firestoreService.getCollection<Product[]>(this.path)
      // .pipe(first())
      .subscribe(res => {
        this.productos = res;
        console.log('res', res);
      });
  }

  async borrarProducto(producto: Product) {
    const alert = await this.alertController.create({
      cssClass: 'normal',
      header: 'Advertencia',
      message: 'Seguro desea eliminar este producto?',
      buttons: [{
        text: 'cancelar',
        role: 'cancel',
        cssClass: 'normal',
        handler: (bla) => {
          console.log('Confirm: ' + bla);
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          this.firestoreService.deleteDoc(this.path, producto.id).then(res => {
            this.loading.dismiss();
            this.alertController.dismiss();
            this.presentToast('Eliminado con exito');
          }).catch(err => {
            this.presentToast('Ocurrió un error');
          });
        }

      }]
    });
    await alert.present();
  }

  editarProducto(producto: Product) {
    console.log('edit', producto);
    this.productFormGroup.setValue(
      {
        // // id: producto.id,
        name: producto.name,
        price: producto.price,
        reducedPrice: producto.reducedPrice,
        picture: producto.picture,
      }
    );
    // console.log('productIn', producto);
    this.producto = producto;
    this.isEdit = true;
    this.isVisible = true;


  }
  editarProductoDb() {
    this.presentLoading();

    // console.log(this.producto);
    // console.log(this.productFormGroup.value);
    this.firestoreService.updateDoc(this.productFormGroup.value, this.path, this.producto.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito');
      this.resetForm();
      this.isVisible = false;
    }).catch(err => {
      this.presentToast('No se ha podido guardar');
    });
  }

  nuevoProducto() {
    this.resetForm();
    this.isVisible = true;
  }
  resetForm() {
    this.productFormGroup.markAsPristine();
    this.productFormGroup.markAsUntouched();
    this.productFormGroup.reset();
    this.isEdit = false;
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      cssClass: 'normal',
      message: 'guardando'
    });
    await this.loading.present();
  }

  async presentToast(msg: string) {
    const toast = await this.toastController.create({
      message: msg,
      cssClass: 'normal',
      color: 'light',
      duration: 2000
    });
  }
}

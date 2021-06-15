import { shareReplay } from 'rxjs/operators';
// import { firestore } from 'firebase/app';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { first, map } from 'rxjs/operators';
import { Product } from '../../_models';
import { FirestorageService, FirestoreService } from '../../_services';
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
  newImage = '';
  newFile = '';
  newProducto = { foto: '' };


  constructor(
    public alertController: AlertController,
    public loadingController: LoadingController,
    public toastController: ToastController,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
    private firestoreService: FirestoreService,
    private firestorageService: FirestorageService,

  ) {
    this.productFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', Validators.required),
      reducedPrice: new FormControl('', Validators.required),
    });
  }

  get name() { return this.productFormGroup.get('name'); }
  get price() { return this.productFormGroup.get('price'); }
  get reducedPrice() { return this.productFormGroup.get('reducedPrice'); }

  ngOnInit(): void {
    this.getProductos();
  }

  async guardarProducto() {
    this.presentLoading();
    this.producto = {
      id: this.firestoreService.getId(),
      // picture: res,
      fecha: new Date(),
      ...this.productFormGroup.value
    }
    console.log('producto', this.producto);
    console.log('valuse', this.productFormGroup.value);
    const path = 'productos';
    const name = this.producto.id;
    console.log('en guardar', this.producto.name, this.producto.id, this.newFile);
    let res = await this.firestorageService.uploadImage(this.newFile, path, name);
    this.producto.picture = res;
    console.log('despues de pic', this.producto);

    // this.guardarProducto();
    await this.firestoreService.createDoc(this.producto, this.path, this.producto.id)
      .then(res => {
        this.loading.dismiss();
        this.presentToast('Guardado con exito!', 'success');
        this.resetForm();
        this.isVisible = false;
      }).catch(err => {
        this.presentToast('No se ha podido guardar', 'danger');
      });
  }

  getProductos() {
    this.firestoreService.getCollection<Product[]>(this.path)
      // .pipe(first(), map(data => data))
      .subscribe(res => {
        this.productos = res;
        console.log('res', res);
      });
  }

  async borrarProducto(producto: Product) {
    const alert = await this.alertController.create({
      header: 'Advertencia',
      message: 'Seguro desea eliminar este producto?',
      buttons: [{
        text: 'cancelar',
        role: 'cancel',
        handler: (bla) => {
          console.log('Confirm');
        }
      }, {
        text: 'Ok',
        handler: () => {
          console.log('Confirm Ok');
          console.log('producto.picture', producto.picture);
          this.firestorageService.deleteImage(producto.picture).then(response => {
            console.log('response', response);
          });
          this.firestoreService.deleteDoc(this.path, producto.id).then(res => {
            // this.loading.dismiss();
            this.alertController.dismiss();
            this.presentToast('Eliminado con exito', 'danger');
          }).catch(err => {
            this.presentToast(`Ocurrió un error ${err}`, 'danger');
          });
        }

      }]
    });
    await alert.present();
  }

  editarProducto(producto: Product) {
    this.resetForm();
    console.log('edit', producto);
    this.productFormGroup.setValue(
      {
        name: producto.name,
        price: producto.price,
        reducedPrice: producto.reducedPrice,
      }
    );
    // console.log('productIn', producto);
    this.producto = producto;
    this.isEdit = true;
    this.isVisible = true;
    console.log(this.newProducto);
    if (this.newFile) {
      console.log('pf1', this.newProducto.foto);
    } else {

      console.log('pf2', this.newProducto.foto);

    }
  }




  async editarProductoDb() {




    this.presentLoading();

    console.log('en guardar', this.producto.name, this.producto.picture, this.producto.id, this.newFile);
    if (this.newProducto.foto) {
      console.log('se borra y sube');
      // this.firestorageService.deleteImage();
      console.log('Se agrega');
      const res = await this.firestorageService.uploadImage(this.newFile, this.path, this.producto.id);
      this.producto.picture = res;
    } else {
      console.log('no Se agrega');

    }
    let productoAEditar = {
      ...this.productFormGroup.value,
      picture: this.producto.picture
    }

    console.log('this', this.producto, productoAEditar);
    // console.log(this.productFormGroup.value);
    this.firestoreService.updateDoc(productoAEditar, this.path, this.producto.id).then(res => {
      this.loading.dismiss();
      this.presentToast('Guardado con exito', 'success');
      this.resetForm();
      this.isVisible = false;
    }).catch(err => {
      this.presentToast('No se ha podido guardar', 'danger');
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
    this.newProducto.foto = '';
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'guardando'
    });
    await this.loading.present();
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      duration: 2000
    });
    toast.present();
  }

  async newImageLoad(event: any) {
    let loadingState = false;
    if (event.target.files && event.target.files[0]) {
      loadingState = true;
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;
        this.newProducto.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
      // console.log(loadingState, this.isEdit, this.newImage, this.newFile, this.newProducto.foto, event.target.files[0], this.producto.id);
    }
    // if(this.isEdit){

    // }


  }
}

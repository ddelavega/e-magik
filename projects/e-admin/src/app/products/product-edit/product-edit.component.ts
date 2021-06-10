import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { tap, first, shareReplay, map } from 'rxjs/operators';
import { FileService } from '../../files/shared/file-service';
import { ImageMetadata } from '../../files/shared/image-metadata';
import { Product } from '../shared/product.model';
import { ProductService } from '../shared/product.service';
// import { CropperComponent } from 'angular-cropperjs';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.sass']
})
export class ProductEditComponent implements OnInit {
  @ViewChild("imageCropper") imageCropper: ImageCropperComponent;

  id: string | null;
  product;
  productUrl;
  productFormGroup: FormGroup;
  locations = ['Rosario', 'Buenos Aires', 'Bariloche'];
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  lastCropperPosition: CropperPosition;
  lastCroppedImage: any;
  cerrar = true;

  // @ViewChild('angularCropper', { static: true })
  // public angularCropper: CropperComponent;
  // config = {
  //   aspectRatio: 16 / 9,
  //   dragMode: 'move',
  //   background: true,
  //   movable: true,
  //   rotatable: true,
  //   scalable: true,
  //   zoomable: true,
  //   viewMode: 2,
  //   checkImageOrigin: true,
  //   cropmove: this.cropMoved.bind(this),
  //   checkCrossOrigin: true
  // };

  // imageUrl = '../../../assets/images/users/bjjs.png';

  // imgUrl = this.imageUrl;

  constructor(
    private router: Router,
    private ps: ProductService,
    private fs: FileService,
    private activeatedRoute: ActivatedRoute
  ) {
    // console.log(this.id);
    this.id = this.activeatedRoute.snapshot.paramMap.get('id');

    this.product = this.ps.getProduct(this.id)
      .pipe(first(),
        map(product => {
          console.log(product);

          if (product.id === this.id) {
            // console.log('prod url', product)
            // if (product.datos) {
            // console.log('datos', product.datos);
            //   // product.datos.forEach(datos => {
            //   product.datos;
            //   // })
            // }
            if (product.pictureId) {
              this.fs.getFileUrl(product.pictureId)
                .subscribe(url => {
                  product.url = url;
                  this.productUrl = url;
                });
            }
            this.productFormGroup.setValue(
              {
                name: product.name,
                apellido: product.apellido,
                location: product.location,
                pictureId: product.pictureId,
                imagen: '',
                hasDriverLicense: product.hasDriverLicense,
                datos: product.datos
              }
            );
            return product;
          }

          // products => {
          // products.forEach(product => {
          //   if (product.pictureId) {
          //     this.fs.getFileUrl(product.pictureId)
          //       .subscribe(url => {
          //         product.url = url;
          //       });
          //   }
        }
        ))


    this.productFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      pictureId: new FormControl('', Validators.required),
      imagen: new FormControl(''),
      hasDriverLicense: new FormControl(false),
      datos: new FormGroup({
        xname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        xotro: new FormControl('', [Validators.required, Validators.minLength(2)]),
      })
    });
  }

  ngOnInit() {



  }

  get name() { return this.productFormGroup.get('name'); }
  get apellido() { return this.productFormGroup.get('apellido'); }
  get location() { return this.productFormGroup.get('location'); }
  get pictureId() { return this.productFormGroup.get('pictureId'); }
  get imagen() { return this.productFormGroup.get('imagen'); }
  get hasDriverLicense() { return this.productFormGroup.get('hasDriverLicense'); }

  get xname() { return this.productFormGroup.get('datos.xname'); }
  get xotro() { return this.productFormGroup.get('datos.xotro'); }


  // cropMoved(data) {
  //   this.imgUrl = this.angularCropper.cropper.getCroppedCanvas().toDataURL();
  // }

  editProduct() {
    const productData = this.productFormGroup.value;
    console.log('productData');
    console.log(productData);
    this.ps.addProductWithImage(
      productData,
      this.getMetaDataForImage())
      .subscribe(product => {
        // message
        // this.toastrService.success('Galería de productos actualizada');
        // this.router.navigate(['../../product-desk'],
        // {relativeTo: this.activeatedRoute});
        window.alert('product with id: ' + product.id + ' and name : ' + product.name + 'is added');
      },
        error1 => {
          // this.toastrService.error('Ocurri&oacute; un error: ' + error1);
          window.alert('Bad stuff happened: ' + error1);
        });

    // this.productFormGroup.disable();
    // this.productFormGroup.reset();
    // this.productFormGroup.enable();
    // this.toastrService.info('Subiendo producto...', 'Producto: ' + productData.name + '');
    this.router.navigate(['../../product-desk'], { relativeTo: this.activeatedRoute });

  }

  private getMetaDataForImage(): ImageMetadata {
    if (this.imageChangedEvent && this.imageChangedEvent.target &&
      this.imageChangedEvent.target.files &&
      this.imageChangedEvent.target.files.length > 0) {
      const fileBeforeCrop = this.imageChangedEvent.target.files[0];
      return {
        base64Image: this.croppedImage,
        imageBlob: this.croppedBlob,
        fileMeta: {
          name: fileBeforeCrop.name,
          type: 'image/png',
          size: fileBeforeCrop.size
        }
      };
    }
    return undefined;
  }

  uploadFile(event) {
    this.imageChangedEvent = event;
  }

  imageCropped(event: ImageCroppedEvent) {
    this.croppedImage = event.base64;
  }
  volver() {
    this.router.navigate(['./../list'], { relativeTo: this.activeatedRoute });

  }

}

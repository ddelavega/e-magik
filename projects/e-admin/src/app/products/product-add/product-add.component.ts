import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../shared/product.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CropperPosition, ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { ImageMetadata } from '../../files/shared/image-metadata';
import { Observable } from 'rxjs';
// import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.sass']
})
export class ProductAddComponent implements OnInit {
  @ViewChild("imageCropper") imageCropper: ImageCropperComponent;

  // status$: Observable<string>;
  productFormGroup: FormGroup;
  imageChangedEvent: any = '';
  croppedImage: any = '';
  croppedBlob: Blob;
  lastCropperPosition: CropperPosition;
  lastCroppedImage: any;
  locations = ['Rosario', 'Buenos Aires', 'Bariloche'];
  cerrar = true;

  constructor(
    // private toastrService: ToastrService,
    private router: Router,
    private activeatedRoute: ActivatedRoute,
    private ps: ProductService,
    // private fb: FormBuilder
  ) {
    this.productFormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      imagen: new FormControl('', Validators.required),
      hasDriverLicense: new FormControl(false),
      datos: new FormGroup({
        xname: new FormControl('', [Validators.required, Validators.minLength(2)]),
        xotro: new FormControl('', [Validators.required, Validators.minLength(2)]),
      })
    });
    // this.productFormGroup = this.fb.group({
    //   name: ['', Validators.required],
    //   apellido: ['', Validators.required],
    //   location: ['', Validators.required],
    //   hasDriverLicense: [false],
    //   datos: this.fb.group({
    //     xname: ['', [Validators.required, Validators.minLength(2)]],
    //     xotro: ['', [Validators.required, Validators.minLength(2)]]
    //   })
    // });
  }


  get name() { return this.productFormGroup.get('name'); }
  get apellido() { return this.productFormGroup.get('apellido'); }
  get location() { return this.productFormGroup.get('location'); }
  get imagen() { return this.productFormGroup.get('imagen'); }
  get hasDriverLicense() { return this.productFormGroup.get('hasDriverLicense'); }
  get xname() { return this.productFormGroup.get('datos.xname'); }
  get xotro() { return this.productFormGroup.get('datos.xotro'); }

  ngOnInit() {
  }

  addProduct() {
    // this.createForm();
    // console.log('form' , this.productFormGroup.value);
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

  // createForm() {

  //   this.productFormGroup = this.fb.group({
  //     name: ['', Validators.required],
  //     apellido: ['', Validators.required],
  //     location: ['', Validators.required],
  //     imagen: ['', Validators.required],
  //     hasDriverLicense: [false],
  //     datos: this.fb.group({
  //       xname: ['', [Validators.required, Validators.minLength(2)]],
  //       xotro: ['', [Validators.required, Validators.minLength(2)]]
  //     })
  //   });



  // }

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

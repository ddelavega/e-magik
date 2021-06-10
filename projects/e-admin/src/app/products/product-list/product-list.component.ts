import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductService } from '../shared/product.service';
import { Product } from '../shared/product.model';
import { tap } from 'rxjs/operators';
// import { ToastrService } from 'ngx-toastr';
import { FileService } from '../../files/shared/file-service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.sass']
})
export class ProductListComponent implements OnInit {
  products: Observable<Product[]>;
  public myAngularxQrCode: string = null;

  constructor(
    private ps: ProductService,
    private fs: FileService,
    private router: Router,
    private activeatedRoute: ActivatedRoute,

    // private toastr: ToastrService
  ) {
    // assign a value
    this.myAngularxQrCode = '';
  }

  ngOnInit() {
    this.products = this.ps.getProducts()
      .pipe(
        tap(products => {
          products.forEach(product => {
            if (product.pictureId) {
              this.fs.getFileUrl(product.pictureId)
                .subscribe(url => {
                  product.url = url;
                });
            }
          });
        })
      );
  }
  editar(id) {
    this.router.navigate(['./../edit', id], { relativeTo: this.activeatedRoute });
    console.log('ID', id);
  }
  deleteProduct(product: Product) {
    const obs = this.ps.deleteProduct(product.id);
    obs.subscribe(
      productFromFirebase => {
        // debugger;
        // window.alert(
        //   'Product with id: ' + productFromFirebase.id + ' is deleted'
        // );
        // this.toastr.error(
        //   'Alumno eliminado de la base! ' + productFromFirebase.id,
        //   productFromFirebase.datos.xname,
        //   {
        //     timeOut: 2000
        //   }
        // );
      },
      err => {
        // debugger;
        // window.alert('Product with id: ' + product.id + ' not found');
        // this.toastr.error(
        //   'Alumno no encontrado en la base! ' + product.id,
        //   'No se encontró!',
        //   {
        //     timeOut: 2000
        //   }
        // );
      }
    );
  }

  // addClassId(id: string) {
  //   this.ps.addClases(id);
  // }
  // add10(product: Product) {
  //   this.ps.add10Products();
  // }
}

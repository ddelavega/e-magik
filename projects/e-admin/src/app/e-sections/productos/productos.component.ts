import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Product } from '../../_models';
import { FirestorageService, FirestoreService } from '../../_services';

@Component({
  selector: 'app-productos',
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.sass']
})
export class ProductosComponent implements OnInit {
  path = 'productos';
  productos = [];

  constructor(
    private firestoreService: FirestoreService,
    private firestorageService: FirestorageService
  ) {
    this.loadProductos();
  }

  ngOnInit(): void {
  }
  loadProductos() {
    this.firestoreService.getCollection<Product[]>(this.path).pipe(first()).subscribe(res => {
      console.log('res productos', res);
      this.productos = res;
    })
  }

}

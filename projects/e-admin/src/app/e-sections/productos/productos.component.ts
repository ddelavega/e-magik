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


  // id: "csbWo8V2fRTspyxKPurn"
  // name: "tre"
  // picture: "https://firebasestorage.googleapis.com/v0/b/e-magik.appspot.com/o/productos%2FcsbWo8V2fRTspyxKPurn?alt=media&token=53d3e5cd-58cb-4e19-af87-8c81862d78c3"
  // price: 234243
  // reducedPrice: 234234
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

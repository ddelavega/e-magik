import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Pedido, Product } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  private pedido: Pedido;
  constructor(
    public database: AngularFirestore
  ) {
    this.loadCart();
  }

  loadCart() {

  }

  getCart() {
    return this.pedido;

  }

  addProducto(producto: Product) {

  }

  removeProducto(producto: Product) {

  }

  realizarPedido() {

  }

}

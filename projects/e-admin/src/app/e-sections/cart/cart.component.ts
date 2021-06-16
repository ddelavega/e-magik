import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { Pedido } from '../../_models';
import { FirestoreService } from '../../_services';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit {
  pedido: Pedido;
  total: Number;
  constructor(
    public cartService: CartService
  ) {
    this.initCart();
    this.loadPedido();
  }

  ngOnInit(): void {
  }


  loadPedido() {
    this.cartService.getCart()
      .subscribe(data => {
        console.log('load Cart', data);
        this.pedido = data;
      });
  };

  initCart() {
    this.pedido = {
      id: '',
      cliente: null,
      productos: [],
      precioTotal: null,
      estado: 'enviado',
      fecha: new Date,
      valoracion: null
    }

  }
}

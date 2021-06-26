import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../shared/services';
import { Pedido } from '../../_models';
import { FirestoreService } from '../../_services';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.sass']
})
export class CartComponent implements OnInit, OnDestroy {
  pedido: Pedido;
  cartSubscriber: Subscription;
  total: number;
  cantidad: number;
  uidCliente = '';

  isLogged = false;

  constructor(
    public cartService: CartService,
    private firestoreService: FirestoreService,
    public authService: AuthService,


  ) {
    this.authService.afAuth.user.pipe(first()).subscribe((usuario) => {
      if (usuario !== null) {

        console.log('UID', usuario.uid);
        this.uidCliente = usuario.uid;

        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
    this.initCart();
    this.loadPedido();
  }

  ngOnInit(): void {
  }
  ngOnDestroy(): void {
    console.log('destroy');
    if (this.cartSubscriber) {
      this.cartSubscriber.unsubscribe();
    }
  }


  loadPedido() {
    this.cartSubscriber = this.cartService.getCart()
      .subscribe(data => {
        console.log('load Cart', data);
        this.pedido = data;
        this.getTotal();
        this.getCantidad();
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
    };
  }

  getTotal() {
    this.total = 0;
    this.pedido.productos.forEach(producto => {
      this.total = (producto.producto.reducedPrice) * producto.cantidad + this.total;
    });
  }

  getCantidad() {
    this.cantidad = 0;
    this.pedido.productos.forEach(producto => {
      this.cantidad = producto.cantidad + this.cantidad;
    });
  }

  hacerPedido() {
    if (!this.pedido.productos.length) {
      console.log('agrega items!');
      return;
    }
    this.pedido.precioTotal = this.total;
    this.pedido.fecha = new Date();
    this.pedido.id = this.firestoreService.getId();
    console.log('pedir', this.pedido);
    console.log('UID', this.uidCliente);
    const path = `clientes/${this.uidCliente}/pedidos`;
    this.firestoreService.createDoc(this.pedido, path, this.pedido.id).then(() => {
      console.log('guardado con exito!');
      this.cartService.clearCart();
    });

  }

}

import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { FirestoreService } from '.';
import { AuthService } from '../shared/services';
import { Client, Pedido, Product, ProductoPedido, Uid } from '../_models';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  uidCliente = '';
  path = 'cart';
  isLogged = false;
  cliente: Client;
  private pedido: Pedido;
  pedido$ = new Subject<Pedido>();
  cartSubscriber: Subscription;

  constructor(
    public authService: AuthService,
    public database: AngularFirestore,
    private firestoreService: FirestoreService,
    public router: Router
  ) {
    this.initCart();
    this.authService.afAuth.user.pipe(first()).subscribe((usuario) => {
      if (usuario !== null) {

        console.log('UID', usuario.uid);
        this.uidCliente = usuario.uid;
        this.loadCliente();
        this.loadCart();
        this.isLogged = true;
      } else {
        this.isLogged = false;
      }
    });
  }

  loadCart() {
    const path = `clientes/${this.uidCliente}/${this.path}`;
    if (this.cartSubscriber) {
      this.cartSubscriber.unsubscribe();
    }
    this.cartSubscriber = this.firestoreService.getDoc<Pedido>(path, this.uidCliente).pipe(first()).subscribe(data => {
      console.log('data', data);
      if (data) {
        this.pedido = data;
        this.pedido$.next(this.pedido);
      } else {

        this.initCart();

      }
    })
  }

  initCart() {
    this.pedido = {
      id: this.uidCliente,
      cliente: this.cliente,
      productos: [],
      precioTotal: null,
      estado: 'enviado',
      fecha: new Date,
      valoracion: null
    }
    this.pedido$.next(this.pedido);

  }

  loadCliente() {
    const path = 'clientes'
    this.firestoreService.getDoc<Client>(path, this.uidCliente)
      .pipe().subscribe(cliente => {
        console.log('get', cliente);
        this.cliente = cliente;
        this.loadCart();

        return cliente;
      });
  }

  getCart(): Observable<Pedido> {
    setTimeout(() => {
      this.pedido$.next(this.pedido)
    }, 100);
    return this.pedido$.asObservable();

  }

  addProducto(producto: Product) {
    console.log('Agrega', this.uidCliente);
    if (this.uidCliente) {
      const item = this.pedido.productos.find(productoPedido => {
        return (productoPedido.producto.id === producto.id)
      });
      if (item !== undefined) {
        item.cantidad++;
      } else {
        const add: ProductoPedido = {
          cantidad: 1,
          producto
        }
        this.pedido.productos.push(add);
      }
    } else {
      console.log('dirige');


      this.router.navigate(['/login']);
      return;
    }
    this.pedido$.next(this.pedido);

    console.log('en add pedido', this.pedido);
    const path = `clientes/${this.uidCliente}/${this.path}`;
    this.firestoreService.createDoc(this.pedido, path, this.pedido.id).then(() => {
      console.log('Agregado con exito');
    });

  }

  removeProducto(producto: Product) {
    console.log('Remueve', this.uidCliente);
    if (this.uidCliente.length) {
      let position = 0;
      const item = this.pedido.productos.find((productoPedido, index) => {
        position = index;
        return (productoPedido.producto.id === producto.id)
      });
      if (item !== undefined) {
        item.cantidad--;
        if (item.cantidad === 0) {
          this.pedido.productos.splice(position, 1);
        }
      }
      this.pedido$.next(this.pedido);

      console.log('en remove pedido', this.pedido);
      const path = `clientes/${this.uidCliente}/${this.path}`;
      this.firestoreService.createDoc(this.pedido, path, this.pedido.id).then(() => {
        console.log('Removido con exito');
      });
    }
  }

  realizarPedido() {

  }
  clearCart() {
    const path = `clientes/${this.uidCliente}/cart`;
    this.firestoreService.deleteDoc(path, this.uidCliente).then(() => {
      this.initCart();

    });
  }

}

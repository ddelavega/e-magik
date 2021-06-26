import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthService } from '../../shared/services';
import { Pedido } from '../../_models';
import { FirestoreService } from '../../_services';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.sass']
})
export class OrderHistoryComponent implements OnInit {
  uidCliente = '';
  isLogged = false;
  nuevosSubscriber: Subscription;
  culminadosSubscriber: Subscription;
  pedidos: Pedido[] = [];

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
  }

  ngOnInit(): void {
    this.getPedidosNuevos(); /// no funciona
  }

  ngOnDestroy(): void {
    console.log('destroy');
    if (this.nuevosSubscriber) {
      this.nuevosSubscriber.unsubscribe();
    }
    if (this.culminadosSubscriber) {
      this.culminadosSubscriber.unsubscribe();
    }
  }

  getPedidosNuevos() {
    console.log('getPedidosNuevos');
    const path = `clientes/${this.uidCliente}/pedidos/`;
    this.nuevosSubscriber = this.firestoreService.getCollectionQuery<Pedido>(path, 'estado', '==', 'enviado').subscribe(res => {
      if (res.length) {
        this.pedidos = res;
      }
    });
  }
  getPedidosCulminados() {
    console.log('getPedidosCulminados');
    const path = `clientes/${this.uidCliente}/pedidos/`;
    this.culminadosSubscriber = this.firestoreService.getCollectionQuery<Pedido>(path, 'estado', '==', 'entregado').subscribe(res => {
      if (res.length) {
        this.pedidos = res;
      }
    });
  }
}

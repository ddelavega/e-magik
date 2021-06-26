import { Component, Input, OnInit } from '@angular/core';
import { ProductoPedido } from '../../_models';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'app-item-cart',
  templateUrl: './item-cart.component.html',
  styleUrls: ['./item-cart.component.sass']
})
export class ItemCartComponent implements OnInit {
  @Input() productoPedido: ProductoPedido;
  @Input() buttons = true;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    console.log('El producto en items', this.productoPedido);
    // this.producto = this.productoPedido.producto;
  }

  addCart() {
    this.cartService.addProducto(this.productoPedido.producto);
  }
  removeCart() {
    this.cartService.removeProducto(this.productoPedido.producto);
  }

}

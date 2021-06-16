import { Input } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { Product } from '../../_models';
import { CartService } from '../../_services/cart.service';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.sass']
})
export class ProductoComponent implements OnInit {
  @Input() producto: Product;

  constructor(public cartService: CartService) { }

  ngOnInit(): void {
    console.log('El producto', this.producto);
  }

  addCart() {
    this.cartService.addProducto(this.producto);
  }

}

import { Component, OnInit, VERSION, } from '@angular/core';
import { first } from 'rxjs/operators';
import { AuthService } from '../shared/services';
import { Product, User } from '../_models';
import { FirestorageService, FirestoreService, UserService } from '../_services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {
  ngVersion = VERSION;
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

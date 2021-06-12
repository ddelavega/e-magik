import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.sass'],
})
export class DashboardComponent implements OnInit {
  usuario: User;
  cargando: boolean = true;
  constructor(public authService: AuthService) {
    console.log('authService.afAuth.user', this.authService.afAuth.user);
    this.authService.afAuth.user.subscribe((usuario) => {

      console.log('usuario', usuario);
      this.usuario = usuario;
      this.cargando = false;
    });
  }

  ngOnInit(): void {}
}

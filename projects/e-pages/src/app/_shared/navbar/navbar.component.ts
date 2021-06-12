import { User } from './../../shared/services/user';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
})
export class NavbarComponent implements OnInit {
  usuario: User;
  usuarioPhoto: string;
  usuarioPhotoSm: string;
  constructor(private authService: AuthService) {
    this.authService.afAuth.user.subscribe((usuario) => {
      console.log('navbar usuario', usuario);
      this.usuario = usuario;
      if (usuario && usuario.photoURL) {
        this.usuarioPhoto = usuario.photoURL.replace('s96-c', 's400-c');
        this.usuarioPhotoSm = usuario.photoURL;
        // console.log('Cambio', this.usuarioPhoto);
      } else {
        this.usuarioPhoto = '/assets/images/users/grogu.png';
        this.usuarioPhotoSm = '/assets/images/users/grogu-sm.png';
      }
    });
  }

  ngOnInit(): void {}
  logout() {
    this.authService.SignOut();
  }
}

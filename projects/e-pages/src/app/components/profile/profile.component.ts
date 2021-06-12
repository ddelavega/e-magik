import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass'],
})
export class ProfileComponent implements OnInit {
  usuario: User;
  usuarioPhoto: string;
  usuarioPhotoSm: string;
  cargando: boolean = true;
  constructor(public authService: AuthService) {
    // console.log('authService.afAuth.user', this.authService.afAuth.user);
    this.authService.afAuth.user.subscribe((usuario) => {
      console.log('usuario sa', usuario);
      this.usuario = usuario;
      this.cargando = false;
      if(usuario && usuario.photoURL) {
        this.usuarioPhoto = usuario.photoURL.replace('s96-c', 's400-c');
        this.usuarioPhotoSm = usuario.photoURL;
        console.log('Cambio imagen highres', this.usuarioPhoto);
      } else {
        this.usuarioPhoto = '/assets/images/users/grogu.png'
      }
    });

  }

  ngOnInit(): void {}
}

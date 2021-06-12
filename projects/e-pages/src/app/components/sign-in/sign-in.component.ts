import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.sass'],
})
export class SignInComponent implements OnInit {
  constructor(public authService: AuthService, public router: Router) { }

  ngOnInit() { }
  login(email, password) {
    console.log(
      'this.authService.SignIn(email, password)',
      this.authService.SignIn(email, password)
    );
    this.authService.SignIn(email, password);
  }

  logout() {
    this.authService.SignOut();
  }
}



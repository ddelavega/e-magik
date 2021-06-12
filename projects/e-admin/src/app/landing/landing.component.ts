import { Component, OnInit, VERSION, } from '@angular/core';
import { AuthService } from '../shared/services';
import { User } from '../_models';
import { UserService } from '../_services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {
  ngVersion = VERSION;

  // loading = false;
  // user: User;
  // userFromApi: User;

  constructor(
  ) {
    // this.user = this.authService..userValue;
  }

  ngOnInit(): void {
  }

}

import { Component, OnInit, VERSION, } from '@angular/core';
import { User } from '../_models';
import { AuthenticationService, UserService } from '../_services';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.sass']
})
export class LandingComponent implements OnInit {
  ngVersion = VERSION;

  loading = false;
  user: User;
  userFromApi: User;

  constructor(private userService: UserService, private authenticationService: AuthenticationService) {
    this.user = this.authenticationService.userValue;
  }

  ngOnInit(): void {
  }

}

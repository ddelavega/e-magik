import { Component, OnInit } from '@angular/core';
import { first, timeInterval } from 'rxjs/operators';

import { User } from '../_models';
import { ExtrasService, UserService } from '../_services';
import { MenuSettingsService } from '../_services/menu-settings.service';

@Component({
  selector: 'app-e-administration',
  templateUrl: './e-administration.component.html',
  styleUrls: ['./e-administration.component.sass']
})
export class EAdministrationComponent implements OnInit {
  loading = false;
  users: User[] = [];
  apUser: User[] = [];
  apAdmin: User[] = [];
  infoUser: User;

  menuOpened: boolean;
  public _mode = 'push';
  public _collapseH = 600;

  constructor(private userService: UserService, private menuSettings: MenuSettingsService, private extrasService: ExtrasService) {
    this.getAllApUsers();
    this.getInfoUser();
  }

  ngOnInit(): void {
    this.loading = true;
    this.menuSettings.currentOSt.subscribe(status => (this.menuOpened = status));
  }

  getAllApUsers() {
    function apUser(element, index, array) {
      return element.role === 'User';
    }
    function apAdmin(element, index, array) {
      return element.role === 'Admin';
    }
    this.userService.getAllApUsers()
      .pipe(first(), timeInterval())
      .subscribe({
        next: (data) => {
          // console.log('interval', data.interval);
          console.log('Usuarios', this.extrasService.millisToTime(data.interval));
          console.log('Objeto crudo', data.value);
          this.users = data.value;
          this.apUser = data.value.filter(apUser);
          this.apAdmin = data.value.filter(apAdmin);
          this.loading = false;
        },
        error: error => {
          console.error('on error ', error);
        }
      });
  }

  getInfoUser() {
    this.userService.getInfoUser()
      .pipe(first(), timeInterval())
      .subscribe({
        next: (data) => {
          // console.log('interval', data.interval);
          console.log('Usuarios', this.extrasService.millisToTime(data.interval));
          console.log('Objeto crudo', data.value);
          this.infoUser = data.value;
          console.log('RoleBo', data.value.boRole);
          console.log('Role', data.value.role);
          this.loading = false;
        },
        error: error => {
          console.error('on error ', error);
        }
      });
  }

  public toggleSidebar() {
    this.menuSettings.changeStatusMenu(this.menuOpened);
  }
}

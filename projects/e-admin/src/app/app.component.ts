import { Component, ElementRef, HostListener, OnInit, ViewChild, VERSION, AfterViewInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import pkg from './../../../../package.json';
import { AuthService } from './shared/services';
import { User } from './shared/services/user';
// import { RoleBo, User } from './_models';
import { MenuSettingsService } from './_services';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'bo-administrator';
  vers = pkg.version;
  ngVersion = VERSION;
  @ViewChild('searchTermCuit', { static: false }) searchCuit: ElementRef;
  searchBoxCuit!: FormGroup;
  searchTermChanged: Subject<string> = new Subject<string>();

  public screenWidth: any;
  public screenHeight: any;
  // Menu settings
  public menuOpened: boolean;
  public menuMode: string;
  public menuCollapseWidth = 901;
  public menuKeyClose = true;
  public menuCloseOnClickOutside = false;
  public menuShowBackdrop = false;
  public menuSidebarClass: string = 'bkgNoShadow';
  // public iconArrow: string = 'iconArrow';
  public isMobile: boolean;

  mobile;
  desktop;


  usuario: User;
  cargando: boolean = true;






  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private menuSettings: MenuSettingsService
  ) {
    console.log('authService.afAuth.user', this.authService.afAuth.user);
    this.authService.afAuth.user.subscribe((usuario) => {

      console.log('usuario', usuario);
      this.usuario = usuario;
      this.cargando = false;
    });
    this.createFormCuit();

  }

  get isAdmin() {
    return this.usuario && this.usuario.emailVerified;
  }

  // get isClient() {
  //   return this.currentUser && this.currentUser.boRole === RoleBo.Client;
  // }

  ngOnInit() {
    // this.authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.menuSettings.currentOSt.subscribe(status => (this.menuOpened = status));
    this.configInit(true, 'oninit');

    // this.isSideBar();
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    //   this.isMobile ? [this.menuMode = 'slide', this.menuOpened = false] : [this.menuMode = 'push', this.menuOpened = true];


    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.configInit(false, 'resize');
    // this.isSideBar();
  }

  ngAfterViewInit() {
    this.configInit(false, 'after');

  }

  logout() {
    this.configInit(false, 'logout');

    this.authService.SignOut();
  }

  public closeMenu() {
    this.menuSettings.changeStatusMenu(this.menuOpened);
    return true;
  };

  public toggleSidebar() {
    this.menuSettings.changeStatusMenu(this.menuOpened);
    // this.isSideBar();

  }

  configInit(init, sector) {
    let onWidth = this.menuSettings.windowRef.innerWidth;

    // console.log('on width', onWidth);
    this.screenWidth ? this.screenWidth : this.screenWidth = onWidth;
    console.log('sector', sector); this.isMobile = this.screenWidth < this.menuCollapseWidth ? true : false;
    if (init) {
      this.isMobile ? [this.menuMode = 'over', this.menuOpened = false, this.menuCloseOnClickOutside = true, this.menuShowBackdrop = true] : [this.menuMode = 'push', this.menuOpened = true, this.menuCloseOnClickOutside = false, this.menuShowBackdrop = false];
    } else {
      this.isMobile ? [this.menuMode = 'over', this.menuOpened = false, this.menuCloseOnClickOutside = true, this.menuShowBackdrop = true] : [this.menuMode = 'push', this.menuOpened = true, this.menuCloseOnClickOutside = false, this.menuShowBackdrop = false];
    }
    this.isSideBar();


    // console.log('menuMode', this.menuMode, 'menuOpened', this.menuOpened);
    // console.log('this.screenWidth', this.screenWidth, 'or onwidth', onWidth);
    // console.log('this.isMobile', this.isMobile);
    // console.log('this.menuCloseOnClickOutside', this.menuCloseOnClickOutside);
    // console.log('this.menuShowBackdrop', this.menuShowBackdrop);
  }

  isSideBar() {

    // this.menuSidebarClass = this.menuOpened ? 'bkgShadow' : 'bkgNoShadow';
    this.menuSidebarClass = this.menuOpened ? 'bkgShadow' : 'bkgNoShadow';

  }

  private createFormCuit(): void {
    this.searchBoxCuit = this.formBuilder.group({
      searchTermCuit: ['', this.searchCuit]
    });
  }

  onFind(event: any) {
    if (this.searchTermChanged.observers.length === 0) {
      this.searchTermChanged.pipe(debounceTime(2000), distinctUntilChanged())
        .subscribe(term => {
          if (term.length > 7 && term.length < 12) {
            console.log(term, term.length);
          }
        });
    }
    this.searchTermChanged.next(event);
  }


}

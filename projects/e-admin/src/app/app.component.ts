import { AfterViewInit, Component, ElementRef, HostListener, OnInit, VERSION, ViewChild } from '@angular/core';
import pkg from './../../../../package.json';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { AuthenticationService, MenuSettingsService } from './_services';
import { RoleBo, User } from './_models';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'e-admin';
  vers = pkg.version;
  ngVersion = VERSION;
  @ViewChild('searchTermCuit', { static: false }) searchCuit: ElementRef;
  searchBoxCuit!: FormGroup;
  searchTermChanged: Subject<string> = new Subject<string>();
  currentUser: User;

  // Display Size
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
  public isMobile: boolean;

  constructor(
    private authenticationService: AuthenticationService,
    private formBuilder: FormBuilder,
    private menuSettings: MenuSettingsService
  ) {
    this.createFormCuit();
  }

  get isAdmin() {
    return this.currentUser && this.currentUser.boRole === RoleBo.Admin;
  }

  ngOnInit() {
    this.authenticationService.currentUser.subscribe(x => (this.currentUser = x));
    this.menuSettings.currentOSt.subscribe(status => (this.menuOpened = status));
    console.log('oninit');
    this.isMobile = this.screenWidth < this.menuCollapseWidth ? true : false;
    this.isMobile ? [this.menuMode = 'over', this.menuOpened = false] : [this.menuMode = 'push', this.menuOpened = true];
    console.log('menuMode', this.menuMode, 'menuOpened', this.menuOpened);
    console.log('this.screenWidth', this.screenWidth);
    console.log('this.isMobile', this.isMobile);
    this.isSideBar();
  }

  @HostListener('window:resize', ['$event'])

  onResize(event) {
    this.screenWidth = window.innerWidth;
    this.screenHeight = window.innerHeight;
    this.isMobile = this.screenWidth < this.menuCollapseWidth ? true : false;
    this.isMobile ? [this.menuMode = 'over', this.menuOpened = false, this.menuCloseOnClickOutside = true, this.menuShowBackdrop = true] : [this.menuMode = 'push', this.menuOpened = true, this.menuCloseOnClickOutside = false, this.menuShowBackdrop = false];
    console.log('onresize');
    console.log('menuMode', this.menuMode, 'menuOpened', this.menuOpened);
    console.log('this.screenWidth', this.screenWidth);
    console.log('this.isMobile', this.isMobile);
    console.log('this.menuCloseOnClickOutside', this.menuCloseOnClickOutside);
    console.log('this.menuShowBackdrop', this.menuShowBackdrop);
  }

  ngAfterViewInit() {
    this.isMobile = this.screenWidth < this.menuCollapseWidth ? true : false;
    this.isMobile ? [this.menuMode = 'over', this.menuOpened = false, this.menuCloseOnClickOutside = true, this.menuShowBackdrop = true] : [this.menuMode = 'push', this.menuOpened = true, this.menuCloseOnClickOutside = false, this.menuShowBackdrop = false];
    console.log('after');
    console.log('menuMode', this.menuMode, 'menuOpened', this.menuOpened);
    console.log('this.screenWidth', this.screenWidth);
    console.log('this.isMobile', this.isMobile);
    console.log('this.menuCloseOnClickOutside', this.menuCloseOnClickOutside);
    console.log('this.menuShowBackdrop', this.menuShowBackdrop);
    this.isSideBar();
  }

  logout() {
    this.isMobile = this.screenWidth < this.menuCollapseWidth ? true : false;
    this.isMobile ? [this.menuMode = 'over', this.menuOpened = false, this.menuCloseOnClickOutside = true, this.menuShowBackdrop = true] : [this.menuMode = 'push', this.menuOpened = true, this.menuCloseOnClickOutside = false, this.menuShowBackdrop = false];
    console.log('logout');
    console.log('menuMode', this.menuMode, 'menuOpened', this.menuOpened);
    console.log('this.screenWidth', this.screenWidth);
    console.log('this.isMobile', this.isMobile);
    console.log('this.menuCloseOnClickOutside', this.menuCloseOnClickOutside);
    console.log('this.menuShowBackdrop', this.menuShowBackdrop);
    this.authenticationService.logout();
  }

  public closeMenu() {
    this.menuSettings.changeStatusMenu(this.menuOpened);
    return true;
  };

  public toggleSidebar() {
    this.menuSettings.changeStatusMenu(this.menuOpened);
    this.isSideBar();

  }

  isSideBar() {
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

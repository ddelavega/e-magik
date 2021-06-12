import { CommonModule } from '@angular/common';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarModule } from 'ng-sidebar';
// import { AuthModule } from './auth';
import { AuthModule } from './auth';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialDesignModule } from './material-design';

import { AngularFireModule, FirebaseApp } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';

import { MAT_RIPPLE_GLOBAL_OPTIONS } from '@angular/material/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorInterceptor } from './_helpers';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
// import { LandingComponent } from './landing';
import { environment } from '../environments';
import { IonicModule } from '@ionic/angular';
import { SignUpComponent } from './auth/sign-up/sign-up.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';
import { VerifyEmailComponent } from './auth/verify-email/verify-email.component';
import { ProfileComponent } from './auth/profile/profile.component';
import { LandingComponent } from './landing';
// import { LandingComponent } from './landing/landing.component';
// import { LandingComponent } from './landing';

@NgModule({
  declarations: [
    AppComponent,
    LandingComponent,

  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialDesignModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    SidebarModule.forRoot(),
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
    AngularFireStorageModule,
    HammerModule,
    IonicModule.forRoot(),

  ],
  providers: [
    // { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    { provide: MAT_RIPPLE_GLOBAL_OPTIONS, useValue: { disabled: true } },

    // provider used to create fake backend
    // fakeBackendProvider,
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

})
export class AppModule { }

import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './_components/not-found/not-found.component';
import { ExampleComponent } from './_components/example/example.component';
import { NavbarComponent } from './_shared/navbar/navbar.component';
import { HeaderComponent } from './_shared/header/header.component';
import { OverlayComponent } from './_shared/overlay/overlay.component';
// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';
import { DashboardComponent, SignInComponent, SignUpComponent, ForgotPasswordComponent, VerifyEmailComponent } from './components';
import { AuthService } from './shared/services';
import { ProfileComponent } from './components/profile/profile.component';
import { LandingComponent } from './components/landing/landing.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFirestoreModule.enablePersistence({ synchronizeTabs: true }),
  ],
  declarations: [
    AppComponent,
    NotFoundComponent,
    ExampleComponent,
    NavbarComponent,
    HeaderComponent,
    OverlayComponent,
    DashboardComponent,
    SignInComponent,
    SignUpComponent,
    ForgotPasswordComponent,
    VerifyEmailComponent,
    ProfileComponent,
    LandingComponent,
  ],
  providers: [AuthService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ToastController } from '@ionic/angular';
import { first } from 'rxjs/operators';
import { AuthService } from '../../shared/services';
import { User } from '../../shared/services/user';
import { Client, Uid } from '../../_models';
import { FirestorageService, FirestoreService } from '../../_services';

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
  newClient = { foto: '' };
  newFile = '';
  newImage = '';

  isEdit = false;
  clientForm: FormGroup;
  private formSubmitAttempt: boolean;
  isLoading = false;
  loading: any;

  error = '';
  texting: boolean;
  uidCliente: Uid = { uid: '' };
  cliente: Client = {
    uid: '',
    email: '',
    nombre: '',
    celular: '',
    foto: '',
    referencia: '',
    ubicacion: null
  };
  path = 'clientes';
  constructor(
    public loadingController: LoadingController,
    public toastController: ToastController,
    private fb: FormBuilder,
    public authService: AuthService,
    private firestoreService: FirestoreService,
    private firestorageService: FirestorageService,
  ) {
    // console.log('authService.afAuth.user', this.authService.afAuth.user);
    this.authService.afAuth.user.pipe(first()).subscribe((usuario) => {
      console.log('usuario sa', usuario);
      this.usuario = usuario;
      this.cliente.uid = usuario.uid;
      this.cargando = false;
      this.uidCliente.uid = usuario.uid;
      this.getUserInfo(usuario.uid, usuario.email);
      if (usuario && usuario.photoURL) {
        this.usuarioPhotoSm = usuario.photoURL;
        console.log('Cambio imagen highres', this.usuarioPhoto);
      } else {
        this.usuarioPhoto = '/assets/images/users/grogu.png'
      }
    });
  }


  ngOnInit() {
    this.uidCliente = this.uidCliente;
    this.clientForm = this.fb.group({
      nombre: ['', [Validators.required]],
      celular: ['', [Validators.required]],
      referencia: ['', [Validators.required]],
      ubicacion: ['', [Validators.required]],
    });

    console.log('On init', this.cliente);
  }

  isFieldInvalid(field: string) {
    // this.clientForm.get(field).onKeyup() ? this.texting = true : this.texting = false;
    return (
      (!this.clientForm.get(field).valid && this.clientForm.get(field).touched) ||
      (this.clientForm.get(field).untouched && this.formSubmitAttempt)
    );
  }

  get f() {
    return this.clientForm.controls;
  }


  onSubmit() {
    this.isLoading = true;
    if (this.clientForm.valid) {
      console.log('FormCliente', this.clientForm.value);
      // this.login(this.f.email.value, this.f.password.value);
      this.isLoading = false;
      this.guardarUsuario();
      this.getUserInfo(this.cliente.uid, this.cliente.email);
    }

    this.formSubmitAttempt = true;
  }

  closeForm() {
    this.clientForm.markAsPristine();
    this.clientForm.markAsUntouched();
    this.resetForm();
  }

  datosCliente(cliente: Client) {
    this.resetForm();
    console.log('edit', cliente);
    this.clientForm.setValue(
      {
        nombre: cliente.nombre,
        celular: cliente.celular,
        referencia: cliente.referencia,
        ubicacion: cliente.ubicacion,
      }
    );
    // console.log('productIn', producto);
    this.cliente = cliente;
    this.isEdit = true;
    console.log(this.newClient);

    this.isEdit = true;
    console.log('Editando', this.cliente.uid);
  }

  // Carga imagen de perfil
  async newImageLoad(event: any) {
    let loadingState = false;
    if (event.target.files && event.target.files[0]) {
      loadingState = true;
      this.newFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = ((image) => {
        this.newImage = image.target.result as string;
        this.newClient.foto = image.target.result as string;
      });
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  async guardarUsuario() {
    this.presentLoading();
    // this.path = 'clientes';


    if (this.newClient.foto) {
      console.log('se borra y sube');
      // this.firestorageService.deleteImage();
      console.log('Se agrega');
      const res = await this.firestorageService.uploadImage(this.newFile, this.path, this.usuario.uid);
      this.cliente.foto = res;
    } else {
      console.log('no subio');
      console.log('qued la del usuario default');
    }
    console.log('despues de pic', this.cliente);

    let clienteAGuardar = {
      uid: this.cliente.uid,
      email: this.cliente.email,
      emailVerified: this.usuario.emailVerified,
      ...this.clientForm.value,
      foto: this.cliente.foto,
    }
    // this.guardarProducto();

    await this.firestoreService.updateDoc(clienteAGuardar, this.path, this.cliente.uid)
      .then(res => {
        this.loading.dismiss();
        this.presentToast('Guardado con exito!', 'success');
        this.resetForm();
      }).catch(err => {
        this.presentToast('No se ha podido guardar', 'danger');
      });
  }

  getUserInfo(uid: string, email: string) {
    this.firestoreService.getDoc<Client>(this.path, uid)
      .pipe(first()).subscribe((cliente) => {
        console.log('get', cliente);
        this.cliente = { email, ...cliente };
        return cliente;
      });
  }


  resetForm() {
    this.clientForm.markAsPristine();
    this.clientForm.markAsUntouched();
    this.clientForm.reset();
    this.isEdit = false;
    this.newClient.foto = '';
  }

  async presentLoading() {
    this.loading = await this.loadingController.create({
      message: 'guardando'
    });
    await this.loading.present();
  }

  async presentToast(msg: string, color: string) {
    const toast = await this.toastController.create({
      message: msg,
      color: color,
      duration: 2000
    });
    toast.present();
  }

}

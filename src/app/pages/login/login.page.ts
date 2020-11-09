import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { stripGeneratedFileSuffix } from '@angular/compiler/src/aot/util';
import { AngularFirestore } from '@angular/fire/firestore';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  avatars = [
    {
      img: 'av-1.png',
      seleccionado: true
    },
    {
      img: 'av-2.png',
      seleccionado: false
    },
    {
      img: 'av-3.png',
      seleccionado: false
    },
    {
      img: 'av-4.png',
      seleccionado: false
    },
    {
      img: 'av-5.png',
      seleccionado: false
    },
    {
      img: 'av-6.png',
      seleccionado: false
    },
    {
      img: 'av-7.png',
      seleccionado: false
    },
    {
      img: 'av-8.png',
      seleccionado: false
    },
];

  constructor(  public router: Router,
                private navCtrl: NavController,
                private authSvc: AuthService,
                private afs: AngularFirestore ) { }

  ngOnInit() {

  }


   // this.navCtrl.navigateRoot( '/main/tabs/tab1', { animated: true } );
   async onLogin(email, password) {
    console.log( email );
    console.log( password );
    console.log( 'Login' );
    try {
      const user = await this.authSvc.login(email.value, password.value);
      if (user) {
        const isVerified = this.authSvc.isEmailVerified(user);
        // console.log('isVerified ->', isVerified);
        this.redirectUser(isVerified);
        // const isVerified = this.authSvc.isEmailVerified(user);
        // this.redirectUser(isVerified);
        // this.navCtrl.navigateRoot( '/main/tabs/menu', { animated: true } );
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }


  async onLoginGoogle() {
    try {
      const user = await this.authSvc.loginGoogle();
      if (user) {
        console.log('User ->', user);
        // const isVerified = this.authSvc.isEmailVerified(user);
        // this.redirectUser(isVerified);
      }
    } catch (error) {
      console.log('Error->', error);
    }
  }


  async onRegister( email, nombre, apellido, rol, carrera, password ) {
    console.log( email );
    console.log( password );
    console.log( carrera );
    console.log( carrera.value );
    try {
      const user = await this.authSvc.register( email.value, password.value );
      if (user) {
        console.log( 'User->', user);
        this.afs.doc(`usuarios/${user.uid}`).set({
            carrera: carrera.value,
            rol: 'estudiante',
            email: email.value,
            uid: user.uid,
            nombre: nombre.value,
            apellido: apellido.value,
            estado: 'activo',
            usuarioVerificado: 'true',
            emailVerified: user.emailVerified,
            creado: 'firebase',
            photoURL: '',
            credencial: [],
            grupos: []
          });
      }
      this.router.navigate(['login']);
    } catch (error) {
      console.log('Error', error);
    }
  }


  private redirectUser(isVerified: boolean): void {
    if (isVerified) {
      this.router.navigate(['menu']);
    } else {
      this.router.navigate(['verify-email']);
    }
  }


}


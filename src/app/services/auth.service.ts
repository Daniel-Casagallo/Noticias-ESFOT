import { Injectable } from '@angular/core';
import { User, Usuario } from '../Interfaces/interfaces';
import { AngularFireAuth } from '@angular/fire/auth';

import * as firebase from 'firebase';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable, of } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user$: Observable<User>;
  public usu: Observable<Usuario>;
  public usuario = new Usuario();

  constructor(  public afAuth: AngularFireAuth,
                private afs: AngularFirestore ){

    this.user$ = this.afAuth.authState.pipe(
      switchMap((user) => {
        if (user) {
          return this.afs.doc<User>(`usuarios/${user.uid}`).valueChanges();
        }
        return of(null);
      })
    );
  }

  async resetPassword(email: string): Promise<void> {
    try {
      return this.afAuth.sendPasswordResetEmail(email);
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async loginGoogle(): Promise<User> {
    try {
      const { user } = await this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async register(email: string, password: string): Promise<User> {
    console.log( email );
    console.log( password );
    try {
      const  { user }  = await this.afAuth.createUserWithEmailAndPassword(email, password);
      await this.sendVerifcationEmail();
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async login(email: string, password: string): Promise<User> {
    console.log( email);
    console.log( password);
    try {
      const { user } = await this.afAuth.signInWithEmailAndPassword(email, password);
      this.updateUserData(user);
      return user;
    } catch (error) {
      console.log('Error->', error);
    }
  }

  async sendVerifcationEmail(): Promise<void> {
    try {
      return (await this.afAuth.currentUser).sendEmailVerification();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  isEmailVerified(user: User): boolean {
    return user.emailVerified === true ? true : false;
  }

  async logout(): Promise<void> {
    try {
      await this.afAuth.signOut();
    } catch (error) {
      console.log('Error->', error);
    }
  }

  private updateUserData(user: User) {
    const userRef: AngularFirestoreDocument<User> = this.afs.doc(`usuarios/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      emailVerified: user.emailVerified
      /*
      nombre: user.nombre,
      apellido: user.apellido,
      rol: user.rol,
      estado: user.estado,
      usuarioVerificado: user.usuarioVerificado,
      creado: user.creado,
      carrera: user.carrera,
      photoURL: user.photoURL,
      credencial: user.credencial,
      emailVerified: user.emailVerified,
      grupos: user.grupos
      */
    };

    return userRef.set(data, { merge: true });
  }

  getUser(uid: string ){

    const userRef: AngularFirestoreDocument<Usuario> = this.afs.doc(`usuarios/${uid}`);
    this.usu = userRef.snapshotChanges().pipe(map(a => {
      const data = a.payload.data() as Usuario;
      if ( data ){
        this.usuario = data;
        // console.log(data);
        const id = a.payload.id;
        return {id, ...data};
      }else{
        return null;
      }

    }));

    return this.usu ;

  }


}

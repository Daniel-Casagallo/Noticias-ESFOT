import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Publicacion } from '../Interfaces/interfaces';
import { AngularFirestoreCollection, AngularFirestore } from '@angular/fire/firestore';
import { EventEmitter } from 'events';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  // nuevoPost = new EventEmitter<Publicacion>();

  private publicacionCollection: AngularFirestoreCollection<Publicacion>;
  private publicaciones: Observable<Publicacion[]>;

  constructor(db: AngularFirestore) {

    this.publicacionCollection = db.collection<Publicacion>('publicaciones');
    this.publicaciones = this.publicacionCollection.snapshotChanges().pipe(map(
      actions => {
        return actions.map( a => {
          const data = a.payload.doc.data();
          const idPost = a.payload.doc.id;
          return {idPost, ...data};
        });
      }
    ));
   }

   getPublicaciones() {
    return this.publicaciones;
   }

   getPublicacion( idPost: string ){
    return this.publicacionCollection.doc<Publicacion>(idPost).valueChanges();
   }

   updatePublicacion( publicacion: Publicacion, idPost: string ){
     return this.publicacionCollection.doc(idPost).update(publicacion);
   }

   addPublicacion( publicacion: Publicacion ){
     return this.publicacionCollection.add( publicacion );
   }

   removePublicacion( idPost: string ){
     return this.publicacionCollection.doc( idPost ).delete();
   }
}

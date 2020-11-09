import { Component, OnInit, Input } from '@angular/core';
import { Publicacion, Usuario } from '../../Interfaces/interfaces';
import { PostsService } from '../../services/posts.service';
import { TodoService } from '../../services/todo.service';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-emergencias',
  templateUrl: './emergencias.page.html',
  styleUrls: ['./emergencias.page.scss'],
})
export class EmergenciasPage implements OnInit {

  // posts: Article[] = [];
  publicaciones: Publicacion[] = [];
  publicacionesCate: Publicacion[];
  @Input() publicacionesCateori: Publicacion = {};
  habilitado = true;
  tipos = ['Todas', 'Aceptadas', 'Rechazadas'];
  // @Input() publicaciones: Publicacion[] = [];
  textoBuscar = '';
  public usuario = new Usuario();

  public user$: Observable <any> = this.auth.afAuth.user;


  constructor(  private postsService: PostsService,
                private todoService: TodoService,
                private db: AngularFirestore,
                private auth: AuthService ) {

                  this.user$.subscribe( resp => {
                    console.log('Usuario', resp.uid);
                    // console.log('Usuario', resp.nombre);
                    // tslint:disable-next-line: no-shadowed-variable
                    this.auth.getUser( resp.uid ).subscribe( rep => {
                      console.log('Respuesta', rep);
                      this.usuario = rep;
                    });
                  });
                }

  ngOnInit() {
    this.EncabeadoCategoria('Todas');
  }

  /*
  EncabeadoCategoria(){
    this.todoService.getPublicaciones()
          .subscribe( resp => {
          console.log( 'Tareas', resp );
          this.publicaciones = resp;
          console.log( 'Publicaciones', resp);
          // tslint:disable-next-line: no-shadowed-variable
          // tslint:disable-next-line: triple-equals
          // tslint:disable-next-line: no-shadowed-variable
          this.publicaciones = resp.filter(( resp ) => resp.tipoPost === 'Solicitudes' );
          return this.publicaciones;
      });
  }
*/

EncabeadoCategoria( valor: string){
  if ( valor === 'Todas'){
    console.log( 'Todas', valor );
    this.todoService.getPublicaciones()
          .subscribe( resp => {
          console.log( 'Tareas', resp );
          this.publicaciones = resp;
          console.log( 'Publicaciones', resp);
          // tslint:disable-next-line: no-shadowed-variable
          // tslint:disable-next-line: triple-equals
          // tslint:disable-next-line: no-shadowed-variable
          this.publicaciones = resp.filter(( resp ) => resp.tipoPost === 'Solicitudes' );
          return this.publicaciones;
        });
  }
  if ( valor === 'Aceptadas'){
    console.log( 'Aceptadas', valor );
    this.publicaciones = [];
    this.todoService.getPublicaciones()
          .subscribe( resp => {
          console.log( 'Tareas', resp );
          this.publicaciones = resp;
          console.log( 'Publicaciones', resp);
          // tslint:disable-next-line: triple-equals
          // tslint:disable-next-line: no-shadowed-variable tslint:disable-next-line: max-line-length
          this.publicaciones = resp.filter(( resp ) => resp.tipoPost === 'Solicitudes' && resp.autorIdPost === this.usuario.uid && resp.estadoPost === 'aprobado');
          // && resp.autorIdPost === this.usuario.uid
          console.log( 'Usuario ID activo', this.usuario.uid );
          return this.publicaciones;
        });
  }
  if ( valor === 'Rechazadas'){
    console.log( 'Rechazadas', valor );
    this.publicaciones = [];
    this.todoService.getPublicaciones()
          .subscribe( resp => {
          console.log( 'Tareas', resp );
          this.publicaciones = resp;
          console.log( 'Publicaciones', resp);
          // tslint:disable-next-line: triple-equals
          // tslint:disable-next-line: no-shadowed-variable tslint:disable-next-line: max-line-length
          this.publicaciones = resp.filter(( resp ) => resp.tipoPost === 'Solicitudes' && resp.autorIdPost === this.usuario.uid && resp.estadoPost === 'rechazado' );
          // && resp.autorIdPost === this.usuario.uid
          console.log( 'Usuario ID activo', this.usuario.uid );
          return this.publicaciones;
        });
  }
}


  recargar(  ) {}

  buscar( event ){
    console.log( event );
    // tslint:disable-next-line: one-variable-per-declaration
    const valor = event.detail.value;

  }

}

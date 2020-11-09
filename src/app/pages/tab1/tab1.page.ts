import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { PostsService } from '../../services/posts.service';
import { Article, Publicacion, Usuario } from '../../Interfaces/interfaces';
import { TodoService } from '../../services/todo.service';
import { IonSegment, IonSegmentButton } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page implements OnInit {

  // posts: Article[] = [];
  publicaciones: Publicacion[] = [];
  publicacionesCate: Publicacion[];
  @Input() publicacionesCateori: Publicacion = {};
  habilitado = true;
  tipos = ['Noticias', 'Eventos'];
  // @Input() publicaciones: Publicacion[] = [];
  textoBuscar = '';
  public usuario = new Usuario();

  public user$: Observable <any> = this.auth.afAuth.user;


  constructor(  private postsService: PostsService,
                private todoService: TodoService,
                private db: AngularFirestore,
                private auth: AuthService ) {  }


  ngOnInit() {
    // this.segment.value = this.categorias[0];
    // this.siguientes();
    this.EncabeadoCategoria( 'Noticias');
    // console.log('Segmento', this.segment.value);

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

  recargar(  ) {}

  /*
  recargar( event ) {

    this.siguientes( event, true );
    this.habilitado = true;
    this.posts = [];

  }

  */


  siguientes( event? ) {

    this.todoService.getPublicaciones()
          .subscribe( resp => {
          console.log( 'Tareas', resp );
          this.publicaciones = resp;
          console.log( 'Publicaciones', this.publicaciones );
          return this.publicaciones ;
      });
  }



/*
  siguientes( event?, pull: boolean = false ) {

    this.postsService.getPosts( pull )
          .subscribe( resp => {
          console.log( resp );
          this.posts.push( ...resp.articles );

          if ( event ) {
            event.target.complete();

            // if ( resp.posts.length === 0) {
            // this.habilitado = false;
           // }
          }
      });
  }

  */



  EncabeadoCategoria( categoriaSeleccionada: string){
    console.log(categoriaSeleccionada);
    this.todoService.getPublicaciones()
          .subscribe( resp => {
          console.log( 'Tareas', resp );
          this.publicaciones = resp;
          console.log( 'Publicaciones', resp);
          // tslint:disable-next-line: no-shadowed-variable
          // tslint:disable-next-line: triple-equals
          // tslint:disable-next-line: no-shadowed-variable
          this.publicaciones = resp.filter(( resp ) => resp.tipoPost === categoriaSeleccionada );
          console.log( 'BIENEE', categoriaSeleccionada, this.publicaciones );
          return this.publicaciones;
      });
  }

  buscar( event ){
    console.log( event );
    // tslint:disable-next-line: one-variable-per-declaration
    const valor = event.detail.value;

  }

}

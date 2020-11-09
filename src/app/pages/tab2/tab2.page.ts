import { Component, OnInit } from '@angular/core';
import { Publicacion, Usuario } from '../../Interfaces/interfaces';
import { TodoService } from '../../services/todo.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { pipe, Observable } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';


declare var window: any;

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})


export class Tab2Page {

tempImages: string[] = [];

public usuario = new Usuario();

public user$: Observable <any> = this.auth.afAuth.user;

  constructor(  private route: ActivatedRoute,
                private router: Router,
                private nav: NavController,
                private publicacionService: TodoService,
                private auth: AuthService,
                private camera: Camera,
                private file: File ){

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

  publicacion: Publicacion = {};
  tipoPublicacion = '';
  categoriaPublicacion = '';
  tituloPublicacion = '';
  autorPublicacion = this.usuario.nombre + ' ' + this.usuario.apellido;
  fechaEventoInicioPublicacion = '';
  fechaEventoFinPublicacion = '';
  descripcionPublicacion = '';
  idAutorPublicacion = this.usuario.uid;
  numTelfPublicacion = '';


  fechaPublicacion: Date = new Date();
  post = {
    mensaje: ''
  };

  seleccionTipoPostNoticia(){
    if (this.tipoPublicacion === 'Noticias'){
      return true;
    }
  }

  seleccionTipoPostAnuncio(){
    if (this.tipoPublicacion === 'Solicitudes'){
      return true;
    }
  }

  seleccionTipoPostEvento(){
    if (this.tipoPublicacion === 'Eventos'){
      this.categoriaPublicacion = 'Eventos';
      return true;
    }
  }

  seleccionCateoriaPostEmergencia(){
    if (this.categoriaPublicacion === 'Emergencia'){
      return true;
    }
  }


  async guardarPublicacion( telefono ) {
    console.log('TIPO', this.tipoPublicacion);
    console.log('Categoria', this.categoriaPublicacion);
    console.log(this.tituloPublicacion);
    console.log(this.autorPublicacion);
    console.log(this.fechaEventoInicioPublicacion);
    console.log(this.fechaEventoFinPublicacion);
    console.log(this.descripcionPublicacion);
    console.log('bien', this.usuario.uid);
    console.log('TELEFONO', telefono);

    (await this.publicacionService.addPublicacion(this.publicacion)).set({

        // idPost: '',
        tipoPost: this.tipoPublicacion,
        categoriaPost: this.categoriaPublicacion,
        estadoPost: 'rechazado', // aprobado, rechazado, pendiente
        tituloPost: this.tituloPublicacion,
        autorNamePost: this.usuario.nombre + ' ' + this.usuario.apellido,
        viewsPost: '25',
        fechaPost: '20-10-2020',
        fechaInicioPost: this.fechaEventoInicioPublicacion,
        fechaFinPost: this.fechaEventoFinPublicacion,
        descripcionPost: this.descripcionPublicacion,
        autorIdPost: this.usuario.uid,
        autorImagenPost: '',
        imagePortadaPost: '',
        ytUrlPost: '',
        numTelfPost: '',
        horainicioPost: '',
        horafinalPost: '',
        imagenPost: [{name: '', url: ''}],
        docsPost: [{name: '', url: ''}],


/*

        titulo: this.tituloPublicacion,
        estado: 'Aprobado',
        autor: this.usuario.nombre + ' ' + this.usuario.apellido,
        visualizaciones: 25,
        // fechaEvento: this.fechaEvento,
        fecha: this.fechaPublicacion,
        categoria: this.tipoEvento,
        descripcion: this.descripcionPublicacion,
        imagen: 'sdfghj'
*/

      }).then(() => {
        this.router.navigate(['main/tabs/tab1']);
      });


    }


  camara(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.CAMERA
    };

    this.procesarImagen( options );
  }


  libreria() {

    const options: CameraOptions = {
      quality: 60,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      correctOrientation: true,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    };

    this.procesarImagen( options );

  }


  procesarImagen( options: CameraOptions ) {

  this.camera.getPicture(options).then((imageData) => {
    // imageData is either a base64 encoded string or a file URI
    // If it's base64 (DATA_URL):


    const img = window.Ionic.WebView.convertFileSrc( imageData );
    console.log('iMAGEdATA', imageData);
    console.log('IMG  ', img);
    this.tempImages.push( img );

    /*
    const base64 = img;
    const imageName = 'name.png';
    const imageBlob = this.dataURItoBlob(base64);
    const imageFile = new File([imageBlob], imageName, { type: 'image/png' });

    console.log('IMAGENDATA', JSON.stringify(imageData));
    console.log('IMG', JSON.stringify(img));
    console.log('filee', JSON.stringify(imageFile));
    */

   }, (err) => {
    // Handle error
   });

  }


  dataURItoBlob(dataURI) {
    const byteString = window.atob(dataURI);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const int8Array = new Uint8Array(arrayBuffer);
    for (let i = 0; i < byteString.length; i++) {
      int8Array[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([int8Array], { type: 'image/png' });
    return blob;
 }

}

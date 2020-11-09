import { Component, OnInit, Input } from '@angular/core';
import { Article, Publicacion } from '../../Interfaces/interfaces';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { RouterModule, Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
})
export class PostComponent implements OnInit {

  @Input() post: Article = {};
  @Input() publicacion: Publicacion = {};

  img1 = '/assets/perro-1.jpg';
  img2 =  '/assets/perro-2.jpg';
  img3 =  '/assets/perro-3.jpg';


  constructor(  private actionSheetCtrl: ActionSheetController,
                private socialSharing: SocialSharing,
                private router: Router ) { }

  ngOnInit() {

  }

  async compartir(){
    const actionSheet = await this.actionSheetCtrl.create({
      header: 'Opciones',
      cssClass: 'my-custom-class',
      buttons: [{
        text: 'Compartir',
        icon: 'share',
        handler: () => {
          console.log('Share clicked');
          this.socialSharing.share(
            this.publicacion.tipoPost,
            this.publicacion.autorNamePost
          );
        }
      }, {
        text: 'Favorito',
        icon: 'heart',
        handler: () => {
          console.log('Favorite clicked');
        }
      }, {
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();
  }

  navegar(){
    console.log(this.publicacion.tipoPost);
    console.log(this.publicacion.idPost);
    this.router.navigate(['/detalle-publicacion', this.publicacion.idPost ]);
    // , this.publicacion.idPost

  }
}

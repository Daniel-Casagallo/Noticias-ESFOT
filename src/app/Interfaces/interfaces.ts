import { Time } from '@angular/common';

export interface RespuestaPosts {
  posts: any;
  status: string;
  totalResults: number;
  articles: Article[];
}

export interface RespuestaPublicaciones {
  posts: any;
  status: string;
  totalResults: number;
  articles: Publicacion[];
}

export interface Article {
  source?: Source;
  author?: string;
  title?: string;
  description?: string;
  url?: string;
  urlToImage?: string;
  publishedAt?: string;
  content?: string;
}

export interface Source {
  id?: string;
  name?: string;
}


export interface User {
  uid: string;
  email: string;
  displayName: string;
  emailVerified: boolean;
}

export class Usuario {
  uid: string;
  email: string;
  nombre: string;
  apellido?: string;
  rol: string;
  estado?: string;
  usuarioVerificado: boolean;
  creado?: string;
  carrera?: string;
  photoURL?: string;
  credencial?: [];
  emailVerified: boolean;
  grupos?: [];
}


export class Publicacion {
  idPost?: string;
  tipoPost?: string;
  categoriaPost?: string;
  estadoPost?: string;
  tituloPost?: string;
  autorNamePost?: string;
  viewsPost?: number;
  fechaPost?: Date;
  fechaInicioPost?: string;
  fechaFinPost?: string;
  descripcionPost?: string;
  horainicioPost?: string;
  horafinPost?: string;
  telPost?: string;
  lugarPost?: string;
  imagenPost?: any[];
  autorIdPost?: string;
  autorImagenPost?: string;
  docsPost?: any[];
  ytUrlPost?: string[];
  comentarioPost?: string;

  }

export interface Properties {
  etiquetas: Etiquetas;
  estado: Estado;
  thumbnail: Thumbnail;
  descripcion: Descripcion;
  publicado: Publicado;
  titulo: Titulo;
}

interface Titulo {
  id: string;
  type: string;
  title: Richtext[];
}

interface Publicado {
  id: string;
  type: string;
  date: Date;
}

interface Date {
  start: string;
  end: string;
  time_zone: string;
}

interface Descripcion {
  id: string;
  type: string;
  rich_text: Richtext[];
}

interface Richtext {
  type: string;
  text: Text;
  annotations: Annotations;
  plain_text: string;
  href: string;
}

interface Annotations {
  bold: boolean;
  italic: boolean;
  strikethrough: boolean;
  underline: boolean;
  code: boolean;
  color: string;
}

interface Text {
  content: string;
  link: string;
}

interface Thumbnail {
  id: string;
  type: string;
  files: File2[];
}

interface File2 {
  name: string;
  type: string;
  file: File;
}

interface File {
  url: string;
  expiry_time: string;
}

interface Estado {
  id: string;
  type: string;
  status: Multiselect;
}

interface Etiquetas {
  id: string;
  type: string;
  multi_select: Multiselect[];
}

interface Multiselect {
  id: string;
  name: string;
  color: string;
}

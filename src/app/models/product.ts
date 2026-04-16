export interface Product {
  id: number;
  nombre: string;
  descripcion: string;
  precio: number;
  categoria: string;
  marca: string;
  referencia: string;
  activo: boolean;
  fechaAlta: string | Date;
  audUser: string;
}

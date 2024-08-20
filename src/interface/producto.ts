export interface Producto {
  producto_id?: number;
  nombre: string;
  descripcion: string;
  stock: number;
  precio: number;
  descuento: number;
  categoria_id: number;
}

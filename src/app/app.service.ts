import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Product } from "./models/product";
import { ProductApi } from "./models/productApi";
import { map, Observable } from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly apiUrl = 'http://localhost:8080/api/productos';

  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {
    this.products = signal<Product[]>([]);
  }

  getProducts(nombre?: string, categoria?: string) {
    let queryParams = new HttpParams();

    const n = nombre ?? '';
    const c = categoria ?? '';

    if(n) queryParams = queryParams.set('nombre', n);
    if(c) queryParams = queryParams.set('categoria', c);

    return this.http.get<ProductApi[]>(this.apiUrl, { params: queryParams }).pipe(
      map((list: any[]) => list.map(p => this.toProduct(p)))
    );

  }

  postProduct(product: Product){
    const body = this.toApi(product);
    return this.http.post<ProductApi>(this.apiUrl, body).pipe(
      map(p => this.toProduct(p))
    );
  }

  updateProduct(product: Product){
    const body = this.toApi(product);
    return this.http.put<ProductApi>(`${this.apiUrl}/${product.id}`, body).pipe(
      map(p => this.toProduct(p))
    );
  }

  deleteProduct(id: number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  uploadFile(file: File): Observable<any>{
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(`${this.apiUrl}/uploadFile`, formData);
  }

  private toProduct(p: ProductApi): Product {
    return {
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      categoria: p.categoria,
      marca: p.marca,
      referencia: p.referencia,
      activo: p.activo,
      fechaAlta: p.fecha_alta,
      audUser: p.aud_user,
    };
  }

  private toApi(p: Product): ProductApi {
    return {
      id: p.id,
      nombre: p.nombre,
      descripcion: p.descripcion,
      precio: p.precio,
      categoria: p.categoria,
      marca: p.marca,
      referencia: p.referencia,
      activo: p.activo,
      fecha_alta: p.fechaAlta instanceof Date ? p.fechaAlta.toISOString() : p.fechaAlta,
      aud_user: p.audUser,
    };
  }


}

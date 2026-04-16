import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable, signal } from "@angular/core";
import { Product } from "./models/product";

@Injectable({
  providedIn: 'root',
})
export class AppService {
  readonly apiUrl = 'http://localhost:8080/api/productos';

  products = signal<Product[]>([]);

  constructor(private http: HttpClient) {
    this.products = signal<Product[]>([]);
  }

  getProducts(nombre: string, categoria: string) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append('nombre', nombre);
    queryParams = queryParams.append('categoria', categoria);

    return this.http.get<Product[]>(this.apiUrl, { params: queryParams });
  }

  postProduct(product: Product){
    return this.http.post<Product>(this.apiUrl, product).pipe();
  }

  updateProduct(product: Product){
    return this.http.put<Product>(`${this.apiUrl}/${product.id}`, product);
  }

  deleteProduct(id: number){
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

}

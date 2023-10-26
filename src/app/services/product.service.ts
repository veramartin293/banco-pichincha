import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  constructor(private http: HttpClient) {}

  getAllProducts() {
    return this.http.get(`${environment.API_URL}/bp/products`, {
      headers: { authorId: '223' },
    });
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.API_URL}/bp/products`, product, {
      headers: { authorId: '223' },
    });
  }
}

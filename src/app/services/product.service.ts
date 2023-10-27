import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';
import { Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  products$ = this.getAllProducts();

  constructor(private http: HttpClient) {}

  private getAllProducts(): Observable<Product[]> {
    return this.http
      .get<Product[]>(`${environment.API_URL}/bp/products`, {
        headers: { authorId: '223' },
      })
      .pipe(
        tap((products) => {
          products.forEach((product) => {
            product.date_release = this.formatDateString(product.date_release);
            product.date_revision = this.formatDateString(
              product.date_revision
            );
          });
        })
      );
  }

  // Date expected as YYYY-MM-DDTHH:mm:ss+00:00
  private formatDateString(date: string): string {
    const datePart = date.split('T')[0];
    const dateParts = datePart.split('-');
    const year = dateParts[0];
    const month = dateParts[1];
    const day = dateParts[2];
    let formatedDate: string = `${day}/${month}/${year}`;
    return formatedDate;
  }

  saveProduct(product: Product): Observable<any> {
    return this.http.post(`${environment.API_URL}/bp/products`, product, {
      headers: { authorId: '223' },
    });
  }
}

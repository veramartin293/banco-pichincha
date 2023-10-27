import { Component } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent {
  products$: Observable<Product[]> = this.productService.products$.pipe(
    tap((products) => {
      this.numResults = products.length;
    })
  );
  numResults = 0;

  constructor(private productService: ProductService) {}
}

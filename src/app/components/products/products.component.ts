import { AfterViewInit, Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, debounceTime, map, switchMap, tap } from 'rxjs';
import { Product } from 'src/app/models/product.model';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
})
export class ProductsComponent implements AfterViewInit {
  searchControl = new FormControl<string | null>(null);
  searchControlValue$ = this.searchControl.valueChanges.pipe(debounceTime(600));
  products$: Observable<Product[]> = this.productService.products$;

  filteredProducts$: Observable<Product[]> = this.searchControlValue$.pipe(
    switchMap((searchValue) => {
      return this.products$.pipe(
        map((products) => {
          const cleanSearchValue = (searchValue || '')
            .trim()
            .toLowerCase()
            .split(' ')
            .join('');
          const filteredProducts = products.filter((product) => {
            const productName = this.cleanString(product.name);
            const productDesc = this.cleanString(product.description);
            return (
              productName.includes(cleanSearchValue) ||
              productDesc.includes(cleanSearchValue)
            );
          });
          return filteredProducts;
        }),
        tap((products) => {
          this.numResults = products.length;
        })
      );
    })
  );
  numResults = 0;

  constructor(private productService: ProductService) {}

  ngAfterViewInit(): void {
    // Set to empty string to trigger value change on control
    this.searchControl.setValue('');
  }

  cleanString(s: string): string {
    return s.trim().toLowerCase().split(' ').join('');
  }
}

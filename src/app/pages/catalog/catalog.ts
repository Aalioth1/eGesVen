import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-catalog',
  imports: [
    CurrencyPipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
  ],
  templateUrl: './catalog.html',
  styleUrl: './catalog.css',
})
export class Catalog implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';
  notificationMessage = '';

  constructor(private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService
      .getProducts()
      .filter((product) => product.stock > 0);

    this.filteredProducts = [...this.products];
  }

  filterProducts(): void {
    const normalizedTerm = this.searchTerm.trim().toLowerCase();

    if (!normalizedTerm) {
      this.filteredProducts = [...this.products];
      return;
    }

    this.filteredProducts = this.products.filter((product) =>
      product.name.toLowerCase().includes(normalizedTerm) ||
      product.code.toLowerCase().includes(normalizedTerm) ||
      product.category.toLowerCase().includes(normalizedTerm),
    );
  }

  addToCart(product: Product): void {
    const currentItems = this.cartService.getItems();

    const existingItem = currentItems.find(
      (item) => item.product.id === product.id,
    );

    if (
      existingItem &&
      existingItem.quantity >= product.stock
    ) {
      this.notificationMessage =
        `No hay más unidades disponibles de ${product.name}.`;

      window.setTimeout(() => {
        this.notificationMessage = '';
      }, 2500);

      return;
    }

    this.cartService.addProduct(product);

    this.notificationMessage =
      `${product.name} fue agregado al pedido.`;

    window.setTimeout(() => {
      this.notificationMessage = '';
    }, 2500);
  }
}
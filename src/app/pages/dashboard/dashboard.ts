import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { Product } from '../../models/product';
import { CartService } from '../../services/cart';
import { ProductService } from '../../services/product';

@Component({
  selector: 'app-dashboard',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  products: Product[] = [];

  totalProducts = 0;
  lowStockProducts = 0;
  outOfStockProducts = 0;
  inventoryValue = 0;
  cartItems = 0;
  cartSubtotal = 0;

  constructor(
    private productService: ProductService,
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    this.products = this.productService.getProducts();

    this.totalProducts = this.products.length;

    this.lowStockProducts = this.products.filter(
      (product) => product.stock > 0 && product.stock <= 5,
    ).length;

    this.outOfStockProducts = this.products.filter(
      (product) => product.stock === 0,
    ).length;

    this.inventoryValue = this.products.reduce(
      (total, product) =>
        total + product.price * product.stock,
      0,
    );

    this.cartItems = this.cartService.getTotalItems();
    this.cartSubtotal = this.cartService.getSubtotal();
  }

  getLowStockProducts(): Product[] {
    return this.products
      .filter((product) => product.stock <= 5)
      .sort((a, b) => a.stock - b.stock)
      .slice(0, 5);
  }

  goToProducts(): void {
    this.router.navigate(['/products']);
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  goToCart(): void {
    this.router.navigate(['/cart']);
  }
}
import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';

import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-cart',
  imports: [
    CurrencyPipe,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './cart.html',
  styleUrl: './cart.css',
})
export class Cart implements OnInit {
  items: CartItem[] = [];
  subtotal = 0;
  totalItems = 0;

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart(): void {
    this.items = this.cartService.getItems();
    this.subtotal = this.cartService.getSubtotal();
    this.totalItems = this.cartService.getTotalItems();
  }

  increaseQuantity(productId: number): void {
    this.cartService.increaseQuantity(productId);
    this.loadCart();
  }

  decreaseQuantity(productId: number): void {
    this.cartService.decreaseQuantity(productId);
    this.loadCart();
  }

  removeItem(productId: number): void {
    this.cartService.removeItem(productId);
    this.loadCart();
  }

  clearCart(): void {
    const confirmed = window.confirm(
      '¿Deseas vaciar completamente el pedido?',
    );

    if (!confirmed) {
      return;
    }

    this.cartService.clearCart();
    this.loadCart();
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  goToPayment(): void {
    if (this.items.length === 0) {
      return;
    }

    this.router.navigate(['/payment']);
  }
}
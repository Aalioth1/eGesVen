import { Injectable } from '@angular/core';

import { CartItem } from '../models/cart-item';
import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private readonly storageKey = 'egesven_cart';
  private items: CartItem[] = [];

  constructor() {
    this.loadCart();
  }

  getItems(): CartItem[] {
    return this.items.map((item) => ({
      product: { ...item.product },
      quantity: item.quantity,
    }));
  }

  addProduct(product: Product): void {
    const existingItem = this.items.find(
      (item) => item.product.id === product.id,
    );

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity++;
      }
    } else {
      this.items.push({
        product: { ...product },
        quantity: 1,
      });
    }

    this.saveCart();
  }

  increaseQuantity(productId: number): void {
    const item = this.items.find(
      (cartItem) => cartItem.product.id === productId,
    );

    if (!item || item.quantity >= item.product.stock) {
      return;
    }

    item.quantity++;
    this.saveCart();
  }

  decreaseQuantity(productId: number): void {
    const item = this.items.find(
      (cartItem) => cartItem.product.id === productId,
    );

    if (!item) {
      return;
    }

    if (item.quantity <= 1) {
      this.removeItem(productId);
      return;
    }

    item.quantity--;
    this.saveCart();
  }

  removeItem(productId: number): void {
    this.items = this.items.filter(
      (item) => item.product.id !== productId,
    );

    this.saveCart();
  }

  clearCart(): void {
    this.items = [];
    this.saveCart();
  }

  getTotalItems(): number {
    return this.items.reduce(
      (total, item) => total + item.quantity,
      0,
    );
  }

  getSubtotal(): number {
    return this.items.reduce(
      (total, item) =>
        total + item.product.price * item.quantity,
      0,
    );
  }

  private loadCart(): void {
    const storedCart = localStorage.getItem(this.storageKey);

    if (!storedCart) {
      this.items = [];
      return;
    }

    try {
      const parsedCart = JSON.parse(storedCart) as CartItem[];

      this.items = Array.isArray(parsedCart)
        ? parsedCart
        : [];
    } catch {
      this.items = [];
    }
  }

  private saveCart(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.items),
    );
  }
}
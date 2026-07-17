import { CurrencyPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';

import { CartItem } from '../../models/cart-item';
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-payment',
  imports: [
    CurrencyPipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatRadioModule,
  ],
  templateUrl: './payment.html',
  styleUrl: './payment.css',
})
export class Payment implements OnInit {
  items: CartItem[] = [];
  total = 0;
  totalItems = 0;

  paymentMethod = 'debit';
  customerName = '';
  customerEmail = '';
  cardNumber = '';
  expirationDate = '';
  securityCode = '';

  errorMessage = '';
  paymentCompleted = false;
  orderNumber = '';

  constructor(
    private cartService: CartService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.loadOrder();
  }

  loadOrder(): void {
    this.items = this.cartService.getItems();
    this.total = this.cartService.getSubtotal();
    this.totalItems = this.cartService.getTotalItems();

    if (this.items.length === 0 && !this.paymentCompleted) {
      this.router.navigate(['/cart']);
    }
  }

  completePayment(): void {
    if (!this.customerName.trim() || !this.customerEmail.trim()) {
      this.errorMessage =
        'Debes ingresar el nombre y el correo del cliente.';
      return;
    }

    if (!this.isValidEmail(this.customerEmail)) {
      this.errorMessage =
        'Debes ingresar un correo electrónico válido.';
      return;
    }

    if (
      !this.cardNumber.trim() ||
      !this.expirationDate.trim() ||
      !this.securityCode.trim()
    ) {
      this.errorMessage =
        'Debes completar los datos de la tarjeta.';
      return;
    }

    const normalizedCardNumber = this.cardNumber.replace(/\s/g, '');

    if (!/^\d{16}$/.test(normalizedCardNumber)) {
      this.errorMessage =
        'El número de tarjeta debe contener 16 dígitos.';
      return;
    }

    if (!/^\d{2}\/\d{2}$/.test(this.expirationDate)) {
      this.errorMessage =
        'La fecha de vencimiento debe tener el formato MM/AA.';
      return;
    }

    if (!/^\d{3}$/.test(this.securityCode)) {
      this.errorMessage =
        'El código de seguridad debe contener 3 dígitos.';
      return;
    }

    this.errorMessage = '';
    this.orderNumber = this.generateOrderNumber();
    this.paymentCompleted = true;

    this.cartService.clearCart();
  }

  goToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  goToCatalog(): void {
    this.router.navigate(['/catalog']);
  }

  private isValidEmail(email: string): boolean {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  private generateOrderNumber(): string {
    const timestamp = Date.now().toString();
    return `EGV-${timestamp.slice(-8)}`;
  }
}
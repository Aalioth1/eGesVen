import { Component, Inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Product } from '../../models/product';

export interface ProductFormData {
  product?: Product;
}

@Component({
  selector: 'app-product-form',
  imports: [
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './product-form.html',
  styleUrl: './product-form.css',
})
export class ProductForm implements OnInit {
  isEditMode = false;

  product: Product = {
    id: 0,
    code: '',
    name: '',
    category: '',
    price: 0,
    stock: 0,
  };

  errorMessage = '';

  constructor(
    private dialogRef: MatDialogRef<ProductForm>,
    @Inject(MAT_DIALOG_DATA) public data: ProductFormData,
  ) {}

  ngOnInit(): void {
    if (this.data.product) {
      this.isEditMode = true;
      this.product = { ...this.data.product };
    }
  }

  save(): void {
    if (
      !this.product.code.trim() ||
      !this.product.name.trim() ||
      !this.product.category.trim()
    ) {
      this.errorMessage = 'Debes completar todos los campos.';
      return;
    }

    if (this.product.price <= 0) {
      this.errorMessage = 'El precio debe ser mayor que cero.';
      return;
    }

    if (this.product.stock < 0) {
      this.errorMessage = 'El stock no puede ser negativo.';
      return;
    }

    this.errorMessage = '';
    this.dialogRef.close(this.product);
  }

  cancel(): void {
    this.dialogRef.close();
  }
}
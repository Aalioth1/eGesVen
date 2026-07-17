import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatTableModule } from '@angular/material/table';

import { Product } from '../../models/product';
import { ProductService } from '../../services/product';
import { CurrencyPipe } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ProductForm } from '../../components/product-form/product-form';

@Component({
  selector: 'app-products',
  imports: [
    MatDialogModule,
    CurrencyPipe,
    FormsModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatTableModule,
  ],
  templateUrl: './products.html',
  styleUrl: './products.css',
})
export class Products implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  searchTerm = '';

  displayedColumns: string[] = [
    'code',
    'name',
    'category',
    'price',
    'stock',
    'actions',
  ];

  constructor(private productService: ProductService,
  private dialog: MatDialog,
  ) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.products = this.productService.getProducts();
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

  editProduct(product: Product): void {
    const dialogRef = this.dialog.open(ProductForm, {
      width: '560px',
      maxWidth: '95vw',
      data: {
        product,
      },
    });

    dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (!result) {
        return;
      }

      this.productService.updateProduct(result);
      this.loadProducts();
      this.filterProducts();
    });
  }

  deleteProduct(product: Product): void {
    const confirmed = window.confirm(
      `¿Deseas eliminar el producto "${product.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    this.productService.deleteProduct(product.id);
    this.loadProducts();
    this.filterProducts();
  }

  openNewProductDialog(): void {
  const dialogRef = this.dialog.open(ProductForm, {
    width: '560px',
    maxWidth: '95vw',
  });

  dialogRef.afterClosed().subscribe((result: Product | undefined) => {
      if (!result) {
        return;
      }

      const newProduct: Omit<Product, 'id'> = {
        code: result.code,
        name: result.name,
        category: result.category,
        price: result.price,
        stock: result.stock,
      };

      this.productService.addProduct(newProduct);
      this.loadProducts();
      this.filterProducts();
    });
  }
}
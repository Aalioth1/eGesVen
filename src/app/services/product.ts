import { Injectable } from '@angular/core';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      code: 'P001',
      name: 'Notebook Lenovo IdeaPad',
      category: 'Computación',
      price: 699990,
      stock: 12,
    },
    {
      id: 2,
      code: 'P002',
      name: 'Mouse inalámbrico Logitech',
      category: 'Accesorios',
      price: 24990,
      stock: 35,
    },
    {
      id: 3,
      code: 'P003',
      name: 'Monitor Samsung 24 pulgadas',
      category: 'Computación',
      price: 189990,
      stock: 8,
    },
    {
      id: 4,
      code: 'P004',
      name: 'Teclado mecánico Redragon',
      category: 'Accesorios',
      price: 59990,
      stock: 20,
    },
    {
      id: 5,
      code: 'P005',
      name: 'Audífonos JBL',
      category: 'Audio',
      price: 44990,
      stock: 16,
    },
  ];

  getProducts(): Product[] {
    return [...this.products];
  }

  getProductById(id: number): Product | undefined {
    return this.products.find((product) => product.id === id);
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newProduct: Product = {
      ...product,
      id: this.generateId(),
    };

    this.products.push(newProduct);
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(
      (product) => product.id === updatedProduct.id,
    );

    if (index === -1) {
      return;
    }

    this.products[index] = { ...updatedProduct };
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(
      (product) => product.id !== id,
    );
  }

  private generateId(): number {
    if (this.products.length === 0) {
      return 1;
    }

    const highestId = Math.max(
      ...this.products.map((product) => product.id),
    );

    return highestId + 1;
  }
}
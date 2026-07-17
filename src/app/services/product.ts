import { Injectable } from '@angular/core';

import { Product } from '../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly storageKey = 'egesven_products';

  private readonly defaultProducts: Product[] = [
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

  private products: Product[] = [];

  constructor() {
    this.loadProducts();
  }

  getProducts(): Product[] {
    return this.products.map((product) => ({ ...product }));
  }

  getProductById(id: number): Product | undefined {
    const product = this.products.find((item) => item.id === id);

    return product ? { ...product } : undefined;
  }

  addProduct(product: Omit<Product, 'id'>): void {
    const newProduct: Product = {
      ...product,
      id: this.generateId(),
    };

    this.products.push(newProduct);
    this.saveProducts();
  }

  updateProduct(updatedProduct: Product): void {
    const index = this.products.findIndex(
      (product) => product.id === updatedProduct.id,
    );

    if (index === -1) {
      return;
    }

    this.products[index] = { ...updatedProduct };
    this.saveProducts();
  }

  deleteProduct(id: number): void {
    this.products = this.products.filter(
      (product) => product.id !== id,
    );

    this.saveProducts();
  }

  resetProducts(): void {
    this.products = this.defaultProducts.map(
      (product) => ({ ...product }),
    );

    this.saveProducts();
  }

  private loadProducts(): void {
    const storedProducts = localStorage.getItem(this.storageKey);

    if (!storedProducts) {
      this.resetProducts();
      return;
    }

    try {
      const parsedProducts = JSON.parse(storedProducts) as Product[];

      if (!Array.isArray(parsedProducts)) {
        this.resetProducts();
        return;
      }

      this.products = parsedProducts;
    } catch {
      this.resetProducts();
    }
  }

  private saveProducts(): void {
    localStorage.setItem(
      this.storageKey,
      JSON.stringify(this.products),
    );
  }

  private generateId(): number {
    if (this.products.length === 0) {
      return 1;
    }

    return Math.max(
      ...this.products.map((product) => product.id),
    ) + 1;
  }
}
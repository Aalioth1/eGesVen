import { Routes } from '@angular/router';

import { MainLayout } from './layout/main-layout/main-layout';
import { Login } from './pages/login/login';
import { Dashboard } from './pages/dashboard/dashboard';
import { Catalog } from './pages/catalog/catalog';
import { Products } from './pages/products/products';
import { Cart } from './pages/cart/cart';
import { Payment } from './pages/payment/payment';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: Login,
  },
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
      {
        path: 'catalog',
        component: Catalog,
      },
      {
        path: 'products',
        component: Products,
      },
      {
        path: 'cart',
        component: Cart,
      },
      {
        path: 'payment',
        component: Payment,
      },
    ],
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];